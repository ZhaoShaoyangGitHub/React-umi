/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-07 10:07:34
 * @LastEditTime: 2019-08-22 17:31:59
 */
/**
 * ShopSearch.state 参数类型
 *
 * @export
 * @interface ShopSearchState
 */
export interface ShopSearchState {
    current: number
    searchVal: string
    shopList: any[]
    packageList: any[]
    goodsList: any[]
    articleList: any[]
    pageInfo: pageInfo
    userId: number
}
interface pageInfo {
    pageIndex: number
    totalPage: number
    pageSize: number
}
/**
 * ShopSearch.props 参数类型
 *
 * @export
 * @interface ShopSearchProps
 */
export interface ShopSearchProps {
    dispatch?: any
}
