import * as SuitStoreApi from './apis';

export default {
    namespace: 'SuitStore',
    state: {
        SuitStoreDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, SuitStoreDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(SuitStoreApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};