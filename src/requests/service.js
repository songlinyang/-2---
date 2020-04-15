import {getRequest,postRequest,deleteRequest,patchRequest} from './common'


//获取全部service数据
export const getAllService = function (username,password) {
    return postRequest('user/login/',{
        username: username,
        password: password
    });
}


//修改
export const register = function (username,password) {
    return postRequest('user/register/',{
        username: username,
        password: password
    });
}

//获取用户信息
export const getLoginUserInfo = function () {
    return getRequest('user/info/');
}

//退出登录
export const logout = function () { 
    return getRequest(''); 
    
}

