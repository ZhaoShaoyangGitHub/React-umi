/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-06 09:57:40
 * @LastEditTime: 2019-08-06 16:17:05
 */
/**
 * ShopMap.state 参数类型
 *
 * @export
 * @interface ShopMapState
 */

export interface ShopMapState {
    shopList: any[]
}

/**
 * ShopMap.props 参数类型
 *
 * @export
 * @interface ShopMapProps
 */
export interface ShopMapProps {
    dispatch?: any
    cartQuantity: string
    packageCategoryList: { id: number | string; name: string }[]
}
