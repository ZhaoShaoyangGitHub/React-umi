/**
 * MyPackage.state 参数类型
 *
 * @export
 * @interface MyPackageState
 */
export interface MyPackageState {
    current: number
    packageList: Array<any>
}

/**
 * MyPackage.props 参数类型
 *
 * @export
 * @interface MyPackageProps
 */
export interface MyPackageProps {
    dispatch?: any
}
