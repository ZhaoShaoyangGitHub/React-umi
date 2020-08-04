import * as MemberDetailsApi from './apis'

export default {
    namespace: 'MemberDetails',
    state: {
        MemberDetailsDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MemberDetailsDataList: [].concat(payload) }
        },
    },
    effects: {
        *getVipUserDetails({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MemberDetailsApi.getVipUserDetails, payload)
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
