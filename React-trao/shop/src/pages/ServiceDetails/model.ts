import * as ServiceDetailsApi from './apis';

export default {
    namespace: 'ServiceDetails',
    state: {
        ServiceDetailsDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ServiceDetailsDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(ServiceDetailsApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};