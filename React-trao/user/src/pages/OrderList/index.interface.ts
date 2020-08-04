/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-24 13:31:48
 */
/**
 * OrderList.state 参数类型
 *
 * @export
 * @interface OrderListState
 */
export interface OrderListState {
    current: number
    pageIndex: number
    cancelVisible: boolean
    receiveVisible: boolean
    trade: any
    tabList: Array<any>
}

/**
 * OrderList.props 参数类型
 *
 * @export
 * @interface OrderListProps
 */
export interface OrderListProps {
    list: Array<any>
    dispatch?: any
}
