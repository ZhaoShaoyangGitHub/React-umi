/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-15 13:52:49
 * @LastEditTime: 2019-08-24 12:57:11
 */
/**
 * OrderDetail.state 参数类型
 *
 * @export
 * @interface OrderDetailState
 */
export interface OrderDetailState {
    cancelVisible: boolean
    receiveVisible: boolean
    countTimer: number
    endTime: string
}

/**
 * OrderDetail.props 参数类型
 *
 * @export
 * @interface OrderDetailProps
 */
export interface OrderDetailProps {
    dispatch?: any
    data: any
}
