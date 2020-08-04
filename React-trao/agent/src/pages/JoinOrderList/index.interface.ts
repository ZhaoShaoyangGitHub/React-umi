/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 10:58:13
 * @LastEditTime: 2019-08-24 13:31:48
 */
/**
 * JoinOrderList.state 参数类型
 *
 * @export
 * @interface JoinOrderListState
 */
export interface JoinOrderListState {
    // current: number
    // pageIndex: number
    // cancelVisible: boolean
    // receiveVisible: boolean
    // trade: any
    // tabList: Array<any>
    [stateName: string]: any
}

/**
 * JoinOrderList.props 参数类型
 *
 * @export
 * @interface JoinOrderListProps
 */
export interface JoinOrderListProps {
    list: Array<any>
    totalPage: number
    dispatch?: any
}
