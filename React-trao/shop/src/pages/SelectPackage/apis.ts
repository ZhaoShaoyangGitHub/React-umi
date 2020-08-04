import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const stopPackage = (data) =>
    Request({
        url: '/api/user/order/package/suspended',
        method: 'GET',
        data,
    })

export const refundList = (data) =>
    Request({
        url: '/api/user/order/order/pageList',
        method: 'GET',
        data,
    })
