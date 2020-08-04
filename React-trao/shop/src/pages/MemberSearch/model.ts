import * as MemberSearchApi from './apis'

export default {
    namespace: 'MemberSearch',
    state: {
        MemberSearchDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MemberSearchDataList: [].concat(payload) }
        },
    },
    effects: {
        *getVipUser(action, { call, put }) {
            const { code, data } = yield call(MemberSearchApi.getVipUser, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *getAppointmentRecord(action, { call, put }) {
            const { code, data } = yield call(MemberSearchApi.getAppointmentRecord, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
