/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-23 10:06:18
 */
export default {
    namespace: 'EditInfo',
    state: {
        EditInfoDataList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, EditInfoDataList: [].concat(payload) }
        },
    },
    effects: {},
}
