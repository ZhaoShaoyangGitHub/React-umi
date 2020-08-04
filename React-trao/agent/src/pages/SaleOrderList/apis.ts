/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-23 16:10:33
 */
import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

// export const getOrderList = (data) => {
//     return Request({
//         url: '/api/order/pageList',
//         method: 'GET',
//         data,
//     })
// }
