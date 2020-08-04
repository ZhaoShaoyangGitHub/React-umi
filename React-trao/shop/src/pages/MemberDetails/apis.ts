import Request from '../../utils/request'

export const getVipUserDetails = (data) =>
    Request({
        url: '/api/user/getVipUser/details',
        method: 'GET',
        data,
    })
