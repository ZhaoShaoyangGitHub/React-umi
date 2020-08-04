/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-26 16:24:52
 */
import * as ModifyMobileNumberApi from './apis'

export default {
    namespace: 'ModifyMobileNumber',
    state: {
        ModifyMobileNumberDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ModifyMobileNumberDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(ModifyMobileNumberApi.demo, {})
            if (code === 'OK') {
                console.log('OK')
            }
        },
        *verifyPhone(action, { call, put }) {
            const { code, data } = yield call(ModifyMobileNumberApi.verifyFixPhone, action.params)
            action.cb && action.cb(code, data)
        },
        *sendCode(action, { call, put }) {
            const { code, data } = yield call(ModifyMobileNumberApi.sendCodeByFixPhone, action.params)
            if (code === 'OK') {
                console.log('OK')
                action.cb(data)
            }
        },
        *updateMobile(action, { call, put }) {
            const { code, data, message } = yield call(ModifyMobileNumberApi.userUpdateMobile, action.params)
            if (code === 'OK') {
                console.log('OK')
                action.cb(message)
            }
        },
    },
}
