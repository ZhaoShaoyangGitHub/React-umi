import Request from '../../utils/request'

export const technician = (data) =>
    Request({
        url: '/api/user/technician/pageList',
        method: 'GET',
        data,
    })

export const startScheduling = (data) =>
    Request({
        url: '/api/user/technician/scheduling/save',
        method: 'POST',
        data,
    })
