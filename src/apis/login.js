// 封装所有和用户登录注册相关的接口函数
import httpInstance from "@/utils/http";

// 用户登录接口
export const loginAPI = (username, password) => {
    return httpInstance({
        url: 'user/login',
        method: 'POST',
        params: {
            username,
            password
        }
    })
}

// 用户注册接口
export const registerAPI = (username, password) => {
    return httpInstance({
        url: '/user/register',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}