import Request from '../../utils/request'

export const getShopDetails = (data) =>
    Request({
        url: '/api/shop/getShop',
        method: 'GET',
        data,
    })
