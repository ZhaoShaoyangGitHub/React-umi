/**
 * AttendanceStatistics.state 参数类型
 *
 * @export
 * @interface AttendanceStatisticsState
 */
export interface AttendanceStatisticsState {
    personalInfo: any
    year: number
    month: number
    attendanceDays: number
    averageHours: number
    restDays: number
    currentMonth: number
}

/**
 * AttendanceStatistics.props 参数类型
 *
 * @export
 * @interface AttendanceStatisticsProps
 */
export interface AttendanceStatisticsProps {
    dispatch?: any
}
