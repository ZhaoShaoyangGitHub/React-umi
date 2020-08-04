import Request from '../../utils/request'

export const getOrderDetails = (data) =>
    Request({
        url: '/api/user/order/getTrade',
        method: 'GET',
        data,
    })
