import * as ShopApi from './apis'

export default {
    namespace: 'Shop',
    state: {
        ShopDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ShopDataList: [].concat(payload) }
        },
    },
    effects: {
        *getShopInfo({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ShopApi.getShopInfo, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
