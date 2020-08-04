import * as StoreInfoApi from './apis'

export default {
    namespace: 'StoreInfo',
    state: {
        StoreInfoDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreInfoDataList: [].concat(payload) }
        },
    },
    effects: {
        *updateShopImage(action, { call, put }) {
            const { code, data } = yield call(StoreInfoApi.updateShopImage, action.payload)
            if (code === 'OK') {
                if (code === 'OK') {
                    action.cb && action.cb(data)
                }
            }
        },
        *updatePhoto(action, { call, put }) {
            const { code, data } = yield call(StoreInfoApi.updatePhoto, action.payload)
            if (code === 'OK') {
                if (code === 'OK') {
                    action.cb && action.cb(data)
                }
            }
        },
        *updateShopInfo(action, { call, put }) {
            const { code, data } = yield call(StoreInfoApi.updateShopInfo, action.payload)
            if (code === 'OK') {
                if (code === 'OK') {
                    action.cb && action.cb(data)
                }
            }
        },
    },
}
