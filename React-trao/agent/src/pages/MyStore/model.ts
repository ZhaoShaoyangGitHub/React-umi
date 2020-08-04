import * as MyStoreApi from './apis'

export default {
    namespace: 'MyStore',
    state: {
        MyStoreDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyStoreDataList: [].concat(payload) }
        },
    },
    effects: {
        *getpageList(action, { call, put }) {
            const { code, data } = yield call(MyStoreApi.pageList, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
