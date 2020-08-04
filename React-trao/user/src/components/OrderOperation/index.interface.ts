/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 11:44:29
 * @LastEditTime: 2019-08-24 13:20:59
 */
/**
 * OrderOperation.state 参数类型
 *
 * @export
 * @interface OrderOperationState
 */
export interface OrderOperationState {}

/**
 * OrderOperation.props 参数类型
 *
 * @export
 * @interface OrderOperationProps
 */
export interface OrderOperationProps {
    status: number
    trade: any
    handlePay: Function
    handleCancel: Function
    handleRecieve: Function
    gotoExpress: Function
    handleRefund: Function
    handleDelete: Function
    evaluationStatus: number
}
