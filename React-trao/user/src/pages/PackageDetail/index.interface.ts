/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-07 10:31:58
 * @LastEditTime: 2019-08-23 10:36:58
 */
/**
 * GoodsDetail.state 参数类型
 *
 * @export
 * @interface PackageDetailState
 */
export interface PackageDetailState {
    currentIndex: number
    PackDetailData: Objects
    scrollTopId: string
    selectScrollHidden: boolean
    packageId: number
    currentShopInfo: any
    isShowConfirmModal: boolean
    confirmType: string
    isLogin: boolean
}

/**
 * GoodsDetail.props 参数类型
 *
 * @export
 * @interface PackageDetailProps
 */
export interface PackageDetailProps {
    dispatch?: any
}

export interface Objects {
    [propsName: string]: any
}

export interface Goods {
    id: number
    amount?: number
    shopId?: number
    type: 1 | 2 // 1:实体商品,2:套餐商品
}
