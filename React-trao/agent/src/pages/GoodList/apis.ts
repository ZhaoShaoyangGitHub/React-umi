import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const getPageList = (data) =>
    Request({
        url: '/api/goods/pageList',
        method: 'GET',
        data,
    })
export const getCategory = (data) =>
    Request({
        url: '/api/goods/category/list',
        method: 'GET',
        data,
    })
export const postOrderTrade = (data) =>
    Request({
        url: '/api/user/order/getTrade/affirm',
        method: 'POST',
        data,
    })

export const addShoppingCart = (data) =>
    Request({
        url: '/api/cart/add',
        method: 'POST',
        data,
    })
