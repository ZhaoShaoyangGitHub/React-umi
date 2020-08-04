/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-24 11:47:49
 * @LastEditTime: 2019-08-24 11:47:49
 */
/**
 * ConfirmModal.state 参数类型
 *
 * @export
 * @interface ConfirmModalState
 */
export interface ConfirmModalState {}

/**
 * ConfirmModal.props 参数类型
 *
 * @export
 * @interface ConfirmModalProps
 */
export interface ConfirmModalProps {
    visible: boolean
    title: string
    content: string
    handleCancel: Function
    handleConfirm: Function
}
