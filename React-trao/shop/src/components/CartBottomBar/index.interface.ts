/**
 * CartBottomBar.state 参数类型
 *
 * @export
 * @interface CartBottomBarState
 */
export interface CartBottomBarState {}

/**
 * CartBottomBar.props 参数类型
 *
 * @export
 * @interface CartBottomBarProps
 */
export interface CartBottomBarProps {
    handleToggleCartPanel: Function
    gotoPay: Function
    price: number
    productNum: number
}
