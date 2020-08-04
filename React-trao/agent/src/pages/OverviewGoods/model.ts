import * as OverviewGoodsApi from './apis'

export default {
    namespace: 'OverviewGoods',
    state: {
        OverviewGoodsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewGoodsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getGoodsStatistics({ payload, cb }, { call, put }) {
            const { code, data } = yield call(OverviewGoodsApi.getGoodsStatistics, payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
                cb && cb(data)
            }
        },
    },
}
