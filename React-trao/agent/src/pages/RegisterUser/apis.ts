import Request from '../../utils/request'

export const demo = data =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

export const sendCode = data =>
    Request({
        url: '/api/passport/sendCode',
        method: 'POST',
        data,
    })

export const createUser = data =>
    Request({
        url: '/api/user/createUser',
        method: 'POST',
        data,
    })
export const checkCode = data =>
    Request({
        url: '/api/passport/checkCode',
        method: 'POST',
        data,
    })
