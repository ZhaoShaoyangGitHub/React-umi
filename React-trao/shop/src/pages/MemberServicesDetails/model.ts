import * as MemberServicesDetailsApi from './apis'

export default {
    namespace: 'MemberServicesDetails',
    state: {
        MemberServicesDetailsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MemberServicesDetailsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getServiceDetails({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberServicesDetailsApi.getServiceDetails, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
