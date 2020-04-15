import {getRequest,postRequest} from './common'


//登陆
export const login = function (username,password) {
    return postRequest('user/login/',{
        username: username,
        password: password
    });
}


//注册
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
    return getRequest('user/logout/'); 
    
}

