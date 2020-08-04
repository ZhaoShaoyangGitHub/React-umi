import * as BusinessSituationApi from './apis';

export default {
    namespace: 'BusinessSituation',
    state: {
        BusinessSituationDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, BusinessSituationDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(BusinessSituationApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};