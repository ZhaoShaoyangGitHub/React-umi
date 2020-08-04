import * as PayResultApi from './apis';

export default {
    namespace: 'PayResult',
    state: {
        PayResultDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PayResultDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(PayResultApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};