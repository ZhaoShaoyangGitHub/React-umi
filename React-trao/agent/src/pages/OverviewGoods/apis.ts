import Request from '../../utils/request'

export const getGoodsStatistics = (data) =>
    Request({
        url: '/api/statistics/goods',
        method: 'GET',
        data,
    })
