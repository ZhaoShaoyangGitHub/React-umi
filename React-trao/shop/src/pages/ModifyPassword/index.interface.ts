/**
 * ModifyPassword.state 参数类型
 *
 * @export
 * @interface ModifyPasswordState
 */
export interface ModifyPasswordState {
    phone: string | undefined
    code: string | undefined
    status: number
    isSend: boolean
    seconds: number
    newPassword: string
    [propName: string]: any
}

/**
 * ModifyPassword.props 参数类型
 *
 * @export
 * @interface ModifyPasswordProps
 */
export interface ModifyPasswordProps {
    dispatch?: any
}
