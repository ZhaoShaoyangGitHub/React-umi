/**
 * AttendanceTabBar.state 参数类型
 *
 * @export
 * @interface AttendanceTabBarState
 */
export interface AttendanceTabBarState {
    list?: Array<List>
    currentId?: number
    color?: string
    selectedColor?: string
    backgroundColor?: string
}

/**
 * AttendanceTabBar.props 参数类型
 *
 * @export
 * @interface AttendanceTabBarProps
 */

export interface AttendanceTabBarProps {
    tabBar: TabBar
}
export interface TabBar {
    list: Array<List>
    currentId: number
    color?: string | undefined
    selectedColor?: string | undefined
    backgroundColor?: string | undefined
}
interface List {
    id: number
    pagePath: string
    text: string
    iconPath: string
    selectedIconPath: string
}
