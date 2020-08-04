/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-06 09:57:40
 * @LastEditTime: 2019-08-06 16:17:05
 */
/**
 * shopmall.state 参数类型
 *
 * @export
 * @interface ShopmallState
 */
interface Cat {
    id: number
    title: string
}
interface Goods {
    id: number
    img: string
    title: string
    description: string
    price: number | string
}
export interface ShopmallState {
    city: string
    cats: Array<Cat>
    currentCat: number | string
    list: Array<Goods>
    packageList: any[]
    isLogin: boolean
    userId: number
}

/**
 * shopmall.props 参数类型
 *
 * @export
 * @interface ShopmallProps
 */
export interface ShopmallProps {
    dispatch?: any
    cartQuantity: string
    packageCategoryList: { id: number | string; name: string }[]
}
