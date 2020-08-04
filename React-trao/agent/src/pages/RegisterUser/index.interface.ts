/**
 * RegisterUser.state 参数类型
 *
 * @export
 * @interface RegisterUserState
 */
export interface RegisterUserState {
    userName: string
    userPhone: string
    userCode: string
    isAccFocus: boolean
    isPwdFocus: boolean
    isCodeFocus: boolean
    count: number
}

/**
 * RegisterUser.props 参数类型
 *
 * @export
 * @interface RegisterUserProps
 */
export interface RegisterUserProps {
    dispatch?: any
}
