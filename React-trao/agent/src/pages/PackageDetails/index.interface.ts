/**
 * PackageDetails.state 参数类型
 *
 * @export
 * @interface PackageDetailsState
 */
export interface PackageDetailsState {
    id: number
    status: number
    packageDetails: any
    storeList: Array<any>
    isSelectedAll: boolean
}

/**
 * PackageDetails.props 参数类型
 *
 * @export
 * @interface PackageDetailsProps
 */
export interface PackageDetailsProps {
    dispatch?: any
}
