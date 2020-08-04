import * as UserSettingApi from './apis'

export default {
    namespace: 'UserSetting',
    state: {
        UserSettingDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, UserSettingDataList: [].concat(payload) }
        },
    },
    effects: {
        *getUserInfo(action, { call, put }) {
            const { code, data } = yield call(UserSettingApi.getUserInfo, {})
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
