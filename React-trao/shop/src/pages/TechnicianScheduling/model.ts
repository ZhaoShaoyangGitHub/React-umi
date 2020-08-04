import * as TechnicianSchedulingApi from './apis'

export default {
    namespace: 'TechnicianScheduling',
    state: {
        TechnicianSchedulingDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, TechnicianSchedulingDataList: [].concat(payload) }
        },
    },
    effects: {
        *getScheduling(action, { call, put }) {
            const { code, data } = yield call(TechnicianSchedulingApi.scheduling, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
