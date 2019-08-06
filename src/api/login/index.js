import ajax from '../../api/config'

export const reqLogin = (data)=> ajax("user/login",data,"POST")
