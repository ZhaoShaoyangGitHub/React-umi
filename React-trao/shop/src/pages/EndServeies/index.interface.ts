/**
 * EndServeies.state 参数类型
 *
 * @export
 * @interface EndServeiesState
 */
export interface EndServeiesState {
    showList: any[]
    isFetching: boolean
    pageIndex: number
    keyword: string
    hasMore: boolean
}

/**
 * EndServeies.props 参数类型
 *
 * @export
 * @interface EndServeiesProps
 */
export interface EndServeiesProps {
    dispatch?: any
}
