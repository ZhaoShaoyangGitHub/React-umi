/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-06 14:01:50
 * @LastEditTime: 2019-08-07 14:25:34
 */

import { ReactNode } from 'react'

/**
 * TitleSession.state 参数类型
 *
 * @export
 * @interface TitleSessionState
 */
export interface TitleSessionState {}

/**
 * TitleSession.props 参数类型
 *
 * @export
 * @interface TitleSessionProps
 */
export interface TitleSessionProps {
    title: string
    handleMore?: () => any
    handelAdd?: () => any
}
