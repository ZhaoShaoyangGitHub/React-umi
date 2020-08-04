/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-19 10:34:35
 * @LastEditTime: 2019-08-26 15:00:45
 */

/**
 * Personal.state 参数类型
 *
 * @export
 * @interface PersonalState
 */
export interface PersonalState {
    userInfo: Objects
    personalInfo: Objects
    isSignIn: 0 | 1 | 2
    isPopupStatus: boolean
    signInDay: number
}

/**
 * Personal.props 参数类型
 *
 * @export
 * @interface PersonalProps
 */
export interface PersonalProps {
    dispatch?: any
}

export interface Objects {
    [propsName: string]: any
}
