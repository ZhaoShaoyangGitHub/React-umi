/**
 * Subscribe.state 参数类型
 *
 * @export
 * @interface SubscribeState
 */
export interface SubscribeState {
    dotOpt: any[]
    appointmentList: any[]
    notAppointmentList: any[]
    currentTime: any
    hasMore: boolean
    pageIndex: number
    isSend: boolean
    hasConfirm: boolean
}

/**
 * Subscribe.props 参数类型
 *
 * @export
 * @interface SubscribeProps
 */
export interface SubscribeProps {
    dispatch?: any
}
