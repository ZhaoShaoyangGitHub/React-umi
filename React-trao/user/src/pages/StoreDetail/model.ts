/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-22 16:30:24
 */
import * as StoreDetailApi from './apis'

export default {
    namespace: 'StoreDetail',
    state: {
        StoreDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(StoreDetailApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getShopDetail(action, { call, put }) {
            const { code, data } = yield call(StoreDetailApi.shopDetail, action.params)
            if (code === 'OK') {
                console.log(code, data)
                action.cb(data)
            }
        },
    },
}
