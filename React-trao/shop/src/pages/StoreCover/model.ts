import * as StoreCoverApi from './apis';

export default {
    namespace: 'StoreCover',
    state: {
        StoreCoverDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreCoverDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(StoreCoverApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};