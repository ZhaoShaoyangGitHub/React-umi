import * as HomeApi from './apis'

export default {
    namespace: 'Home',
    state: {
        HomeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, HomeDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(HomeApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getCurrentInfo(action, { call, put }) {
            const { code, data } = yield call(HomeApi.currentInfo, {})
            if (code === 'OK') {
                action.cb(data)
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
