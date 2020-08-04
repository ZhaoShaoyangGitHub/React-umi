import * as EndServeiesApi from './apis';

export default {
    namespace: 'EndServeies',
    state: {
        EndServeiesDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, EndServeiesDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(EndServeiesApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};