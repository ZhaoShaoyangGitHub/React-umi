/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-19 10:34:35
 * @LastEditTime: 2019-08-26 14:26:59
 */

import Request from '../../utils/request'

export const signIn = () =>
    Request({
        url: '/api/user/sign',
        method: 'POST',
    })

export const getUserInfo = (data) =>
    Request({
        url: '/api/user/userInfo',
        method: 'GET',
        data,
    })
