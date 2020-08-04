import { any } from '_@types_prop-types@15.7.1@@types/prop-types'

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
 * @interface ShopItemState
 */
export interface ShopItemState {}

interface Objects {
    [propsName: string]: any
}

/**
 * ShopItem.props 参数类型
 *
 * @export
 * @interface ShopItemProps
 */
export interface ShopItemProps {
    shopImg: string
    shopTitle: string
    shopAddress: string
    shopPhoneNum?: number
    propsStyles?: Objects
    shopPrice?: number
    onHandleClick?: () => void
}
