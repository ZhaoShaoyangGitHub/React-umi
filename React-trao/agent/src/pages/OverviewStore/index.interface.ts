/**
 * OverviewStore.state 参数类型
 *
 * @export
 * @interface OverviewStoreState
 */
export interface OverviewStoreState {
    shopId: number
    duration: number
    startTime: string
    endTime: string
    tradeTotalAmount: number
    payTradeNumber: number
    serviceUserNumber: number
    payResponse: Array<any>
    tradeTotalCount: number
    payTradeTotalCount: number
    cancelTradeTotalCount: number
    refundTradeTotalCount: number
    packageResponse: Array<any>
    cardsAmount: number
    [propName: string]: any
}

/**
 * OverviewStore.props 参数类型
 *
 * @export
 * @interface OverviewStoreProps
 */
export interface OverviewStoreProps {
    dispatch?: any
}
