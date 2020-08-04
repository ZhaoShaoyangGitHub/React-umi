/**
 * SchedulSelectUser.state 参数类型
 *
 * @export
 * @interface SchedulSelectUserState
 */
export interface SchedulSelectUserState {
    searchVal: any
    vipUserList: any[]
    hasMore: boolean
    pageIndex: number
}

/**
 * SchedulSelectUser.props 参数类型
 *
 * @export
 * @interface SchedulSelectUserProps
 */
export interface SchedulSelectUserProps {
    dispatch?: any
}
