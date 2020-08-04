import Request from '../../utils/request'

export const schedulingDetail = (data) =>
    Request({
        url: '/api/user/technician/get/scheduling',
        method: 'GET',
        data,
    })
