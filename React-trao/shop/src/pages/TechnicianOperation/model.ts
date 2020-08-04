import * as TechnicianOperationApi from './apis'

export default {
    namespace: 'TechnicianOperation',
    state: {
        TechnicianOperationDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, TechnicianOperationDataList: [].concat(payload) }
        },
    },
    effects: {
        *addTechnician(action, { call, put }) {
            const { code, data } = yield call(TechnicianOperationApi.addTechnician, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
