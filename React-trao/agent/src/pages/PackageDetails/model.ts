import * as PackageDetailsApi from './apis';

export default {
    namespace: 'PackageDetails',
    state: {
        PackageDetailsDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PackageDetailsDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(PackageDetailsApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};