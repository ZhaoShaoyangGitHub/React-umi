/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-21 15:22:11
 */
import * as GoodsDetailApi from './apis'

export default {
    namespace: 'GoodsDetail',
    state: {
        GoodsDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, GoodsDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(GoodsDetailApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getGoodsDetail(action, { call, put }) {
            const { code, data } = yield call(GoodsDetailApi.goodDetail, action.params)
            if (code === 'OK') {
                console.log(code, data)
                action.cb(data)
            }
        },
    },
}
