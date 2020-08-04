/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-20 10:19:04
 * @LastEditTime: 2019-08-20 14:32:13
 */
/**
 * OrderConfirm.state 参数类型
 *
 * @export
 * @interface OrderConfirmState
 */
export interface OrderConfirmState {
    recomendPeople: any
    firstMoney: any
    username: string
    instalment: boolean
    balance: number
    date: string
    payType: string
    sourceArray: Array<any>
    selectedSource: number
    regUserInfo: Objects
    isOneShopping: number
}
interface Objects {
    [key: string]: any
}
/**
 * OrderConfirm.props 参数类型
 *
 * @export
 * @interface OrderConfirmProps
 */
export interface OrderConfirmProps {
    dispatch?: any
    OrderConfirmData?: any
    goodsForms?: any
}
