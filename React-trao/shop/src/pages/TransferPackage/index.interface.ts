/**
 * TransferPackage.state 参数类型
 *
 * @export
 * @interface TransferPackageState
 */
export interface TransferPackageState {
    oldUserId: number
    packageInfo: any
    userInfo: any
    orderId: number
    oldUserInfo: any
    userId: number
    count: number
    code: string
}

/**
 * TransferPackage.props 参数类型
 *
 * @export
 * @interface TransferPackageProps
 */
export interface TransferPackageProps {
    dispatch?: any
}
