/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 15:11:07
 * @LastEditTime: 2019-08-22 10:00:13
 */
/**
 * Cart.state 参数类型
 *
 * @export
 * @interface CartState
 */
export interface CartState {
    validList: Array<any>
    invalidList: Array<any>
    selectedRowKeys: Array<number>
    totalPrice: number
    allValidKeys: Array<number>
    allInvalidKeys: Array<number>
    checkAll: boolean
    totalNumber: number
    isEdit: boolean
    allValidData: any[]
}

/**
 * Cart.props 参数类型
 *
 * @export
 * @interface CartProps
 */
export interface CartProps {
    dispatch?: any
    CartDataList: any
}

export interface CartClass {
    id?: number
    amount?: number
    cartId?: number
    goodsId?: number
    goodsName?: string
    price?: number
    imageUrl?: string
    goodsType?: any
    isValid?: boolean
}
export interface Enshrine {
    createTime?: Date
    domainId?: number
    id?: number
    shopId?: number
    type?: string
    updateTime?: Date
    userId?: number
}
