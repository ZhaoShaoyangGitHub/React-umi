/**
 * ApplyRefund.state 参数类型
 *
 * @export
 * @interface ApplyRefundState
 */
export interface ApplyRefundState {
    packageInfo: any
    userInfo: any
    userId: number
    orderId: number
    count: number
    code: string
}

/**
 * ApplyRefund.props 参数类型
 *
 * @export
 * @interface ApplyRefundProps
 */
export interface ApplyRefundProps {
    dispatch?: any
}
