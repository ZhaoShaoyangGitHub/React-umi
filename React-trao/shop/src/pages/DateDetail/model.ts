import * as DateDetailApi from './apis'

export default {
    namespace: 'DateDetail',
    state: {
        DateDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, DateDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(DateDetailApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getSchedulingDetail(action, { call, put }) {
            const { code, data } = yield call(DateDetailApi.getSchedulingDetail, action.params)
            if (code === 'OK') {
                action.callback(data)
            }
        },
        *startService(action, { call, put }) {
            const { code, data } = yield call(DateDetailApi.startService, action.params)
            if (code === 'OK') {
                action.callback(data)
            }
        },
    },
}
