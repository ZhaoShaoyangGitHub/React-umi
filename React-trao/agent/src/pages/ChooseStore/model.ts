import * as ChooseStoreApi from './apis'

export default {
    namespace: 'ChooseStore',
    state: {
        ChooseStoreDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ChooseStoreDataList: [].concat(payload) }
        },
    },
    effects: {
        *getStoreList(action, { call, put }) {
            const { code, data } = yield call(ChooseStoreApi.getStoreList, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
