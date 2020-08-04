import * as UserLoginApi from './apis'
import Taro from '@tarojs/taro'

export default {
    namespace: 'UserLogin',
    state: {
        UserLoginDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, UserLoginDataList: [].concat(payload) }
        },
    },
    effects: {
        *getUserInfo(action, { call, put }) {
            const { code, data } = yield call(UserLoginApi.getUserInfo)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },,
        *userSignIn(action, { call, put }) {
            const { code, data, message } = yield call(UserLoginApi.UserSignIn, action.params)
            if (code === 'OK') {
                action.cb(data, message)
            }
            if (code === 'ServiceError') {
                Taro.showToast({
                    icon: 'none',
                    title: message,
                    duration: 2000,
                })
            }
        },
    },
}
