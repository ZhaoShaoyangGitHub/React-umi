import * as MyCollectionApi from './apis'

export default {
    namespace: 'MyCollection',
    state: {
        MyCollectionDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MyCollectionDataList: [].concat(payload) }
        },
    },
    effects: {
        *getCollectionList({ payload, cb }, { call, put }) {
            const { code, data } = yield call(MyCollectionApi.getCollectionList, payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
    },
}
