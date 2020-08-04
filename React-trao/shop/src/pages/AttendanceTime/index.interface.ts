/**
 * AttendanceTime.state 参数类型
 *
 * @export
 * @interface AttendanceTimeState
 */
export interface AttendanceTimeState {
    data: string
    time: string
    timer: any
    weeks: any
    workState: number
    startTime: string
    endTime: string
    isRecord: boolean
    personalInfo: any
    punchStatus: boolean
    addressLocation: addressLocation
}

type addressLocation = {
    longitude: number
    latitude: number
}

/**
 * AttendanceTime.props 参数类型
 *
 * @export
 * @interface AttendanceTimeProps
 */
export interface AttendanceTimeProps {
    dispatch?: any
}
