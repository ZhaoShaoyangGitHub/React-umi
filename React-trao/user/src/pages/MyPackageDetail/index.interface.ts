/**
 * MyPackageDetail.state 参数类型
 *
 * @export
 * @interface MyPackageDetailState
 */
export interface MyPackageDetailState {
    itemsList: any[]
    packageInfo: any
    recordList: {
        staffName: string
        packageTitle: string
        serviceTitle: string
        startTime: Date
        endTime: Date
        staffNumber: string
        weight: number
    }[]
}

/**
 * MyPackageDetail.props 参数类型
 *
 * @export
 * @interface MyPackageDetailProps
 */
export interface MyPackageDetailProps {
    dispatch?: any
}
