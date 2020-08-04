/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-22 11:39:50
 */

/**
 * AddressEdit.state 参数类型
 *
 * @export
 * @interface AddressEditState
 */
export interface AddressEditState {
    addressId?: number | string
    isDefault?: boolean
    areaData: Array<Array<string>>
    currentSelector: Array<number>
    province?: string
    city?: string
    district?: string
    address?: string
    name?: string
    phone?: string
    [propName: string]: any
}

/**
 * AddressEdit.props 参数类型
 *
 * @export
 * @interface AddressEditProps
 */
export interface AddressEditProps {
    dispatch?: any
    addressList: Array<Address>
    currentAddress: Address
}
export interface Address {
    address?: string
    city?: string
    createTime?: Date
    district?: string
    id?: number
    isDefault?: any
    name?: string
    phone?: string
    province?: string
    updateTime?: Date
    userId?: string
    zip?: string
}
