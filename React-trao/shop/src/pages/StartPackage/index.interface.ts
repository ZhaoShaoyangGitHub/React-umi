/**
 * StartPackage.state 参数类型
 *
 * @export
 * @interface StartPackageState
 */
export interface StartPackageState {
    orderId: number
    projectId: number
    packageInfo: any
    userInfo: any
    userId: number
}

/**
 * StartPackage.props 参数类型
 *
 * @export
 * @interface StartPackageProps
 */
export interface StartPackageProps {
    dispatch?: any
}
