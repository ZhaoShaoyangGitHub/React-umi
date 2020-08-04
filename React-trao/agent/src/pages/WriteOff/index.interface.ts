/**
 * WriteOff.state 参数类型
 *
 * @export
 * @interface WriteOffState
 */
export interface WriteOffState {
    val: number
    isCompleted: boolean
    itemInfo: any
    schedulingRecordId: number
}

/**
 * WriteOff.props 参数类型
 *
 * @export
 * @interface WriteOffProps
 */
export interface WriteOffProps {
    dispatch?: any
}
