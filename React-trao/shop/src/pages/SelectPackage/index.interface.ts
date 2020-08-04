/**
 * SelectPackage.state 参数类型
 *
 * @export
 * @interface SelectPackageState
 */
export interface SelectPackageState {
    userId: number
    list: any[]
    type: string
    pageIndex: number
    hasMore: boolean
}

/**
 * SelectPackage.props 参数类型
 *
 * @export
 * @interface SelectPackageProps
 */
export interface SelectPackageProps {
    dispatch?: any
}
