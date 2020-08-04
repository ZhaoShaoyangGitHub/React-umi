import * as HomeApi from './apis'

export default {
    namespace: 'Home',
    state: {
        HomeData: {},
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, HomeData: { ...payload } }
        },
    },
    effects: {
        *getHomeData(action, { call, put }) {
            const { code, data } = yield call(HomeApi.getHomeData)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
                action.cb && action.cb()
            }
        },
        *areaData({ payload, cb }, { call }) {
            const { code, data } = yield call(HomeApi.getAreaData, payload)
            if (code === 'OK') {
                cb(data)
            }
        },
    },
}
