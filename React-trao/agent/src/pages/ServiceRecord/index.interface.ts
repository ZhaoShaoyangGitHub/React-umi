/**
 * ServiceRecord.state 参数类型
 *
 * @export
 * @interface ServiceRecordState
 */
export interface ServiceRecordState {
    searchText: string
    recordList: Array<any>
    storeInfo: any
    shopId: number
}

/**
 * ServiceRecord.props 参数类型
 *
 * @export
 * @interface ServiceRecordProps
 */
export interface ServiceRecordProps {
    dispatch?: any
}
