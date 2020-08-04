/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-19 13:28:16
 * @LastEditTime: 2019-08-19 13:58:13
 */
/**
 * MyAchievement.state 参数类型
 *
 * @export
 * @interface MyAchievementState
 */
export interface MyAchievementState {
    orderList: any[]
    date: string
    monthMoney: number
    weekMoney: number
    totalMoney: number
    totalNum: number
    currentMonthMoney: number
    currentMonthNum: number
}

/**
 * MyAchievement.props 参数类型
 *
 * @export
 * @interface MyAchievementProps
 */
export interface MyAchievementProps {
    dispatch?: any
}
