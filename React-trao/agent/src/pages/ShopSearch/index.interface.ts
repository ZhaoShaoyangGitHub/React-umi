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
    searchVal: string
    storeList: any[]
    historyList: string[]
    hasMore: boolean
    pageInfo: pageInfo
}

interface pageInfo {
    pageIndex: number
    totalPage: number
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
