import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const endService = (data) =>
    Request({
        url: '/api/user/order/service/end',
        method: 'POST',
        data,
    })
