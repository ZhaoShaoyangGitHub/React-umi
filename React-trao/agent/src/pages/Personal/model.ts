import * as PersonalApi from './apis'

export default {
    namespace: 'Personal',
    state: {
        PersonalDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PersonalDataList: [].concat(payload) }
        },
    },
    effects: {
        *getUserInfo(action, { call, put }) {
            const { code, data } = yield call(PersonalApi.getUserInfo)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
