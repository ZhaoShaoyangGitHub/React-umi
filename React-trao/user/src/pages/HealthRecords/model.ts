/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-19 10:33:52
 * @LastEditTime: 2019-08-21 19:22:29
 */
import * as HealthRecordsApi from './api'

export default {
    namespace: 'HealthRecords',
    state: {
        articleCategoryList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getHealthRecords(action, { call, put }) {
            const { code, data } = yield call(HealthRecordsApi.getHealthRecords)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *getUpdateRecord(action, { call, put }) {
            const { code, data } = yield call(HealthRecordsApi.getUpdateRecord)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *setWeightRecord({ payload, cb }, { call, put }) {
            const { code, data } = yield call(HealthRecordsApi.setWeightRecord, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *setMenstruationRecord({ payload, cb }, { call, put }) {
            const { code, data } = yield call(HealthRecordsApi.setMenstruationRecord, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
        *setSymptom({ payload, cb }, { call, put }) {
            const { code, data } = yield call(HealthRecordsApi.setSymptom, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
        },
    },
}
