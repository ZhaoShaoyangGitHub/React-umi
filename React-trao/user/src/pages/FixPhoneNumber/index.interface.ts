/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-17 11:53:58
 * @LastEditTime: 2019-08-26 15:02:27
 */
/**
 * FixPhoneNumber.state 参数类型
 *
 * @export
 * @interface FixPhoneNumberState
 */
export interface FixPhoneNumberState {
    verificationCode: any
    userPhone: any
    count: number
    isOld: boolean
    verificationCodeNewPhone: any
    personalInfo: any
    isSended: boolean
}

/**
 * FixPhoneNumber.props 参数类型
 *
 * @export
 * @interface FixPhoneNumberProps
 */
export interface FixPhoneNumberProps {
    dispatch?: any
}
