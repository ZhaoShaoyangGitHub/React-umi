import Request from '../../utils/request'

export const getUserInfo = () =>
    Request({
        url: '/api/user/getUserInfo',
        method: 'GET',
    })
export const UserSignIn = (data) =>
    Request({
        url: '/api/passport/signIn/password',
        method: 'POST',
        data,
    })
