import {getRequest,postRequest,deleteRequest,putRequest} from './common'

// 获取接口
export const getInterfaces = function(serviceId){
    return getRequest(`interfaces/?service_id=${serviceId}`)
};



// 创建接口
export const addInterface = function (data) {
    return postRequest(`interfaces/`,data)
};



// 编辑接口
export const updateInterface = function (interface_id,data) {
    return postRequest(`interface/${interface_id}/`,data)

};



// 删除接口
export const delInterface = function (interface_id) {
    return deleteRequest(`interface/${interface_id}/`)

};




// 更改接口
export const putInterface = function (interface_id) {
    return putRequest(`interface/${interface_id}/`)

}



