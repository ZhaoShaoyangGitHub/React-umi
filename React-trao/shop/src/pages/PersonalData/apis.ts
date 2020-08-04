import Request from '../../utils/request'

export const getUserInfo = () =>
    Request({
        url: '/api/user/getUserInfo',
        method: 'GET',
    })
export const updateUser = (data) =>
    Request({
        url: '/api/user/updateUser',
        method: 'POST',
        data,
    })
