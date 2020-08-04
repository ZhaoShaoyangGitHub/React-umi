/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:04:48
 */
/**
 * SelectTime.state 参数类型
 *
 * @export
 * @interface SelectTimeState
 */
export interface SelectTimeState {}

interface Objects {
    [propsName: string]: any
}

/**
 * SelectTime.props 参数类型
 *
 * @export
 * @interface SelectTimeProps
 */
export interface SelectTimeProps {
    duration: number
    startTime: string
    endTime: string
    propsStyles?: Objects
    onChange: Function
}
