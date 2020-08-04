import Request from '../../utils/request'

export const getServiceRecord = () =>
    Request({
        url: '/api/user/technician/get/service}',
        method: 'GET',
    })
