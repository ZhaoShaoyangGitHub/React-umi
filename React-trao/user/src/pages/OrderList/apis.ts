/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-23 16:10:33
 */
import Request from '../../utils/request'

export const deleteTrade = (data) =>
    Request({
        url: '/api/u/order/deleteTrade',
        method: 'POST',
        data,
    })

export const getOrderList = (data) => {
    return Request({
        url: '/api/u/order/get/trade',
        method: 'GET',
        data,
    })
}
