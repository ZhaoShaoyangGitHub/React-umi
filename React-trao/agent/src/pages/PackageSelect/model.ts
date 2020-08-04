import * as PackageSelectApi from './apis';

export default {
    namespace: 'PackageSelect',
    state: {
        PackageSelectDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PackageSelectDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(PackageSelectApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};