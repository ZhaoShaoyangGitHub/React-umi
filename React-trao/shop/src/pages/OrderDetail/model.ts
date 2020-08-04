/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 13:52:49
 * @LastEditTime: 2019-08-24 13:48:15
 */
import * as OrderDetailApi from './apis'
import { BASEURL } from '../../config/index'

export default {
    namespace: 'OrderDetail',
    state: {
        OrderDetailDataList: [],
        data: {
            children: [],
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OrderDetailApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *get({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderDetailApi.getTradeDetail, payload)
            const obj: any = {
                tradeId: data.id,
                tradeSn: data.tradeSn,
                shopId: data.shopId,
                shopName: data.shopName,
                status: data.payStatus.value === 3 ? data.status : data.status.payStatus, // 如果未支付 就使用支付状态 已支付 使用订单状态
                children: [],
                totalAmount: data.totalAmount, // 总金额
                discountAmount: data.discountAmount, // 打折
                payAmount: data.payAmount, // 实际支付
                createTime: data.createTime,
                payType: data.payType,
                userName: data.userName,
                userPhone: data.userPhone,
                payTime: data.payTime,
            }
            for (let j = 0; j < data.orderResponses.length; j++) {
                const order = data.orderResponses[j]
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
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        data: obj,
                    },
                })
                callback(obj)
            }
        },
    },
}
