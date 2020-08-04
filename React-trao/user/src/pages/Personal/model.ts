/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-19 10:34:35
 * @LastEditTime: 2019-08-26 14:13:55
 */
import * as PersonalApi from './apis'

export default {
    namespace: 'Personal',
    state: {
        PersonalDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PersonalDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsSignIn(action, { call, put }) {
            const { code, data } = yield call(PersonalApi.signIn, {})
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *fetchUserInfo(action, { call, put }) {
            const { code, data, message } = yield call(PersonalApi.getUserInfo)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
