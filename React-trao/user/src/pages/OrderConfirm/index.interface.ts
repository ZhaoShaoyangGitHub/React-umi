/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 09:49:55
 * @LastEditTime: 2019-08-23 13:20:52
 */
/**
 * OrderConfirm.state 参数类型
 *
 * @export
 * @interface OrderConfirmState
 */
export interface Address {
    id: number
    province: string
    city: string
    district: string
    address: string
    phone: string
    name: string
    isDefault: any
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
export interface OrderConfirmState {
    isFirstPay: boolean
    deliveryType: number
}

/**
 * OrderConfirm.props 参数类型
 *
 * @export
 * @interface OrderConfirmProps
 */
export interface OrderConfirmProps {
    currentAddress: Address
    goodsList: Array<CartClass>
    useablePoint: number
    pointRatio: number
    usePoint: boolean
    payType: string
    sourceArray: Array<string>
    selectedSource: number
    shopId: number
    shopName: string
    totalPrice: number
    goods: any
    cartIds: Array<Number>
    recommend: string
    needAddress: boolean
    dispatch?: any
}
