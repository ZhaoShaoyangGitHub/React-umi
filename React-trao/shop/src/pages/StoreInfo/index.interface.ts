/**
 * StoreInfo.state 参数类型
 *
 * @export
 * @interface StoreInfoState
 */
export interface StoreInfoState {
    shopId: number
    name: string
    address: string
    imageUrl: string
    introduce: string
    province: string
    provinceIndex: number
    provinceArr: Array<any>
    city: string
    cityIndex: number
    cityArr: Array<any>
    area: string
    areaIndex: number
    areaArr: Array<any>
    addressStatus: boolean
    areaType: number
}

/**
 * StoreInfo.props 参数类型
 *
 * @export
 * @interface StoreInfoProps
 */
export interface StoreInfoProps {
    dispatch?: any
}
