import * as MyPointsScores from './apis'

export default {
    namespace: 'MyPointsScores',
    state: {
        MyPointsScoresDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyPointsScoresDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsGetIntegral(action, { call, put }) {
            const { code, data } = yield call(MyPointsScores.getIntegral, {})
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
