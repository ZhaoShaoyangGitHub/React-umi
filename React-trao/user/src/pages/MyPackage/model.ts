import * as MyPackageApi from './apis';

export default {
    namespace: 'MyPackage',
    state: {
        MyPackageDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyPackageDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(MyPackageApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};