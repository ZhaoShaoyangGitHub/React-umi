import * as OverviewGoodsApi from './apis';

export default {
    namespace: 'OverviewGoods',
    state: {
        OverviewGoodsDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewGoodsDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OverviewGoodsApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};