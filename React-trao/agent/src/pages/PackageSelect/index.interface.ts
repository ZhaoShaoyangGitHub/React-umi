/**
 * PackageSelect.state 参数类型
 *
 * @export
 * @interface PackageSelectState
 */
export interface PackageSelectState {
    list: any
    pageInfo: pageInfo
}

interface pageInfo {
    pageSize: number
    currentPageIndex: number
    totalPage: number
}

/**
 * PackageSelect.props 参数类型
 *
 * @export
 * @interface PackageSelectProps
 */
export interface PackageSelectProps {
    dispatch?: any
}
