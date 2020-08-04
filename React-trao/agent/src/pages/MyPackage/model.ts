import * as MyPackageApi from './apis'

export default {
    namespace: 'MyPackage',
    state: {
        MyPackageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyPackageDataList: [].concat(payload) }
        },
    },
    effects: {
        *getGoodsPackage({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyPackageApi.getGoodsPackage, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *addGoodsPackage({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyPackageApi.addGoodsPackage, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *getPackageDetail({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyPackageApi.getPackageDetail, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *getServiceProject({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyPackageApi.getServiceProject, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *upDownPackageStore({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyPackageApi.upDownPackageStore, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
