/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:04:48
 */
/**
 * StoreItem.state 参数类型
 *
 * @export
 * @interface StoreItemState
 */
export interface StoreItemState {}

interface Objects {
    [propsName: string]: any
}

/**
 * StoreItem.props 参数类型
 *
 * @export
 * @interface StoreItemProps
 */
export interface StoreItemProps {
    storeImg?: string
    storeTitle: string
    storeAddress: string
    propsStyles?: Objects
    nameStyles?: Objects
    itemStyles?: Objects
    children?: any
    onHandleClick?: () => void
}
