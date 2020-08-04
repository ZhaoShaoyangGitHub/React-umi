import * as TechnicianListApi from './apis'

export default {
    namespace: 'TechnicianList',
    state: {
        TechnicianListDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, TechnicianListDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(TechnicianListApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *changeTechnicianState(action, { call, put }) {
            const { code, data } = yield call(TechnicianListApi.changeTechnicianState, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
