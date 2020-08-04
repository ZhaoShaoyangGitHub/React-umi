import Request from '../../utils/request'

export const getVipUser = (data) =>
    Request({
        url: '/api/user/getVipUserPage',
        method: 'GET',
        data,
    })
export const getAppointmentRecord = (data) =>
    Request({
        url: '/api/user/vip/appointmentRecord',
        method: 'GET',
        data,
    })
