import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/shop/flow/list',
        method: 'GET',
        data,
    })
