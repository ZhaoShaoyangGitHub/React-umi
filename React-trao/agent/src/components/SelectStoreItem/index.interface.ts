/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:31:42
 */
/**
 * SelectStoreItem.state 参数类型
 *
 * @export
 * @interface SelectStoreItemState
 */
export interface SelectStoreItemState {}

/**
 * SelectStoreItem.props 参数类型
 *
 * @export
 * @interface SelectStoreItemProps
 */
export interface SelectStoreItemProps {
    item: any
    showSelect?: boolean
    onHandleClick?: () => void
}
