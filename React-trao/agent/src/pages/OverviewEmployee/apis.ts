import Request from '../../utils/request'

export const getStaffStatistics = (data) =>
    Request({
        url: '/api/statistics/staff',
        method: 'GET',
        data,
    })
