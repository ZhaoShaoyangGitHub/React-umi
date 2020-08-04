import * as StoreManagementApi from './apis';

export default {
    namespace: 'StoreManagement',
    state: {
        StoreManagementDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StoreManagementDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(StoreManagementApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};