/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-08 15:39:21
 * @LastEditTime: 2019-08-23 13:53:33
 */
import * as CartApi from './apis'

export default {
    namespace: 'Cart',
    state: {
        CartDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getCartList(action, { call, put }) {
            const { code, data } = yield call(CartApi.getCartList, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        CartDataList: data,
                    },
                })
            }
        },
        *changeAmount({ payload, callback }, { call }) {
            const { code } = yield call(CartApi.changeCartAmount, payload)
            if (code === 'OK') {
                callback()
            }
        },
        *delete({ payload, callback }, { call, put }) {
            const { code } = yield call(CartApi.deleteCart, payload)
            if (code === 'OK') {
                yield put({
                    type: 'getCartList',
                })
                callback()
            }
        },
        *collect({ payload, callback }, { call, put }) {
            const { code } = yield call(CartApi.addToStar, payload)
            if (code === 'OK') {
                callback()
            }
        },
    },
}
