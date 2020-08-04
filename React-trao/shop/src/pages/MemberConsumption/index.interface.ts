/**
 * MemberConsumption.state 参数类型
 *
 * @export
 * @interface MemberConsumptionState
 */
export interface MemberConsumptionState {
    current: number
    userId: number
    recordList: Array<any>
    packageList: Array<any>
    date: string
    serviceInfo: serviceInfo
}
interface serviceInfo {
    todayTime: number
    totalNumber: number
    totalTime: number
    weeksTime: number
}

/**
 * MemberConsumption.props 参数类型
 *
 * @export
 * @interface MemberConsumptionProps
 */
export interface MemberConsumptionProps {
    dispatch?: any
}
