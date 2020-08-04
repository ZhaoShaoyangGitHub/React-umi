import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/user/technician/appointment/list',
        method: 'GET',
        data,
    })
