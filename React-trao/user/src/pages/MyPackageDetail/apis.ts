import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const getPackageServiceRecord = (data) =>
    Request({
        url: '/api/u/order/obtain/serviceRecord',
        method: 'GET',
        data,
    })
