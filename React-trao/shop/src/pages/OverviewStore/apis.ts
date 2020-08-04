import Request from '../../utils/request'

export const getShopStatistics = (data) =>
    Request({
        url: '/api/user/statistics/shop',
        method: 'GET',
        data,
    })
