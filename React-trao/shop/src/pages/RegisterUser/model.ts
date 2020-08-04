import * as RegisterUserApi from './apis'

export default {
    namespace: 'RegisterUser',
    state: {
        RegisterUserDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, RegisterUserDataList: [].concat(payload) }
        },
    },
    effects: {
        *sendVertifyCode(action, { call, put }) {
            const { code, data, message } = yield call(RegisterUserApi.sendCode, action.params)
            action.cb(code, message)
        },
        *createUserReg(action, { call, put }) {
            const { code, data } = yield call(RegisterUserApi.createUser, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *checkCodePassport(action, { call, put }) {
            const { code, data, message } = yield call(RegisterUserApi.checkCode, action.params)
            action.cb(code, message)
        },
    },
}
