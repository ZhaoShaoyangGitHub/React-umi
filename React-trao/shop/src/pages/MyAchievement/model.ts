import * as MyAchievementApi from './apis'

export default {
    namespace: 'MyAchievement',
    state: {
        MyAchievementDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyAchievementDataList: [].concat(payload) }
        },
    },
    effects: {
        *getOrderList(action, { call, put }) {
            const { code, data, message } = yield call(MyAchievementApi.getOrderPageList, action.params)
            action.cb(code, data, message)
        },
        *achievementData(action, { call, put }) {
            const { code, data, message } = yield call(MyAchievementApi.getAchievementData, action.params)
            action.cb(data)
        },
    },
}
