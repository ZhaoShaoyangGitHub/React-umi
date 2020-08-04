import * as AppointmentListApi from './apis'

export default {
    namespace: 'AppointmentList',
    state: {
        AppointmentListDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AppointmentListDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(AppointmentListApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
