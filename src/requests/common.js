import axios from 'axios'


//部分1：非常重要的
axios.defaults.withCredentials=true;


//后端的域名
const backendHost = "http://localhost/api/";

export const postRequest = function (path,data){
    return axios.post(backendHost+path,data)
}

export const putRequest = function (path,data) {
    return axios.put(backendHost+path,data)
}

export const deleteRequest = function (path,data){
    return axios.delete(backendHost+path,data)
}

export const patchRequest = function (path,data) {
    return axios.path(backendHost+path,data)
}

export const getRequest = function (path,data) {
    return axios.get(backendHost + path,{
        params:data
    });
}
