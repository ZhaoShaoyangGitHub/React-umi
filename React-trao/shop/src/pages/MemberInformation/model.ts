/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-23 10:06:18
 */
import * as MemberInformation from './apis'
export default {
    namespace: 'MemberInformation',
    state: {
        MemberInformationDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MemberInformationDataList: [].concat(payload) }
        },
    },
    effects: {
        *getVipInfo({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberInformation.getVipInfo, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
