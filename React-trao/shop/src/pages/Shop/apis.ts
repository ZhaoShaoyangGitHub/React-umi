import Request from '../../utils/request'

export const getShopInfo = (data) =>
    Request({
        url: '/api/user/shop/info',
        method: 'GET',
        data,
    })
