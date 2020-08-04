/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-13 14:32:40
 * @LastEditTime: 2019-08-13 16:25:29
 */
/**
 * LocateList.state 参数类型
 *
 * @export
 * @interface LocateListState
 */
export interface LocateListState {
    list: Array<any>
    currentCity: string
    hotCities: Array<string>
    resultList: Array<string>
    searchText: string
}

/**
 * LocateList.props 参数类型
 *
 * @export
 * @interface LocateListProps
 */
export interface LocateListProps {
    dispatch?: any
}
