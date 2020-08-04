import * as PackageSchedulApi from './apis'

export default {
    namespace: 'PackageSchedul',
    state: {
        PackageSchedulDataList: [],
    },

    reducers: {},
    effects: {
        *getAppointment(action, { call, put }) {
            const { code, data } = yield call(PackageSchedulApi.appointment, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getCurrentUserInfo(action, { call, put }) {
            const { code, data } = yield call(PackageSchedulApi.getVipInfo, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
        *getPackageList(action, { call, put }) {
            const { code, data } = yield call(PackageSchedulApi.packageList, action.params)
            if (code === 'OK') {
                action.cb && action.cb(data)
            }
        },
    },
}
