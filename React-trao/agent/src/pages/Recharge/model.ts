import * as RechargeApi from './apis'

export default {
    namespace: 'Recharge',
    state: {
        RechargeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, RechargeDataList: [].concat(payload) }
        },
    },
    effects: {
        *getBalanceList(action, { call, put }) {
            const { code, data } = yield call(RechargeApi.balanceList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *recharge(action, { call, put }) {
            const { code, data } = yield call(RechargeApi.recharge, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
