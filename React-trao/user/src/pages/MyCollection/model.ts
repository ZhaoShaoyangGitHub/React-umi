import * as MyCollectionApi from './apis'

export default {
    namespace: 'MyCollection',
    state: {
        myCollectionDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, myCollectionDataList: payload }
        },
    },
    effects: {
        *getEnshrine(action, { call, put }) {
            console.log(action)
            const { code, data } = yield call(MyCollectionApi.getEnshrine, action.payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data ? data : [],
                })
            }
        },
    },
}
