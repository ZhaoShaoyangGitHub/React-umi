/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-24 13:31:48
 */
/**
 * SaleOrderList.state 参数类型
 *
 * @export
 * @interface SaleOrderListState
 */
export interface SaleOrderListState {
    current: number
    pageIndex: number
    cancelVisible: boolean
    receiveVisible: boolean
    trade: any
    tabList: Array<any>
    shopId: number
}

/**
 * SaleOrderList.props 参数类型
 *
 * @export
 * @interface SaleOrderListProps
 */
export interface SaleOrderListProps {
    list: Array<any>
    totalPage: number
    dispatch?: any
}
