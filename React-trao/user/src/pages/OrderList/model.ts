/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-24 09:56:51
 */
import * as OrderListApi from './apis'
import { BASEURL } from '../../config/index'

export default {
    namespace: 'OrderList',
    state: {
        OrderListDataList: [],
        list: [],
        totalPage: 0,
        hasMore: true,
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        append(state, { payload }) {
            return {
                ...state,
                list: {
                    ...state.list,
                    ...payload,
                },
            }
        },
    },
    effects: {
        *deleteTrade(action, { call, put }) {
            const { code, data } = yield call(OrderListApi.deleteTrade, action.payload)
            if (code === 'OK') {
                action.cb && action.cb()
            }
        },
        *getList({ payload }, { call, put }) {
            console.log(2)
            const { code, data } = yield call(OrderListApi.getOrderList, payload)
            if (code === 'OK') {
                const list: Array<any> = []
                for (let i = 0; i < data.list.length; i++) {
                    const el = data.list[i]
                    const obj: any = {
                        tradeId: el.id,
                        tradeSn: el.tradeSn,
                        shopId: el.shopId,
                        shopName: el.shopName,
                        status: el.status,
                        evaluationStatus: el.evaluationStatus.value,
                        children: [],
                        awaitPayAmount: el.awaitPayAmount,
                        totalAmount: el.totalAmount,
                    }
                    for (let j = 0; j < el.orderResponses.length; j++) {
                        const order = el.orderResponses[j]
                        const childrenItem = {
                            orderId: order.id,
                            goodsId: order.goodsId,
                            goodsName: order.goodsTitle,
                            price: order.goodsPrice,
                            amount: order.goodsAmount,
                            imageUrl: BASEURL + order.goodsThumb,
                            goodsType: order.goodsType,
                        }
                        obj.children.push(childrenItem)
                    }
                    list.push(obj)
                }
                if (payload.pageIndex > 1) {
                    yield put({
                        type: 'append',
                        payload: {
                            list,
                        },
                    })
                } else {
                    yield put({
                        type: 'save',
                        payload: {
                            list,
                            totalPage: data.totalPage,
                        },
                    })
                }
            }
        },
    },
}
