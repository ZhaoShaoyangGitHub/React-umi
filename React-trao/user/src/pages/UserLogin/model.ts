/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-22 10:11:08
 * @LastEditTime: 2019-08-27 10:56:15
 */
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
        *sendCode(action, { call, put }) {
            const { code, data, message } = yield call(UserLoginApi.getMsgCode, action.payload)

            if (action.cb) {
                action.cb(message)
            }
        },
        *userLog(action, { call, put }) {
            try {
                const response = yield call(UserLoginApi.userLogin, action.payload)

                if (response.code === 'OK') {
                    action.cb(response.data, response.code)
                }
                if (response.code === 'ServiceError') {
                    Taro.showToast({
                        title: response.message,
                        icon: 'none',
                        mask: true,
                        duration: 1000,
                    })
                }
            } catch (e) {
                Taro.showToast({
                    title: JSON.stringify(e),
                    icon: 'none',
                    mask: true,
                    duration: 1000,
                })
            }
        },
    },
}
