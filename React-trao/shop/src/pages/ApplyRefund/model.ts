import * as ApplyRefundApi from './apis'

export default {
    namespace: 'ApplyRefund',
    state: {
        ApplyRefundDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ApplyRefundDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(ApplyRefundApi.demo, {})
            if (code === 'OK') {
            }
        },
        *applyRefund(action, { call, put }) {
            const { code, data } = yield call(ApplyRefundApi.applyRefund, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getPackageDetail(action, { call, put }) {
            const { code, data } = yield call(ApplyRefundApi.orderDetail, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
