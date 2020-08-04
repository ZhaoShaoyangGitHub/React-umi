import * as OverviewEmployeeApi from './apis';

export default {
    namespace: 'OverviewEmployee',
    state: {
        OverviewEmployeeDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewEmployeeDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OverviewEmployeeApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};