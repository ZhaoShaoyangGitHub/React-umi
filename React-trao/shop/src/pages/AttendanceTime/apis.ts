import Request from '../../utils/request'

export const startWork = (data) =>
    Request({
        url: '/api/user/attendance/startWork',
        method: 'POST',
        data,
    })

export const offDuty = (data) =>
    Request({
        url: '/api/user/attendance/offDuty',
        method: 'POST',
        data,
    })

export const attendanceStatus = () =>
    Request({
        url: '/api/user/get/attendance',
        method: 'GET',
    })

export const getAddressDistance = (data) =>
    Request({
        url: '/api/user/home/address/distance',
        method: 'GET',
        data,
    })
