/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:04:48
 */
/**
 * ShopItem.state 参数类型
 *
 * @export
 * @interface GoodsDetailsItemState
 */
// export interface GoodsDetailsItemState {}

export interface State {
    [propsName: string]: any
}

/**
 * GoodsDetailsItem.props 参数类型
 *
 * @export
 * @interface GoodsDetailsItemProps
 */
export interface GoodsDetailsItemProps {
    goodsImage?: string
    goodsTitle?: string
    goodsType?: number
    goodsStorage?: any
    onClick?: () => void
    type: string
    status: number
    dispatch?: any
}
