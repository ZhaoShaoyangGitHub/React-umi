import * as MyPackageDetailApi from './apis'

export default {
    namespace: 'MyPackageDetail',
    state: {
        MyPackageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyPackageDataList: [].concat(payload) }
        },
    },
    effects: {
        *getPackageServiceRecord(action, { call, put }) {
            const { code, data } = yield call(MyPackageDetailApi.getPackageServiceRecord, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
