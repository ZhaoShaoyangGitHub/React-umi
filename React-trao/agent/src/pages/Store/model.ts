import * as StoreApi from './apis'

export default {
    namespace: 'Store',
    state: {
        StoreDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreDataList: [].concat(payload) }
        },
    },
    effects: {
        *getShopDetails(action, { call, put }) {
            const { code, data } = yield call(StoreApi.getShopDetails, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
