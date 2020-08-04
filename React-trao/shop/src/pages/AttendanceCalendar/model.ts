import * as AttendanceCalendarApi from './apis'

export default {
    namespace: 'AttendanceCalendar',
    state: {
        AttendanceCalendarDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AttendanceCalendarDataList: [].concat(payload) }
        },
    },
    effects: {
        *getAttendanceCalendar({ payload, cb }, { call, put }) {
            const { code, data } = yield call(AttendanceCalendarApi.getAttendanceCalendar, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
