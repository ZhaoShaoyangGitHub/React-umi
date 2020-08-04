import Request from '../../utils/request'

export const getUserStatistics = (data) =>
    Request({
        url: '/api/statistics/user',
        method: 'GET',
        data,
    })
