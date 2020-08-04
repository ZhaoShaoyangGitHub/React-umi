/**
 * Message.state 参数类型
 *
 * @export
 * @interface MessageState
 */
export interface MessageState {
    current: number
    messageCategoryList: Array<any>
    messageList: Array<any>
}

/**
 * Message.props 参数类型
 *
 * @export
 * @interface MessageProps
 */
export interface MessageProps {
    dispatch?: any
}
