/**
 * AttendanceCalendar.state 参数类型
 *
 * @export
 * @interface AttendanceCalendarState
 */
export interface AttendanceCalendarState {
    personalInfo: personalInfo
    currentDate: number | string
    weeks: string | undefined
    times: number
    startTime: string
    endTime: string
    hours: number
}

interface personalInfo {
    avatar: string
    workNumber: number
    name: string
}

/**
 * AttendanceCalendar.props 参数类型
 *
 * @export
 * @interface AttendanceCalendarProps
 */
export interface AttendanceCalendarProps {
    dispatch?: any
}
