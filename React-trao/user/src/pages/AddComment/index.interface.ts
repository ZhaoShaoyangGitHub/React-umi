/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-22 11:39:50
 */

/**
 * AddComment.state 参数类型
 *
 * @export
 * @interface AddCommentState
 */
export interface AddCommentState {
    comment: string
    level: number
    levelText: string
    commentType: number
    domainId: number
    technicianInfo: any
    commentId: number
}

/**
 * AddComment.props 参数类型
 *
 * @export
 * @interface AddCommentProps
 */
export interface AddCommentProps {
    dispatch?: any
}
