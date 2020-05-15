import {getRequest,postRequest,deleteRequest,putRequest} from './common'


//获取全部service数据
export const getAllService = function () {
    return getRequest('services/')
}

//获取单个service数据
export const getSingleService = function (serviceId) {
    return getRequest(`service/${serviceId}/`)
}

//创建服务
export const addService = function (data) {
    return postRequest('services/',data);
}

//删除服务
export const deleteService = function (serviceId) {
    return deleteRequest(`service/${serviceId}/`)
}

//更新内容
export const updateService = function (serviceId,data) { 
    return putRequest(`service/${serviceId}/`,data) 
    
}

