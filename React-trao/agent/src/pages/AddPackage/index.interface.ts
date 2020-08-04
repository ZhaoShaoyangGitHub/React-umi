/**
 * AddPackage.state 参数类型
 *
 * @export
 * @interface AddPackageState
 */
export interface AddPackageState {
    categoryId: number
    packageAmount: any
    packageEfficacy: string
    packageImage: any
    packageName: string
    shopIds: Array<any>
    shopList: Array<any>
    storeProjectForms: Array<any>
    [propName: string]: any
    storeProjectList: Array<any>
}

/**
 * AddPackage.props 参数类型
 *
 * @export
 * @interface AddPackageProps
 */
export interface AddPackageProps {
    dispatch?: any
}
