/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-08 15:39:21
 * @LastEditTime: 2019-08-26 09:59:05
 */
import Request from '../../utils/request'
import { Goods } from './index.interface'

export const demo = data =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
// 应该在商品详情页
export const addGoodsToCart = (data: Goods) => {
    return Request({
        url: '/api/u/cart/add',
        method: 'POST',
        data,
    })
}
// /api/u/goods/package/detail
export const goodDetail = data =>
    Request({
        url: '/api/u/goods/detail',
        method: 'GET',
        data,
    })
