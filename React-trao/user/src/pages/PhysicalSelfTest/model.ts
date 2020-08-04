import * as PhysicalSelfTestApi from './apis'

export default {
    namespace: 'PhysicalSelfTest',
    state: {
        PhysicalSelfTestDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PhysicalSelfTestDataList: [].concat(payload) }
        },
    },
    effects: {
        *getQuestionList({ payload, cb }, { call, put }) {
            const { code, data } = yield call(PhysicalSelfTestApi.getQuestionList, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *getResult({ payload, cb }, { call, put }) {
            const { code, data } = yield call(PhysicalSelfTestApi.getResult)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *saveResult({ payload, cb }, { call, put }) {
            const { code, data } = yield call(PhysicalSelfTestApi.saveResult, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
