import * as ArticleDetailsApi from './apis'

export default {
    namespace: 'ArticleDetails',
    state: {
        articleDetails: {},
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getArticleDetails(action, { call, put }) {
            const { code, data } = yield call(ArticleDetailsApi.getDetails, action.payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        articleDetails: data,
                    },
                })
                if (action.cb) action.cb()
            }
        },
        *addCollection({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ArticleDetailsApi.addCollection, payload)
            if (code === 'OK') {
                if (cb) cb()
            }
        },
        *cancelCollection({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ArticleDetailsApi.cancelCollection, payload)
            if (code === 'OK') {
                if (cb) cb()
            }
        },
        *addLike({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ArticleDetailsApi.addLike, payload)
            if (code === 'OK') {
                if (cb) cb()
            }
        },
        *cancelLike({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ArticleDetailsApi.cancelLike, payload)
            if (code === 'OK') {
                if (cb) cb()
            }
        },
    },
}
