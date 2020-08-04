/**
 * OverviewMember.state 参数类型
 *
 * @export
 * @interface OverviewMemberState
 */
export interface OverviewMemberState {
    shopId: number
    duration: number
    startTime: string
    endTime: string
    [propName: string]: any
}

/**
 * OverviewMember.props 参数类型
 *
 * @export
 * @interface OverviewMemberProps
 */
export interface OverviewMemberProps {
    dispatch?: any
}
