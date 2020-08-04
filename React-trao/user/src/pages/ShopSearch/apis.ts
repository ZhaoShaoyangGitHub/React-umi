/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-22 17:31:51
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const shopSearch = (data) =>
    Request({
        url: '/api/u/shop/search',
        method: 'GET',
        data,
    })
export const packageSearch = (data) =>
    Request({
        url: '/api/u/goods/package/search',
        method: 'GET',
        data,
    })
export const goodsSearch = (data) =>
    Request({
        url: '/api/u/goods/search',
        method: 'GET',
        data,
    })
export const articleSearch = (data) =>
    Request({
        url: '/api/u/article/list',
        method: 'GET',
        data,
    })
