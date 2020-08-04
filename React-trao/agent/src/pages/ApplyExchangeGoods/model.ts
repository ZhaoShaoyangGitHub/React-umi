import * as ApplyExchangeGoodsApi from './apis'

export default {
    namespace: 'ApplyExchangeGoods',
    state: {
        ApplyExchangeGoodsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ApplyExchangeGoodsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(ApplyExchangeGoodsApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
