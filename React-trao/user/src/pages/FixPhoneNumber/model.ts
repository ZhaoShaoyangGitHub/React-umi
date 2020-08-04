/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-26 16:24:52
 */
import * as FixPhoneNumberApi from './apis'

export default {
    namespace: 'FixPhoneNumber',
    state: {
        FixPhoneNumberDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, FixPhoneNumberDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(FixPhoneNumberApi.demo, {})
            if (code === 'OK') {
                console.log('OK')
            }
        },
        *verifyPhone(action, { call, put }) {
            const { code, data } = yield call(FixPhoneNumberApi.verifyFixPhone, action.params)
            if (code === 'OK') {
                console.log('OK')
                action.cb(data)
            }
        },
        *sendCode(action, { call, put }) {
            const { code, data } = yield call(FixPhoneNumberApi.sendCodeByFixPhone, action.params)
            if (code === 'OK') {
                console.log('OK')
                action.cb(data)
            }
        },
        *updateMobile(action, { call, put }) {
            const { code, data, message } = yield call(FixPhoneNumberApi.userUpdateMobile, action.params)
            if (code === 'OK') {
                console.log('OK')
                action.cb(message)
            }
        },
    },
}
