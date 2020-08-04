/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-22 10:11:08
 * @LastEditTime: 2019-08-22 11:02:39
 */
import Request from '../../utils/request'

//微信授权 获取sessionKey
export const getWechatKey = (data) =>
    Request({
        url: '/api/passport/wechatKey',
        method: 'GET',
        data,
    })

//微信授权-获取手机号
export const getWechatPhone = (data) =>
    Request({
        url: '/api/passport/wechatPhone',
        method: 'GET',
        data,
    })

export const getMsgCode = (data) =>
    Request({
        url: '/api/passport/sendCode',
        method: 'POST',
        data,
    })

export const userLogin = (data) =>
    Request({
        url: '/api/passport/signIn',
        method: 'POST',
        data,
    })
