/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 15:08:17
 * @LastEditTime: 2019-08-22 15:33:53
 */
import * as AddressManageApi from './apis'

export default {
    namespace: 'AddressManage',
    state: {
        AddressManageDataList: [],
        addressList: [
            // {
            //     id: 0,
            //     province: '上海市',
            //     city: '上海市',
            //     district: '杨浦区',
            //     address: '国权北路1688号',
            //     phone: '14740554202',
            //     name: '0.618',
            //     isDefault: true,
            // },
            // {
            //     id: 1,
            //     province: '上海市',
            //     city: '上海市',
            //     district: '杨浦区',
            //     address: '国权北路1688号',
            //     phone: '14740554202',
            //     name: '0.618',
            //     isDefault: true,
            // },
        ],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *getList(action, { call, put }) {
            const { code, data } = yield call(AddressManageApi.getAddressList, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        addressList: data,
                    },
                })
            }
        },
    },
}
