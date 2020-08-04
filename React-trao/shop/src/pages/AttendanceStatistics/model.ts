import * as AttendanceStatisticsApi from './apis'

export default {
    namespace: 'AttendanceStatistics',
    state: {
        AttendanceStatisticsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AttendanceStatisticsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getStatistical({ payload, cb }, { call, put }) {
            const { code, data } = yield call(AttendanceStatisticsApi.getStatistical, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
