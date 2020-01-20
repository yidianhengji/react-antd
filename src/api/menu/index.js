import ajax from '../../api/config'

export const reqMenuTree = (data) => ajax("menu/tree", data, "POST");

export const reqMenuQuery = (data) => ajax("menu/query", data, "POST");

export const reqMenuQueryAll = (data) => ajax("menu/queryAll", data, "POST");

export const reqMenuAdd = (data) => ajax("menu/add", data, "POST");

export const reqMenuUpdate = (data) => ajax("menu/update", data, "POST");

export const reqMenuQueryOne = (data) => ajax("menu/queryOne", data, "POST");
