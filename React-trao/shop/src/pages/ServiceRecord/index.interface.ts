/**
 * ServiceRecord.state 参数类型
 *
 * @export
 * @interface ServiceRecordState
 */
export interface ServiceRecordState {
    recordList: Array<any>
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
 * ServiceRecord.props 参数类型
 *
 * @export
 * @interface ServiceRecordProps
 */
export interface ServiceRecordProps {
    dispatch?: any
}
