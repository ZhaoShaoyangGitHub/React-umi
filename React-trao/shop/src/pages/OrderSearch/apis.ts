import Request from '../../utils/request'

export const getOrderPageList = data =>
    Request({
        url: '/api/user/order/pageList',
        method: 'GET',
        data,
    })
