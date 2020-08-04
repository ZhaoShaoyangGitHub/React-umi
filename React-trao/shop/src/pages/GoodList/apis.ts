import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const getPackagePageList = (data) =>
    Request({
        url: '/api/user/goods/package/pageList',
        method: 'GET',
        data,
    })
export const getGoddsPageList = (data) =>
    Request({
        url: '/api/user/goods/entity/pageList',
        method: 'GET',
        data,
    })
export const getCategory = (data) =>
    Request({
        url: '/api/common/getCategory',
        method: 'GET',
        data,
    })
export const postOrderTrade = (data) =>
    Request({
        url: '/api/user/order/getTrade/affirm',
        method: 'POST',
        data,
    })
