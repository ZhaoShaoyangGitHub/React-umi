import * as ServiceRecordApi from './apis'

export default {
    namespace: 'ServiceRecord',
    state: {
        ServiceRecordDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ServiceRecordDataList: [].concat(payload) }
        },
    },
    effects: {
        *getServiceRecord({ payload, cb }, { call, put }) {
            const { code, data } = yield call(ServiceRecordApi.getServiceRecord, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
