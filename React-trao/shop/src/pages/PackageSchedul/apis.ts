import Request from '../../utils/request'

export const appointment = (data) =>
    Request({
        url: '/api/user/order/get/user/appointment',
        method: 'GET',
        data,
    })
export const packageList = (data) =>
    Request({
        url: '/api/user/order/get/packageList',
        method: 'GET',
        data,
    })

export const getVipInfo = (data) =>
    Request({
        url: '/api/user/getOrdinaryUserInfo',
        method: 'GET',
        data,
    })
