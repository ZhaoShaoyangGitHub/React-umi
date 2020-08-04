import * as OverviewMemberApi from './apis';

export default {
    namespace: 'OverviewMember',
    state: {
        OverviewMemberDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewMemberDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OverviewMemberApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};