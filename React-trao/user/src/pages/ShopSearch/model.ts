/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-22 17:30:51
 */
import * as ShopSearchApi from './apis'

export default {
    namespace: 'ShopSearch',
    state: {
        ShopSearchDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ShopSearchDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(ShopSearchApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *shopSearch(action, { call, put }) {
            const { code, data } = yield call(ShopSearchApi.shopSearch, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *packageSearch(action, { call, put }) {
            const { code, data } = yield call(ShopSearchApi.packageSearch, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *goodsSearch(action, { call, put }) {
            const { code, data } = yield call(ShopSearchApi.goodsSearch, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *articleSearch(action, { call, put }) {
            const { code, data } = yield call(ShopSearchApi.articleSearch, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
