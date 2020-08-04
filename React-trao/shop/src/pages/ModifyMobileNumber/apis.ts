/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-26 16:19:09
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

// 校验验证码
export const verifyFixPhone = (data) =>
    Request({
        url: '/api/passport/checkCode',
        method: 'POST',
        data,
    })

// 发送验证码
export const sendCodeByFixPhone = (data) =>
    Request({
        url: '/api/passport/sendCode',
        method: 'POST',
        data,
    })

export const userUpdateMobile = (data) =>
    Request({
        url: '/api/user/updateUser',
        method: 'POST',
        data,
    })
