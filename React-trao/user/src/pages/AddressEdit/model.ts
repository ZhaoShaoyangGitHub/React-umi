/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-22 16:18:08
 */
import * as AddressEditApi from './apis'

export default {
    namespace: 'AddressEdit',
    state: {
        AddressEditDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *add({ payload, callback }, { call }) {
            const { code } = yield call(AddressEditApi.addAddress, payload)
            if (code === 'OK') {
                callback()
            }
        },
        *update({ payload, callback }, { call }) {
            const { code } = yield call(AddressEditApi.updateAddress, payload)
            if (code === 'OK') {
                callback()
            }
        },
        *delete({ payload, callback }, { call }) {
            const { code } = yield call(AddressEditApi.deleteAddress, payload)
            if (code === 'OK') {
                callback()
            }
        },
    },
}
