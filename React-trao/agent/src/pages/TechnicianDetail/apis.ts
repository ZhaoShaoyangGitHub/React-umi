import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/technician/pageList',
        method: 'GET',
        data,
    })

export const getTechnicianDetail = (data) =>
    Request({
        url: '/api/technician/detail',
        method: 'GET',
        data,
    })
