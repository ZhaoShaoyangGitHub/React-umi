/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-21 15:05:02
 */
import { Address } from './index.interface'
import Request from '../../utils/request'

export const addAddress = (data: Address) => {
    return Request({
        url: '/api/u/address/add',
        method: 'POST',
        data,
    })
}
export const deleteAddress = (data: Address) => {
    return Request({
        url: '/api/u/address/delete',
        method: 'GET',
        data,
    })
}
/**
 * @description:
 * @param {
    "address": "",
    "city": "",
    "createTime": "",
    "district": "",
    "id": 0,
    "isDefault": "",
    "name": "",
    "phone": "",
    "province": "",
    "updateTime": "",
    "userId": 0,
    "zip": ""
}
 * @return:
 */
export const updateAddress = (data: Address) => {
    return Request({
        url: '/api/u/address/update',
        method: 'POST',
        data,
    })
}
