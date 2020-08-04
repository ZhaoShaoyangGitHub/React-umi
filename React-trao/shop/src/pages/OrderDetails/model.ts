import * as OrderDetailsApi from './apis'

export default {
    namespace: 'OrderDetails',
    state: {
        OrderDetailsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OrderDetailsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getOrderDetails({ payload, cb }, { call, put }) {
            const { code, data } = yield call(OrderDetailsApi.getOrderDetails, payload)
            if (code === 'OK') {
                cb & cb(data)
            }
        },
    },
}
