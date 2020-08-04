import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const startPackage = (data) =>
    Request({
        url: '/api/user/order/package/begin',
        method: 'GET',
        data,
    })
export const packageDetail = (data) =>
    Request({
        url: '/api/user/goods/package/get',
        method: 'GET',
        data,
    })
