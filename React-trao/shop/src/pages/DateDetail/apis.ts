import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const getSchedulingDetail = (data) =>
    Request({
        url: '/api/user/order/scheduling/details',
        method: 'GET',
        data,
    })

export const startService = (data) =>
    Request({
        url: '/api/user/order/service/start',
        method: 'POST',
        data,
    })
