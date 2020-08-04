import * as TechnicianDetailApi from './apis'

export default {
    namespace: 'TechnicianDetail',
    state: {
        TechnicianDetailDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, TechnicianDetailDataList: [].concat(payload) }
        },
    },
    effects: {
        *getTechnicianDetail(action, { call, put }) {
            const { code, data } = yield call(TechnicianDetailApi.getTechnicianDetail, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
