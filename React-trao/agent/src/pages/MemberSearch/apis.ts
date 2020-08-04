import Request from '../../utils/request'

export const getVipUser = (data) =>
    Request({
        url: '/api/user/getVipUserPage',
        method: 'GET',
        data,
    })
