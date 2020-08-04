import * as OverviewEmployeeApi from './apis'

export default {
    namespace: 'OverviewEmployee',
    state: {
        OverviewEmployeeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewEmployeeDataList: [].concat(payload) }
        },
    },
    effects: {
        *getStaffStatistics({ payload, cb }, { call, put }) {
            const { code, data } = yield call(OverviewEmployeeApi.getStaffStatistics, payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
                cb && cb(data)
            }
        },
    },
}
