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
        // list: [
        //     {
        //         storeId: 1,
        //         shopName: '寇氏减肥店(长江南路店)',
        //         status: { value: 1 },
        //         children: [
        //             {
        //                 cartId: 1,
        //                 goodsId: 2,
        //                 goodsName: '精油spa按压',
        //                 price: 139.0,
        //                 quantity: 1,
        //                 skuImage: 'http://img0.imgtn.bdimg.com/it/u=3536087198,2495969828&fm=26&gp=0.jpg',
        //                 inventory: 10,
        //                 isValid: true,
        //             },
        //             {
        //                 cartId: 9,
        //                 goodsId: 1,
        //                 goodsName: '精油spa足疗',
        //                 price: 239.0,
        //                 quantity: 2,
        //                 skuImage: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
        //                 inventory: 10,
        //                 isValid: true,
        //             },
        //         ],
        //     },
        //     {
        //         storeId: 2,
        //         shopName: '寇氏减肥店(殷高路店)',
        //         status: '已付款',
        //         children: [
        //             {
        //                 cartId: 3,
        //                 goodsId: 4,
        //                 goodsName: '减肥套餐',
        //                 price: 8869,
        //                 quantity: 2,
        //                 skuImage:
        //                     'http://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/83678ef4-Lets-Relax-Spa-Packages-Bangkok/%E6%9B%BC%E8%B0%B7LetsRelaxSpa%E6%8C%89%E6%91%A9%E7%BB%84%E5%90%88',
        //                 inventory: 10,
        //                 isValid: true,
        //             },
        //         ],
        //     },
        //     {
        //         storeId: 4,
        //         shopName: '寇氏减肥店(殷高路店)',
        //         status: '待发货，已付款',
        //         children: [
        //             {
        //                 cartId: 5,
        //                 goodsId: 5,
        //                 goodsName: '减肥套餐',
        //                 price: 8869,
        //                 quantity: 2,
        //                 skuImage:
        //                     'http://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/83678ef4-Lets-Relax-Spa-Packages-Bangkok/%E6%9B%BC%E8%B0%B7LetsRelaxSpa%E6%8C%89%E6%91%A9%E7%BB%84%E5%90%88',
        //                 inventory: 10,
        //                 isValid: true,
        //             },
        //         ],
        //     },
        //     {
        //         storeId: 4,
        //         shopName: '寇氏减肥店(长江南路店)',
        //         status: '待收货',
        //         children: [
        //             {
        //                 cartId: 4,
        //                 goodsId: 5,
        //                 goodsName: '减肥套餐',
        //                 price: 8869,
        //                 quantity: 2,
        //                 skuImage:
        //                     'http://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/83678ef4-Lets-Relax-Spa-Packages-Bangkok/%E6%9B%BC%E8%B0%B7LetsRelaxSpa%E6%8C%89%E6%91%A9%E7%BB%84%E5%90%88',
        //                 inventory: 10,
        //                 isValid: true,
        //             },
        //         ],
        //     },
        // ],
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
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(OrderListApi.demo, {})
            if (code === 'OK') {
                yield put({
                    type: 'save',
                    payload: data,
                })
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
                        children: [],
                        awaitPayAmount: el.awaitPayAmount,
                        totalAmount: el.totalAmount,
                    }
                    let totalNum = 0
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
                        totalNum += order.goodsAmount
                    }
                    obj.totalNum = totalNum
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
