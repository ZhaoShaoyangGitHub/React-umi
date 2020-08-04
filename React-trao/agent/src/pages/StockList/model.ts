import * as StockListApi from './apis'

export default {
    namespace: 'StockList',
    state: {
        StockListDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StockListDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(StockListApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getgoodsNameList(action, { call, put }) {
            const { code, data } = yield call(StockListApi.goodsNameList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getgoodsRecordList(action, { call, put }) {
            const { code, data } = yield call(StockListApi.goodsRecordList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *deliverTrade(action, { call, put }) {
            const { code, data } = yield call(StockListApi.deliverTrade, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
