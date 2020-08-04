/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-22 17:36:49
 * @LastEditTime: 2019-08-26 15:33:54
 */
import * as PackageDetailApi from './apis'

export default {
    namespace: 'PackageDetail',
    state: {
        PackageDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PackageDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(PackageDetailApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getPackDetail(action, { call, put }) {
            const { code, data } = yield call(PackageDetailApi.getPackageDetail, action.params)
            if (code === 'OK') {
                console.log(code, data)
                action.cb(data)
            }
        },
        *addGoodToCart(action, { call, put }) {
            const { code, data, message } = yield call(PackageDetailApi.addGoodsToCart, action.params)
            console.log(code)
            if (code === 'OK') {
                console.log(code, data)
                action.cb(message, data.id)
            }
        },
        *collectPackage(action, { call, put }) {
            const { code, data, message } = yield call(PackageDetailApi.collect, action.params)
            console.log(code)
            if (code === 'OK') {
                action.cb()
            }
        },
        *cancelCollectPackage(action, { call, put }) {
            const { code, data, message } = yield call(PackageDetailApi.cancelCollect, action.params)
            console.log(code)
            if (code === 'OK') {
                action.cb()
            }
        },
    },
}
