import * as AttendanceTimeApi from './apis'
import Taro from '@tarojs/taro'

export default {
    namespace: 'AttendanceTime',
    state: {
        AttendanceTimeDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, AttendanceTimeDataList: [].concat(payload) }
        },
    },
    effects: {
        *startWork(action, { call, put }) {
            const { code, data, message } = yield call(AttendanceTimeApi.startWork, action.payload)
            if (code === 'OK') {
                action.cb && action.cb()
            }
            if (code === 'ServiceError') {
                Taro.showToast({
                    icon: 'none',
                    title: message,
                    duration: 1000,
                })
            }
        },
        *offDuty(action, { call, put }) {
            const { code, data, message } = yield call(AttendanceTimeApi.offDuty, action.payload)
            if (code === 'OK') {
                action.cb && action.cb()
            }
            if (code === 'ServiceError') {
                Taro.showToast({
                    icon: 'none',
                    title: message,
                    duration: 1000,
                })
            }
        },
        *attendanceStatus({ cb }, { call, put }) {
            const { code, data, message } = yield call(AttendanceTimeApi.attendanceStatus)
            if (code === 'OK') {
                cb && cb(data)
            }
            if (code === 'ServiceError') {
                Taro.showToast({
                    icon: 'none',
                    title: message,
                    duration: 1000,
                })
            }
        },
        *getAddressDistance({ payload, cb }, { call, put }) {
            const { code, data, message } = yield call(AttendanceTimeApi.getAddressDistance, payload)
            if (code === 'OK') {
                cb && cb(data)
            }
            if (code === 'ServiceError') {
                Taro.showToast({
                    icon: 'none',
                    title: message,
                    duration: 1000,
                })
            }
        },
    },
}
