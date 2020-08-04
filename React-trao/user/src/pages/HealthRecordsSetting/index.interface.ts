/**
 * HealthRecordsSetting.state 参数类型
 *
 * @export
 * @interface HealthRecordsSettingState
 */
export interface HealthRecordsSettingState {
    weightValue: any
    type: number
    startTime: string
    endTime: string
    status: 0 | 1
    [propNames: string]: any
}

/**
 * HealthRecordsSetting.props 参数类型
 *
 * @export
 * @interface HealthRecordsSettingProps
 */
export interface HealthRecordsSettingProps {
    dispatch?: any
}
