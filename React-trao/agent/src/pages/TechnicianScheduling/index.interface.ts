/**
 * TechnicianScheduling.state 参数类型
 *
 * @export
 * @interface TechnicianSchedulingState
 */
export interface TechnicianSchedulingState {
    dotOpt: any[]
    numOpt: any[]
    schedulingList: any[]
    currentTime: any
    currentMonth: string
    shopId: number
    storeInfo: any
}

/**
 * TechnicianScheduling.props 参数类型
 *
 * @export
 * @interface TechnicianSchedulingProps
 */
export interface TechnicianSchedulingProps {
    dispatch?: any
}
