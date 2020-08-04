import * as WriteOffApi from './apis'

export default {
    namespace: 'WriteOff',
    state: {
        WriteOffDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, WriteOffDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(WriteOffApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *endService(action, { call, put }) {
            const { code, data } = yield call(WriteOffApi.endService, action.params)
            if (code === 'OK') {
                action.callback(data)
            }
        },
    },
}
