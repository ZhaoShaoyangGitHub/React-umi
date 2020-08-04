import * as StoreBalanceDetailApi from './apis'

export default {
    namespace: 'StoreBalanceDetail',
    state: {
        StoreBalanceDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreBalanceDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(StoreBalanceDetailApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
