import Request from '../../utils/request'

export const updateShopImage = (data) =>
    Request({
        url: '/api/user/shop/updatePhoto',
        method: 'POST',
        data,
    })

export const updatePhoto = (data) =>
    Request({
        url: '/api/user/shop/updateShopImage',
        method: 'POST',
        data,
    })

export const updateShopInfo = (data) =>
    Request({
        url: '/api/shop/updateShopInfo',
        method: 'POST',
        data,
    })
