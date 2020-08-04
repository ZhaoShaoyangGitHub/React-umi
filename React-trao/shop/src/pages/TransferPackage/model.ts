import * as TransferPackageApi from './apis'

export default {
    namespace: 'TransferPackage',
    state: {
        TransferPackageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, TransferPackageDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(TransferPackageApi.demo, {})
            if (code === 'OK') {
            }
        },
        *transferPackage(action, { call, put }) {
            const { code, data } = yield call(TransferPackageApi.transferPackage, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
