/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-17 11:53:58
 * @LastEditTime: 2019-08-26 15:02:27
 */
/**
 * ModifyMobileNumber.state 参数类型
 *
 * @export
 * @interface ModifyMobileNumberState
 */
export interface ModifyMobileNumberState {
    verificationCode: any
    userPhone: any
    count: number
    isOld: boolean
    verificationCodeNewPhone: any
    personalInfo: any
    isSended: boolean
}

/**
 * ModifyMobileNumber.props 参数类型
 *
 * @export
 * @interface ModifyMobileNumberProps
 */
export interface ModifyMobileNumberProps {
    dispatch?: any
}
