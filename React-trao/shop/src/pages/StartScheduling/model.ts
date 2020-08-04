import * as StartSchedulingApi from './apis'

export default {
    namespace: 'StartScheduling',
    state: {
        StartSchedulingDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StartSchedulingDataList: [].concat(payload) }
        },
    },
    effects: {
        *getTechnician(action, { call, put }) {
            const { code, data } = yield call(StartSchedulingApi.technician, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },

        *startScheduling(action, { call, put }) {
            const { code, data } = yield call(StartSchedulingApi.startScheduling, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
