import ajax from '../../api/config'

/* 查询角色列表 */
export const reqRoleQueryAll = (data)=> ajax("role/queryAll",data,"POST");
