/**
 * EditScheduling.state 参数类型
 *
 * @export
 * @interface EditSchedulingState
 */
export interface EditSchedulingState {
    technicianId: number
    dotOpt: any[]
    currentTime: any
    selectDayList: any
    technicianInfo: any
}

/**
 * EditScheduling.props 参数类型
 *
 * @export
 * @interface EditSchedulingProps
 */
export interface EditSchedulingProps {
    dispatch?: any
}
