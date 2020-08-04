/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-19 14:01:03
 * @LastEditTime: 2019-08-21 10:07:09
 */
/**
 * GoodList.state 参数类型
 *
 * @export
 * @interface GoodListState
 */
export interface GoodListState {
    current: number
    tabList: Array<any>
    list: Array<any>
    isShow: boolean
    CategoryList: any[]
    pageList: any[]
    CartList: any[]
    totalCartNum: number
    shopId: number
    currentGoodsInfo: any
    cartNum: number
    storeInfo: any
    isActivated: boolean
    NavOffsetTop: number
}

/**
 * GoodList.props 参数类型
 *
 * @export
 * @interface GoodListProps
 */
export interface GoodListProps {
    dispatch?: any
}
