import * as PersonalDataApi from './apis'

export default {
    namespace: 'PersonalData',
    state: {
        PersonalDataDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PersonalDataDataList: [].concat(payload) }
        },
    },
    effects: {
        *getUserInfo(action, { call, put }) {
            const { code, data } = yield call(PersonalDataApi.getUserInfo)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *updateUser({ payload, cb }, { call, put }) {
            const { code, data } = yield call(PersonalDataApi.updateUser, payload)
            if (code === 'OK') {
                cb && cb()
            }
        },
    },
}
