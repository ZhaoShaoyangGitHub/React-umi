import * as EditSchedulingApi from './apis'

export default {
    namespace: 'EditScheduling',
    state: {
        EditSchedulingDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, EditSchedulingDataList: [].concat(payload) }
        },
    },
    effects: {
        *getScheduling(action, { call, put }) {
            const { code, data } = yield call(EditSchedulingApi.schedulingDetail, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
