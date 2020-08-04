import Request from '../../utils/request'

export const scheduling = (data) =>
    Request({
        url: '/api/user/technician/scheduling/details',
        method: 'GET',
        data,
    })
