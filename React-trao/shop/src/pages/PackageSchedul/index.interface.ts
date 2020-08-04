/**
 * PackageSchedul.state 参数类型
 *
 * @export
 * @interface PackageSchedulState
 */
export interface PackageSchedulState {
    dotOpt: any[]
    appointmentList: any[]
    notAppointmentList: any[]
    currentTime: any
    currentUserInfo: any
    userId: number
}

/**
 * PackageSchedul.props 参数类型
 *
 * @export
 * @interface PackageSchedulProps
 */
export interface PackageSchedulProps {
    dispatch?: any
}
