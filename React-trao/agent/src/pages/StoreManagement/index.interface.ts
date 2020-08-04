/**
 * StoreManagement.state 参数类型
 *
 * @export
 * @interface StoreManagementState
 */
export interface StoreManagementState {
    storeList: Array<any>
    pageInfo: pageInfo
}

interface pageInfo {
    pageSize: number
    currentPageIndex: number
    totalPage: number
}

/**
 * StoreManagement.props 参数类型
 *
 * @export
 * @interface StoreManagementProps
 */
export interface StoreManagementProps {
    dispatch?: any
}
