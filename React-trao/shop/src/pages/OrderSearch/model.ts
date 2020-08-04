import * as OrderSearchApi from './apis'

export default {
    namespace: 'OrderSearch',
    state: {
        OrderSearchDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OrderSearchDataList: [].concat(payload) }
        },
    },
    effects: {
        *searchOrderList(action, { call, put }) {
            const { code, data, message } = yield call(OrderSearchApi.getOrderPageList, action.params)
            action.cb(code, data, message)
        },
    },
}
