import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/user/technician/pageList',
        method: 'GET',
        data,
    })

export const getTechnicianDetail = (data) =>
    Request({
        url: '/api/user/technician/detail',
        method: 'GET',
        data,
    })
