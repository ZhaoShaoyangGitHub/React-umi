import Request from '../../utils/request'

export const getServiceRecord = (data) =>
    Request({
        url: '/api/shop/search/service',
        method: 'GET',
        data,
    })
