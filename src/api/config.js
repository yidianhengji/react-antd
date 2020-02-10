import axios from 'axios';
import { message } from 'antd'
import { BASE } from './path'

export default function axja (url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        axios.interceptors.request.use(config => {
            if (localStorage.getItem("token")) {
                config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
            }
            return config;
        }, err => { return Promise.reject(err) });

        if (method === 'GET') {
            promise = axios.get(BASE + url, { params: data })
        } else if (method === 'POST') {
            promise = axios.post(BASE + url, data)
        }
        promise.then(data => {
            if (data.data.code === 1) {
                resolve(data)
            } else {
                message.error(data.data.msg)
            }
        }).catch(err => {
            message.error("请求出错！" + err.message)
        })
    })
}
