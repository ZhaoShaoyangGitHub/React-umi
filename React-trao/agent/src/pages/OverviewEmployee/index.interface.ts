/**
 * OverviewEmployee.state 参数类型
 *
 * @export
 * @interface OverviewEmployeeState
 */
export interface OverviewEmployeeState {
    shopId: number
    duration: number
    startTime: string
    endTime: string
    [propName: string]: any
}

/**
 * OverviewEmployee.props 参数类型
 *
 * @export
 * @interface OverviewEmployeeProps
 */
export interface OverviewEmployeeProps {
    dispatch?: any
}
