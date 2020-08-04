import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const saveTrade = (data) =>
    Request({
        url: '/api/order/affirm/saveTrade',
        method: 'POST',
        data,
    })

// 获取提交订单页面数据
export const getOrderConfirmInfo = (data) =>
    Request({
        url: '/api/cart/clearing/detail',
        method: 'POST',
        data,
    })
