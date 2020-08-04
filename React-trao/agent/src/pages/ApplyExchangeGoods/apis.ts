import Request from '../../utils/request'

export const pageList = data =>
    Request({
        url: '/api/user/order/scheduling/pageList',
        method: 'GET',
        data,
    })
