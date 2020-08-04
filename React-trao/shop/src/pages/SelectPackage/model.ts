import * as SelectPackageApi from './apis'

export default {
    namespace: 'SelectPackage',
    state: {
        SelectPackageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, SelectPackageDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(SelectPackageApi.demo, {})
            if (code === 'OK') {
            }
        },
        *stopPackage(action, { call, put }) {
            const { code, data } = yield call(SelectPackageApi.stopPackage, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getRefundList(action, { call, put }) {
            const { code, data } = yield call(SelectPackageApi.refundList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
