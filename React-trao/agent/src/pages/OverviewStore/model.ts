import * as OverviewStoreApi from './apis'

export default {
    namespace: 'OverviewStore',
    state: {
        OverviewStoreDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewStoreDataList: [].concat(payload) }
        },
    },
    effects: {
        *getShopStatistics({ payload, cb }, { call, put }) {
            const { code, data } = yield call(OverviewStoreApi.getShopStatistics, payload)
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
