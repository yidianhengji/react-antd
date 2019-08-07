import ajax from '../../api/config'

/* 查询用户列表 */
export const reqUserQueryList = (data)=> ajax("user/queryAll",data,"POST");
