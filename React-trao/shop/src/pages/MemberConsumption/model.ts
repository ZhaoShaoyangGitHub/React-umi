import * as MemberConsumptionApi from './apis'

export default {
    namespace: 'MemberConsumption',
    state: {
        MemberConsumptionDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MemberConsumptionDataList: [].concat(payload) }
        },
    },
    effects: {
        *getConsumptionInfo({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberConsumptionApi.getConsumptionInfo, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *getServiceRecord({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberConsumptionApi.getServiceRecord, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *getPackageList({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberConsumptionApi.getPackageList, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
