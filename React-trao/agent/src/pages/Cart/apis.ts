/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-08 15:39:21
 * @LastEditTime: 2019-08-23 13:54:33
 */
import Request from '../../utils/request'
import { CartClass, Enshrine } from './index.interface'

export const getCartList = () => {
    return Request({
        url: '/api/cart/list',
    })
}
/**
 * @description: 查询购物车数量
 * @param
 * @return:
 */
export const getCartQuantity = () => {
    return Request({
        url: '/api/cart/count',
        method: 'GET',
    })
}
/**
 * @description: 修改购物车数量
 * @param {
 * id	购物车id	query	false	integer
 * }
 * @return:
 */
export const deleteCart = (data: CartClass) => {
    return Request({
        url: '/api/cart/delete',
        method: 'POST',
        data,
    })
}
/**
 * @description: 修改购物车数量
 * @param {
 * id	购物车id	query	false	integer
 * amount	购买数量	query	false	integer
 * }
 * @return:
 */
export const changeCartAmount = (data: CartClass) => {
    return Request({
        url: `/api/cart/amount/update`,
        method: 'POST',
        data,
    })
}
/**
 * @description: 添加收藏
 * @param {
    "createTime": "",
    "domainId": 0,
    "id": 0,
    "shopId": 0,
    "type": "",
    "updateTime": "",
    "userId": 0
}
    * @return:
    */
export const addToStar = (data: Enshrine) => {
    return Request({
        url: '/api/u/enshrine/add',
        method: 'POST',
        data,
    })
}
