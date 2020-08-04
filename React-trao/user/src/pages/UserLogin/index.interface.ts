/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-20 14:43:57
 * @LastEditTime: 2019-08-22 10:18:40
 */
/**
 * UserLogin.state 参数类型
 *
 * @export
 * @interface UserLoginState
 */
export interface UserLoginState {
    accountName: string
    password: string
    isAccFocus: boolean
    isPwdFocus: boolean
    count: number
    sendedMsgCode: boolean
    sessionKey?: string
    isCodeOpened: boolean
    isAgree: boolean
}

/**
 * UserLogin.props 参数类型
 *
 * @export
 * @interface UserLoginProps
 */
export interface UserLoginProps {
    dispatch?: any
}
