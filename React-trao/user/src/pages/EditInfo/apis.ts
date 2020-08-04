import Request from '../../utils/request'

export const demo = data =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const getUserInfo = () =>
    Request({
        url: '/api/user/userInfo',
        method: 'GET',
    })

export const updateUserInfo = data =>
    Request({
        url: '/api/user/update',
        method: 'POST',
        data,
    })
