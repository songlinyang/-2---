import {getRequest,postRequest,deleteRequest,putRequest} from './common'


//获取全部service数据
export const getAllTask = function () {
    return getRequest('tasks/')
}

//获取单个service数据
export const getSingleTask = function (taskId) {
    return getRequest(`task/${taskId}/`)
}

//创建服务
export const addTask = function (data) {
    return postRequest('tasks/',data);
}

//删除服务
export const deleteTask = function (taskId) {
    return deleteRequest(`task/${taskId}/`)
}

//更新内容
export const updateTask = function (taskId,data) {
    return putRequest(`task/${taskId}/`,data)

}

