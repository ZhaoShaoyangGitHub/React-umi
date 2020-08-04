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
            console.log(code)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
