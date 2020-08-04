/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-20 09:34:52
 * @LastEditTime: 2019-08-20 14:44:01
 */
/**
 * Home.state 参数类型
 *
 * @export
 * @interface HomeState
 */
export interface HomeState {
    currentIndex: number
    showMask: boolean
    currentOrderNum: number
    currentOrderAmount: number
    userSum: number
    currentAppointmentInfo: any
    shopName: string
}

/**
 * Home.props 参数类型
 *
 * @export
 * @interface HomeProps
 */
export interface HomeProps {
    dispatch?: any
}

export interface Objects {
    [propName: string]: any
}
