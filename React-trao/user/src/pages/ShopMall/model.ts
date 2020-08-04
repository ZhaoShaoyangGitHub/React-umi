import * as CartApi from '../Cart/apis'
import { getPackageCategory } from './apis'

export default {
    namespace: 'ShopMall',
    state: {
        cartQuantity: 0,
        packageCategoryList: [],
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        setPackageCategoryList(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
    effects: {
        *getCartQuantity(action, { call, put }) {
            const { code, data } = yield call(CartApi.getCartQuantity, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        cartQuantity: data || 0,
                    },
                })
            }
        },

        *getPackageCategory(action, { call, put }) {
            const { code, data } = yield call(getPackageCategory, {})
            if (code === 'OK') {
                const list = [
                    {
                        name: '套餐',
                        id: '',
                    },
                ].concat(data || [])
                yield put({
                    type: 'setPackageCategoryList',
                    payload: {
                        packageCategoryList: list,
                    },
                })
            }
        },
    },
}
