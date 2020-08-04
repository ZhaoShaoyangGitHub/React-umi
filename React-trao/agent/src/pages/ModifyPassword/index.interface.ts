/**
 * modifyPassword.state 参数类型
 *
 * @export
 * @interface ModifyPasswordState
 */
export interface ModifyPasswordState {
    inputPassword: boolean
    oldPassword: string
    newPassword: string
    status: boolean
    [propName: string]: any
}

/**
 * modifyPassword.props 参数类型
 *
 * @export
 * @interface ModifyPasswordProps
 */
export interface ModifyPasswordProps {
    dispatch?: any
}
