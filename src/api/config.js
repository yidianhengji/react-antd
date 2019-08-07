import axios from 'axios';
import {message} from 'antd'

const BASE = '/demo/'

export default function axja(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        if (method === 'GET') {
            promise = axios.get(BASE + url, {params: data})
        } else if (method === 'POST') {
            promise = axios.post(BASE + url, data)
        }
        promise.then(data => {
            if(data.data.code===200){
                resolve(data)
            } else {
                message.error(data.data.msg)
            }
        }).catch(err => {
            message.error("请求出错！"+ err.message)
        })
    })
}
