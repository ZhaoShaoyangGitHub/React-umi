import Request from '../../utils/request'

export const packageDetail = (data) =>
    Request({
        url: '/api/u/order/get/packageDetail',
        method: 'GET',
        data,
    })

export const technician = (data) =>
    Request({
        url: '/api/u/order/get/technician',
        method: 'GET',
        data,
    })
export const saveappointment = (data) =>
    Request({
        url: '/api/u/order/package/appointment',
        method: 'POST',
        data,
    })
export const serviceTime = (data) =>
    Request({
        url: '/api/u/order/get/shop/workingTime',
        method: 'GET',
        data,
    })
