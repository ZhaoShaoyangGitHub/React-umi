/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 09:49:55
 * @LastEditTime: 2019-08-23 14:31:15
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

// 获取购物车选择的要结算的数据
export const getCartData = (data) => {
    return Request({
        url: '/api/u/cart/single/arithmetic',
        method: 'POST',
        data,
    })
}
// 获取购物车选择的要结算的数据
export const getGoodsData = (data) => {
    return Request({
        url: '/api/u/order/goods/confirm',
        method: 'POST',
        data,
    })
}
// 确认并支付(商品)订单
export const confirmAndPay = (data) => {
    return Request({
        url: '/api/u/order/pay/goods',
        method: 'POST',
        data,
    })
}
// 确认(购物车)订单
export const confirm = (data) => {
    return Request({
        url: '/api/u/order/affirm/order',
        method: 'POST',
        data,
    })
}
// 支付(购物车)订单
export const pay = (data) => {
    return Request({
        url: '/api/u/order/payment/order',
        method: 'GET',
        data,
    })
}
// 获取支付参数
export const getPayParam = (data) => {
    return Request({
        url: '/api/user/payApplet',
        method: 'POST',
        data,
    })
}
