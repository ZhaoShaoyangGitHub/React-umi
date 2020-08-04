/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:04:48
 */
/**
 * StockItem.state 参数类型
 *
 * @export
 * @interface StockItemState
 */
// export interface StockItemState {}

// interface Objects {
//     [propsName: string]: any
// }

/**
 * StockItem.props 参数类型
 *
 * @export
 * @interface StockItemProps
 */
export interface StockItemProps {
    goodsImage?: string
    goodsTitle?: string
    goodsStorage?: number
    onClick?: () => void
    isShowButotn?: boolean
}
