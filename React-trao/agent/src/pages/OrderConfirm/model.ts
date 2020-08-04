import * as OrderConfirmApi from './apis'

export default {
    namespace: 'OrderConfirm',
    state: {
        OrderConfirmDataList: [],
        OrderConfirmData: {},
        goodsForms: [],
        registerUser: {},
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OrderConfirmData: payload }
        },
        saveform(state, { payload }) {
            return { ...state, goodsForms: [].concat(payload) }
        },
        saveRegisterUser(state, { payload }) {
            return { ...state, registerUser: payload }
        },
    },
    effects: {
        *saveUserTrade(action, { call, put }) {
            const { code, data, message } = yield call(OrderConfirmApi.saveTrade, action.params)
            // if (code === 'OK') {
            action.cb(code, data, message)
            // }
        },
        // *userJudgeOneTrade(action, { call, put }) {
        //     const { code, data, message } = yield call(OrderConfirmApi.judgeOneTrade, action.params)
        //     // if (code === 'OK') {
        //     action.cb(code, data, message)
        //     // }
        // },
        *getOrderConfirmInfo(action, { call, put }) {
            const { code, data, message } = yield call(OrderConfirmApi.getOrderConfirmInfo, action.params)
            // if (code === 'OK') {
            action.cb(data)
            // }
        },
    },
}
