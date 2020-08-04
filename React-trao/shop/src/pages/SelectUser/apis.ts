import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const findVipUser = (data) =>
    Request({
        url: '/api/user/getUserPage',
        method: 'GET',
        data,
    })

export const register = (data) =>
    Request({
        url: '/api/user/add/userInfo',
        method: 'GET',
        data,
    })
