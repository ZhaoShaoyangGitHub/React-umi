import * as SubscribeApi from './apis'

export default {
    namespace: 'Subscribe',
    state: {
        SubscribeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, SubscribeDataList: [].concat(payload) }
        },
    },
    effects: {
        *getPackageList(action, { call, put }) {
            const { code, data } = yield call(SubscribeApi.packageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getAppointment(action, { call, put }) {
            const { code, data } = yield call(SubscribeApi.appointment, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *cancelAppointment(action, { call, put }) {
            const { code, data } = yield call(SubscribeApi.cancelAppointment, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *confirmService(action, { call, put }) {
            const { code, data } = yield call(SubscribeApi.confirmService, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
