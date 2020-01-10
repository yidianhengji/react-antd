import ajax from '../../api/config'

/* 登录接口 */
export const reqLogin = (data) => ajax("user/login", data, "POST");
