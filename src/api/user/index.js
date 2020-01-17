import ajax from '../../api/config'

export const reqUserQueryAllList = (data) => ajax("user/queryAll", data, "POST");

export const reqUserQueryOneList = (data) => ajax("user/queryOne", data, "POST");

export const reqUserQueryList = (data) => ajax("user/query", data, "POST");

export const reqUserAddList = (data) => ajax("user/add", data, "POST");

export const reqUserUpdateList = (data) => ajax("user/update", data, "POST");
