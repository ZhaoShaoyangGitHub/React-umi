import Request from '../../utils/request'

export const updatePassword = (data) =>
    Request({
        url: '/api/user/update/password',
        method: 'POST',
        data,
    })

export const verifyPassword = (data) =>
    Request({
        url: '/api/user/verify/password',
        method: 'POST',
        data,
    })
