/**
 * OverviewGoods.state 参数类型
 *
 * @export
 * @interface OverviewGoodsState
 */
export interface OverviewGoodsState {
    shopId: number
    duration: number
    startTime: string
    endTime: string
    [propName: string]: any
}

/**
 * OverviewGoods.props 参数类型
 *
 * @export
 * @interface OverviewGoodsProps
 */
export interface OverviewGoodsProps {
    dispatch?: any
}
