import Request from '../../utils/request'

export const packageDetail = (data) =>
    Request({
        url: '/api/user/order/get/packageDetail',
        method: 'GET',
        data,
    })

export const technician = (data) =>
    Request({
        url: '/api/user/order/get/technician',
        method: 'GET',
        data,
    })

export const appointmentDetail = (data) =>
    Request({
        url: '/api/user/order/get/appointment/details',
        method: 'GET',
        data,
    })

export const saveappointment = (data) =>
    Request({
        url: '/api/user/order/package/appointment',
        method: 'POST',
        data,
    })

export const serviceTime = (data) =>
    Request({
        url: '/api/user/order/get/shop/workingTime',
        method: 'GET',
        data,
    })

export const editappointment = (data) =>
    Request({
        url: '/api/user/order/update/package/appointment',
        method: 'POST',
        data,
    })
