import ajax from '../../api/config'

export const reqRoleQuery = (data) => ajax("role/query", data, "POST");

export const reqRoleQueryAll = (data) => ajax("role/queryAll", data, "POST");

export const reqRoleAdd = (data) => ajax("role/add", data, "POST");

export const reqRoleUpdate = (data) => ajax("role/update", data, "POST");

export const reqRoleQueryOne = (data) => ajax("role/queryOne", data, "POST");
