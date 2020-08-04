/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-07 10:31:58
 * @LastEditTime: 2019-08-21 14:40:55
 */
/**
 * GoodsDetail.state 参数类型
 *
 * @export
 * @interface GoodsDetailState
 */
export interface GoodsDetailState {
    currentIndex: number
    scrollTopId: any
    detailData: Objects
    selectScrollHidden: boolean
    goodsId: number
    currentShopInfo: any
    isShowConfirmModal: boolean
    confirmType: string
    isLogin: boolean
}

/**
 * GoodsDetail.props 参数类型
 *
 * @export
 * @interface GoodsDetailProps
 */
export interface GoodsDetailProps {
    dispatch?: any
}

export interface Objects {
    [key: string]: any
}
export interface Goods {
    id: number
    amount?: number
    shopId?: number
    type: 1 | 2 // 1:实体商品,2:套餐商品
}
