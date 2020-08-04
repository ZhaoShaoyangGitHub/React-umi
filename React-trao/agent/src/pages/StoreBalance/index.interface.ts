/**
 * StoreBalance.state 参数类型
 *
 * @export
 * @interface StoreBalanceState
 */
export interface StoreBalanceState {
    shopId: number
    balance: number
    giveBalance: number
    giveInvalidTime: string
}

/**
 * StoreBalance.props 参数类型
 *
 * @export
 * @interface StoreBalanceProps
 */
export interface StoreBalanceProps {
    dispatch?: any
}
