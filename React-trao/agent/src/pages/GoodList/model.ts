import * as GoodListApi from './apis'
import * as CartApi from '../Cart/apis'

export default {
    namespace: 'GoodList',
    state: {
        GoodListDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, GoodListDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(GoodListApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *requestPageList(action, { call, put }) {
            const { code, data } = yield call(GoodListApi.getPageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *requestCategory(action, { call, put }) {
            const { code, data } = yield call(GoodListApi.getCategory, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *postOrderTradeAffirm(action, { call, put }) {
            const { code, data } = yield call(GoodListApi.postOrderTrade, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *addGoodToCart(action, { call, put }) {
            const { code, data, message } = yield call(GoodListApi.addShoppingCart, action.params)
            console.log(code)
            if (code === 'OK') {
                action.cb()
            }
        },
        *getCartList(action, { call, put }) {
            const { code, data } = yield call(CartApi.getCartList, {})
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getCartQuantity(action, { call, put }) {
            const { code, data } = yield call(CartApi.getCartQuantity, {})
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
