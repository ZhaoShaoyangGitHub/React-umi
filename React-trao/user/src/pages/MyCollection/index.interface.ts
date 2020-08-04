/**
 * myCollection.state 参数类型
 *
 * @export
 * @interface MyCollectionState
 */
export interface MyCollectionState {
    current: number
    userId: number
    tabList: Array<any>
}

/**
 * myCollection.props 参数类型
 *
 * @export
 * @interface MyCollectionProps
 */
export interface MyCollectionProps {
    myCollectionDataList: Array<any>
    dispatch?: any
}
