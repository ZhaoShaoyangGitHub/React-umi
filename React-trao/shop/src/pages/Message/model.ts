import * as MessageApi from './apis'

export default {
    namespace: 'Message',
    state: {
        MessageDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, MessageDataList: [].concat(payload) }
        },
    },
    effects: {
        *getMessageNumber(action, { call, put }) {
            const { code, data } = yield call(MessageApi.getMessageNumber)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *getMessageData(action, { call, put }) {
            const { code, data } = yield call(MessageApi.getMessageData, action.payload)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
