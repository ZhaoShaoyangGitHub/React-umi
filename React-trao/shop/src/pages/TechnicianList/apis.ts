import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/user/technician/pageList',
        method: 'GET',
        data,
    })

export const changeTechnicianState = (data) =>
    Request({
        url: '/api/user/technician/disable',
        method: 'POST',
        data,
    })
