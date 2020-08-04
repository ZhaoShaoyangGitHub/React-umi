import * as PackageSelectApi from './apis'

export default {
    namespace: 'PackageSelect',
    state: {
        PackageSelectDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, PackageSelectDataList: [].concat(payload) }
        },
    },
    effects: {
        *getPackageDetail(action, { call, put }) {
            const { code, data } = yield call(PackageSelectApi.packageDetail, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getTechnician(action, { call, put }) {
            const { code, data } = yield call(PackageSelectApi.technician, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *userSaveapPointment(action, { call, put }) {
            const { code, data } = yield call(PackageSelectApi.saveappointment, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
        *getServiceTime(action, { call, put }) {
            const { code, data } = yield call(PackageSelectApi.serviceTime, action.params)
            if (code === 'OK') {
                action.cb(data)
            }
        },
    },
}
