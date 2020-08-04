import Request from '../../utils/request'

export const getStatistical = (data) =>
    Request({
        url: '/api/user/attendance/statistical',
        method: 'GET',
        data,
    })
