import * as StartPackageApi from './apis'

export default {
    namespace: 'StartPackage',
    state: {
        StartPackageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StartPackageDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(StartPackageApi.demo, {})
            if (code === 'OK') {
            }
        },
        *startPackage(action, { call, put }) {
            const { code, data } = yield call(StartPackageApi.startPackage, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getPackageDetail(action, { call, put }) {
            const { code, data } = yield call(StartPackageApi.packageDetail, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
