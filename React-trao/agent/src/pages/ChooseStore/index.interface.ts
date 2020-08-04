/**
 * ChooseStore.state 参数类型
 *
 * @export
 * @interface ChooseStoreState
 */
export interface ChooseStoreState {
    searchText: string
    storeList: Array<any>
    pageInfo: pageInfo
}

interface pageInfo {
    pageSize: number
    currentPageIndex: number
    totalPage: number
}

/**
 * ChooseStore.props 参数类型
 *
 * @export
 * @interface ChooseStoreProps
 */
export interface ChooseStoreProps {
    dispatch?: any
}
