import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/technician/pageList',
        method: 'GET',
        data,
    })

export const changeTechnicianState = (data) =>
    Request({
        url: '/api/technician/disable',
        method: 'POST',
        data,
    })
