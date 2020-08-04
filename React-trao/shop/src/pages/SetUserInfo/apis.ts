import Request from '../../utils/request'

export const getUserInfo = (data) =>
    Request({
        url: '/api/user/userBody',
        method: 'GET',
        data,
    })

export const updateUserInfo = (data) =>
    Request({
        url: '/api/user/update',
        method: 'POST',
        data,
    })
