import * as LearningCenterApi from './apis'

export default {
    namespace: 'LearningCenter',
    state: {
        articleCategoryList: [
            { title: '全部' },
            { title: '女性健康' },
            { title: '按摩' },
            { title: '男性健康' },
            { title: '少儿健康' },
        ],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getArticleCategory(action, { call, put }) {
            const { code, data } = yield call(LearningCenterApi.articleCategoryList, {})
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
            const { code, data } = yield call(LearningCenterApi.articleList, action.payload)
            if (code === 'OK') {
                if (action.cb) action.cb(data)
            }
        },
    },
}
