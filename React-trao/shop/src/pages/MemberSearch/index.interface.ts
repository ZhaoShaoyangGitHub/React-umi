/**
 * MemberSearch.state 参数类型
 *
 * @export
 * @interface MemberSearchState
 */
export interface MemberSearchState {
    searchText: string
    memberList: Array<any>
    pageInfo: pageInfo
    current: number
    appointmentType: 0 | 1
    hibernationType: 0 | 1
}
interface pageInfo {
    pageSize: number
    currentPageIndex: number
    totalPage: number
}

/**
 * MemberSearch.props 参数类型
 *
 * @export
 * @interface MemberSearchProps
 */
export interface MemberSearchProps {
    dispatch?: any
}
