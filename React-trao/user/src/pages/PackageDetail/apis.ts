/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-22 17:36:49
 * @LastEditTime: 2019-08-26 11:20:32
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
//

export const getPackageDetail = (data) =>
    Request({
        url: '/api/u/goods/package/detail',
        method: 'GET',
        data,
    })
export const addGoodsToCart = (data) => {
    return Request({
        url: '/api/u/cart/add',
        method: 'POST',
        data,
    })
}
export const collect = (data) => {
    return Request({
        url: '/api/u/enshrine/add',
        method: 'POST',
        data,
    })
}
export const cancelCollect = (data) => {
    return Request({
        url: '/api/u/enshrine/delete',
        method: 'POST',
        data,
    })
}
