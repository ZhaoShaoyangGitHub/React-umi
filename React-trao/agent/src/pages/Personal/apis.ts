import Request from '../../utils/request'

export const getUserInfo = () =>
    Request({
        url: '/api/user/getUserInfo',
        method: 'GET',
    })
