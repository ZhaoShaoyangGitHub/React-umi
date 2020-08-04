/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-22 16:18:08
 */
import * as AddCommentApi from './apis'

export default {
    namespace: 'AddComment',
    state: {
        AddCommentDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *add({ payload, callback }, { call }) {
            const { code } = yield call(AddCommentApi.addComment, payload)
            if (code === 'OK') {
                callback()
            }
        },
        *update({ payload, callback }, { call }) {
            const { code } = yield call(AddCommentApi.updateComment, payload)
            if (code === 'OK') {
                callback()
            }
        },
        *getCommentInfo({ payload, callback }, { call }) {
            const { code, data } = yield call(AddCommentApi.getCommentInfo, payload)
            if (code === 'OK') {
                callback(data)
            }
        },
        *getTechnicianInfo({ payload, callback }, { call }) {
            const { code, data } = yield call(AddCommentApi.getTechnicianInfo, payload)
            if (code === 'OK') {
                callback(data)
            }
        },
    },
}
