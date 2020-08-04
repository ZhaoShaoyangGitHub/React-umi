import * as HealthRecordsSettingApi from './apis';

export default {
    namespace: 'HealthRecordsSetting',
    state: {
        HealthRecordsSettingDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, HealthRecordsSettingDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(HealthRecordsSettingApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};