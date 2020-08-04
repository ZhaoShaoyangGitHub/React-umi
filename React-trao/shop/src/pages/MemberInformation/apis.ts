import Request from '../../utils/request'

export const getVipInfo = (data) =>
    Request({
        url: '/api/user/getVipInfo',
        method: 'GET',
        data,
    })
