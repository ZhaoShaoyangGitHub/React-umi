import * as UserSettingApi from './apis';

export default {
    namespace: 'UserSetting',
    state: {
        UserSettingDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, UserSettingDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(UserSettingApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};