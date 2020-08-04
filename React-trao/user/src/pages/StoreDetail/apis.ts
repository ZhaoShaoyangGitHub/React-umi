/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-22 16:27:42
 */
import Request from '../../utils/request'

export const demo = data =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const shopDetail = data =>
    Request({
        url: '/api/u/shop/detail',
        method: 'GET',
        data,
    })
