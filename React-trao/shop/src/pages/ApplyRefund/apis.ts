import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const applyRefund = (data) =>
    Request({
        url: '/api/user/order/refund/order',
        method: 'POST',
        data,
    })
export const orderDetail = (data) =>
    Request({
        url: '/api/user/order/orderDetail',
        method: 'GET',
        data,
    })
