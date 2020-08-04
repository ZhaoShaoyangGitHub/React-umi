/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-19 13:28:16
 * @LastEditTime: 2019-08-19 13:58:13
 */
/**
 * OrderSearch.state 参数类型
 *
 * @export
 * @interface OrderSearchState
 */
export interface OrderSearchState {
    searchText: string
    resultList: Array<any>
    searchOrderList: any[]
}

/**
 * OrderSearch.props 参数类型
 *
 * @export
 * @interface OrderSearchProps
 */
export interface OrderSearchProps {
    dispatch?: any
}
