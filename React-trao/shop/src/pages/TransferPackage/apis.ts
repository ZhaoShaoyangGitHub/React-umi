import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const transferPackage = (data) =>
    Request({
        url: '/api/user/order/transformation/order',
        method: 'POST',
        data,
    })
