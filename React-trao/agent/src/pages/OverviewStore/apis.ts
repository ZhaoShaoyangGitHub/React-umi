import Request from '../../utils/request'

export const getShopStatistics = (data) =>
    Request({
        url: '/api/statistics/shop',
        method: 'GET',
        data,
    })
