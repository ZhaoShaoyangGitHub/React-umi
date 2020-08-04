/**
 * SelectUser.state 参数类型
 *
 * @export
 * @interface SelectUserState
 */
export interface SelectUserState {
    searchVal: any
    mobile: string
    vipUserList: any[]
    type: string
    isShowRegisterModal: boolean
    isCompleted: boolean
    oldUserId: number
}

/**
 * SelectUser.props 参数类型
 *
 * @export
 * @interface SelectUserProps
 */
export interface SelectUserProps {
    dispatch?: any
}
