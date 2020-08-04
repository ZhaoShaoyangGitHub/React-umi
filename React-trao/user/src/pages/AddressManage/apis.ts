/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 15:08:17
 * @LastEditTime: 2019-08-23 11:11:16
 */
import Request from '../../utils/request'

export const getAddressList = data => {
    return Request({
        url: '/api/u/address/get/address',
        method: 'GET',
        data,
    })
}
