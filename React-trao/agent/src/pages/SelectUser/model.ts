import * as SelectUserApi from './apis'

export default {
    namespace: 'SelectUser',
    state: {
        SelectUserDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, SelectUserDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(SelectUserApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *searchVipUer(action, { call, put }) {
            const { code, data } = yield call(SelectUserApi.findVipUser, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
