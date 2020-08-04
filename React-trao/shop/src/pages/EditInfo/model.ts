/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-23 10:06:18
 */
import * as EditInfoApi from './apis'

export default {
    namespace: 'EditInfo',
    state: {
        EditInfoDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, EditInfoDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(EditInfoApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
    },
}
