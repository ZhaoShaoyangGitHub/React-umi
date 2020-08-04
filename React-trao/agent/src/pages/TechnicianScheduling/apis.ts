import Request from '../../utils/request'

export const scheduling = (data) =>
    Request({
        url: '/api/technician/scheduling/list',
        method: 'GET',
        data,
    })
export const schedulingDetail = (data) =>
    Request({
        url: '/api/technician/scheduling/details',
        method: 'GET',
        data,
    })
