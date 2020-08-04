import * as LoginAgreementApi from './apis';

export default {
    namespace: 'LoginAgreement',
    state: {
        LoginAgreementDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, LoginAgreementDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(LoginAgreementApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};