import * as AboutUsApi from './apis';

export default {
    namespace: 'AboutUs',
    state: {
        AboutUsDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AboutUsDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(AboutUsApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};