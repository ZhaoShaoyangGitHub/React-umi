import * as EditProfileApi from './apis';

export default {
    namespace: 'EditProfile',
    state: {
        EditProfileDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, EditProfileDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(EditProfileApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};