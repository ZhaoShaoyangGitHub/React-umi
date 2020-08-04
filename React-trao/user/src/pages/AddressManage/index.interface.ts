/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 15:08:17
 * @LastEditTime: 2019-08-22 16:14:56
 */
export interface Address {
    id: number
    province?: string
    city?: string
    district?: string
    address?: string
    phone?: string
    name?: string
    isDefault?: any
}
/**
 * AddressManage.state 参数类型
 *
 * @export
 * @interface AddressManageState
 */
export interface AddressManageState {}

/**
 * AddressManage.props 参数类型
 *
 * @export
 * @interface AddressManageProps
 */
export interface AddressManageProps {
    addressList: Array<Address>
    dispatch?: any
}
