import * as OverviewMemberApi from './apis'

export default {
    namespace: 'OverviewMember',
    state: {
        OverviewMemberDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, OverviewMemberDataList: [].concat(payload) }
        },
    },
    effects: {
        *getUserStatistics({ payload, cb }, { call, put }) {
            const { code, data } = yield call(OverviewMemberApi.getUserStatistics, payload)
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
