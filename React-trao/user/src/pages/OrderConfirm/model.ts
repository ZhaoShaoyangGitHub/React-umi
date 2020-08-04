/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 09:49:55
 * @LastEditTime: 2019-08-24 13:38:20
 */
import * as OrderConfirmApi from './apis'
import * as AddressManageApi from '../AddressManage/apis'
import { CartClass } from '../Cart/index.interface'
import { BASEURL } from '../../config/index'

export default {
    namespace: 'OrderConfirm',
    state: {
        OrderConfirmDataList: [],
        currentAddress: {
            // id: 0,
            // province: '上海市',
            // city: '上海市',
            // district: '杨浦区',
            // address: '国权北路1688号',
            // phone: '14740554202',
            // name: '0.618',
            // isDefault: false,
        },
        goods: {},
        cartIds: [],
        goodsList: [],
        shopId: 0,
        shopName: '',
        totalPrice: 0,
        useablePoint: 0,
        pointRatio: 0.01,
        sourceArray: [
            '会员推荐',
            '朋友推荐',
            '广告',
            '大众点评',
            '路过',
            '小程序',
            '抖音',
            '朋友圈',
            '微博',
            '户外广告',
            '地铁',
            '电台电视',
        ],
        usePoint: false,
        payType: 'wechat',
        selectedSource: 0,
        needAddress: false,
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
            }
        },
        *getDefaultAddress({ payload }, { call, put }) {
            const { code, data } = yield call(AddressManageApi.getAddressList, payload)
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: {
                        currentAddress: data.length ? data[0] : {},
                    },
                })
            }
        },
        *getCartData({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.getCartData, payload)
            if (code === 'OK') {
                const children: Array<CartClass> = []
                let needAddress: boolean = false
                for (let j = 0; j < data.cartResponses.length; j++) {
                    const cart = data.cartResponses[j]
                    const childrenItem = {
                        cartId: cart.id,
                        goodsId: cart.goodsId,
                        goodsName: cart.goodsName,
                        price: cart.price,
                        amount: cart.amount,
                        imageUrl: BASEURL + cart.imageUrl,
                        goodsType: cart.goodsType,
                    }
                    children.push(childrenItem)
                    if (cart.goodsType && cart.goodsType.value === 1) {
                        needAddress = true
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        goodsList: children,
                        shopName: data.shopName,
                        totalPrice: data.tatolPrice,
                        useablePoint: data.point,
                        cartIds: payload.ids,
                        goods: {},
                        needAddress,
                        shopId: data.shopId,
                    },
                })
                callback()
            }
        },
        *getGoodsData({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.getGoodsData, payload)
            if (code === 'OK' && data) {
                const { cartResponse = {} } = data
                const children: Array<CartClass> = [
                    {
                        cartId: 0,
                        goodsId: cartResponse.goodsId,
                        goodsName: cartResponse.goodsName,
                        price: data.tatolPrice,
                        amount: 1,
                        imageUrl: BASEURL + cartResponse.imageUrl,
                        goodsType: cartResponse.goodsType,
                    },
                ]
                const needAddress: boolean = cartResponse.goodsType && cartResponse.goodsType.value === 1
                yield put({
                    type: 'save',
                    payload: {
                        goodsList: children,
                        shopName: data.shopName,
                        totalPrice: data.tatolPrice,
                        useablePoint: data.point,
                        goods: {
                            goodsId: cartResponse.goodsId,
                            goodsType: cartResponse.goodsType.value,
                        },
                        shopId: data.shopId,
                        cartIds: [],
                        needAddress,
                    },
                })
                callback()
            }
        },
        *goodsConfirmAndPay({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.confirmAndPay, payload)
            if (code === 'OK' && data) {
                callback(data)
            }
        },
        *getPayParam({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.getPayParam, payload)
            if (code === 'OK' && data) {
                callback(data)
            }
        },
        *confirm({ payload, payCallback, confirmCallback }, { call, put }) {
            const confirmPayload = {
                addressId: payload.addressId,
                cartIds: payload.cartIds,
                goodsForm: payload.goodsForm,
                source: payload.source,
                tradeFrom: payload.tradeFrom,
                refererPhone: payload.refererPhone,
            }
            const { code, data } = yield call(OrderConfirmApi.confirm, confirmPayload)
            if (code === 'OK') {
                if (payload.payType !== 1) {
                    // 线下支付
                    confirmCallback()
                } else {
                    payCallback(data)
                    // yield put({
                    //     type: 'pay',
                    //     payload: {
                    //         id: data.id,
                    //         amount: payload.amount,
                    //         payType: payload.payType,
                    //     },
                    //     callback: payCallback,
                    // })
                }
            }
        },
        *pay({ payload, callback }, { call, put }) {
            const { code, data } = yield call(OrderConfirmApi.pay, payload)
            if (code === 'OK') {
                callback(payload.id, data)
            }
        },
    },
}
