import * as StoreBalanceApi from './apis'

export default {
    namespace: 'StoreBalance',
    state: {
        StoreBalanceDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreBalanceDataList: [].concat(payload) }
        },
    },
    effects: {
        *getShopDetails(action, { call, put }) {
            const { code, data } = yield call(StoreBalanceApi.getShopDetails, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
