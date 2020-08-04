import * as MySubscribeApi from './apis'

export default {
    namespace: 'MySubscribe',
    state: {
        MySubscribeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MySubscribeDataList: [].concat(payload) }
        },
    },
    effects: {
        *getPageList(action, { call, put }) {
            const { code, data } = yield call(MySubscribeApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
