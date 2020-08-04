import * as GoodListApi from './apis'

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
            const { code, data } = yield call(GoodListApi.getPackagePageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *requestGoodsPageList(action, { call, put }) {
            const { code, data } = yield call(GoodListApi.getGoddsPageList, action.params)
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
    },
}
