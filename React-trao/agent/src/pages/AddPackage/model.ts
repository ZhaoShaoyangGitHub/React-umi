import * as AddPackageApi from './apis';

export default {
    namespace: 'AddPackage',
    state: {
        AddPackageDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AddPackageDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(AddPackageApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};