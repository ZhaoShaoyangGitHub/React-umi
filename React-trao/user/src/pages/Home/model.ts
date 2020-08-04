/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-19 10:33:52
 * @LastEditTime: 2019-08-21 19:22:29
 */
import * as HomeApi from './apis'

export default {
    namespace: 'Home',
    state: {
        articleCategoryList: [
            { title: '全部' },
            { title: '女性' },
            { title: '男性' },
            { title: '少儿' },
            { title: '健身' },
            { title: '生活' },
            { title: '旅行' },
        ],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getAppointment(action, { call, put }) {
            const { code, data } = yield call(HomeApi.getAppointment, {})
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *getArticleCategory(action, { call, put }) {
            const { code, data } = yield call(HomeApi.articleCategoryList, {})
            if (code === 'OK') {
                const list: Array<any> = [
                    {
                        title: '全部',
                    },
                ]
                if (data && data.length > 0) {
                    data.map((item) => {
                        list.push({
                            title: item.name,
                        })
                    })
                }
                yield put({
                    type: 'save',
                    payload: {
                        articleCategoryList: list,
                    },
                })
                if (action.cb) action.cb()
            }
        },
        *getArticleList(action, { call, put }) {
            const { code, data } = yield call(HomeApi.articleList, action.payload)
            if (code === 'OK') {
                if (action.cb) action.cb(data)
            }
        },
        *getIsConfirmOrder(action, { call, put }) {
            const { code, data } = yield call(HomeApi.getIsConfirmOrder, action.payload)
            if (code === 'OK') {
                if (action.cb) action.cb(data)
            }
        },
        *areaData({ payload, cb }, { call }) {
            const { code, data } = yield call(HomeApi.getAreaData, payload)
            if (code === 'OK') {
                cb(data)
            }
        },
        *confirmService({ payload, cb }, { call }) {
            const { code, data } = yield call(HomeApi.confirmService, payload)
            if (code === 'OK') {
                cb()
            }
        },
    },
}
