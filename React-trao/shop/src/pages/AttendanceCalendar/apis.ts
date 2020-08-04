import Request from '../../utils/request'

export const getAttendanceCalendar = (data) =>
    Request({
        url: '/api/user/attendance/calendar',
        method: 'GET',
        data,
    })
