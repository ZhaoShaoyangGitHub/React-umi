/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 13:52:49
 * @LastEditTime: 2019-08-24 13:48:12
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const getTradeDetail = (data) =>
    Request({
        url: '/api/user/order/getTrade',
        method: 'GET',
        data,
    })
