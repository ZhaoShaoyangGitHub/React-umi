/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-26 16:24:52
 */
import * as UpdateRecordsApi from './apis'

export default {
    namespace: 'UpdateRecords',
    state: {
        UpdateRecordsDataList: [
            {
                id: 0,
                time: '2019-04-20 14:20',
                name: '刘燕',
                content: '取消眼涩症状、新增毛孔粗大症状',
            },
            {
                id: 1,
                time: '2019-04-20 14:20',
                name: '刘燕',
                content: '取消眼涩症状、新增毛孔粗大症状',
            },
            {
                id: 2,
                time: '2019-04-20 14:20',
                name: '刘燕',
                content: '取消眼涩症状、新增毛孔粗大症状',
            },
        ],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, UpdateRecordsDataList: [].concat(payload) }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(UpdateRecordsApi.demo, {})
            if (code === 'OK') {
                console.log('OK')
            }
        },
    },
}
