import * as ModifyPasswordApi from './apis'

export default {
    namespace: 'ModifyPassword',
    state: {
        ModifyPasswordDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ModifyPasswordDataList: [].concat(payload) }
        },
    },
    effects: {
        *updatePassword({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ModifyPasswordApi.updatePassword, payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
                cb && cb()
            }
        },
    },
}
