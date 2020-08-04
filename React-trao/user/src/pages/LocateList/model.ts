import * as LocateListApi from './apis';

export default {
    namespace: 'LocateList',
    state: {
        LocateListDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, LocateListDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(LocateListApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};