import * as SelectUser from '../SelectUser/apis'

export default {
    namespace: 'SchedulSelectUser',
    state: {
        SchedulSelectUserDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, SchedulSelectUserDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(SelectUser.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *searchVipUer(action, { call, put }) {
            const { code, data } = yield call(SelectUser.findVipUser, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
