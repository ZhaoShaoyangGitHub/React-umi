import Request from '../../utils/request'

export const packageList = (data) =>
    Request({
        url: '/api/u/order/get/packageList',
        method: 'GET',
        data,
    })

export const appointment = (data) =>
    Request({
        url: '/api/u/order/get/appointment',
        method: 'GET',
        data,
    })
export const cancelAppointment = (data) =>
    Request({
        url: '/api/u/order/cancel/appointment',
        method: 'GET',
        data,
    })

export const confirmService = (data) =>
    Request({
        url: '/api/u/order/confirm/appointment',
        method: 'GET',
        data,
    })
