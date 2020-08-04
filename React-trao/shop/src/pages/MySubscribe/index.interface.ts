/**
 * MySubscribe.state 参数类型
 *
 * @export
 * @interface MySubscribeState
 */
export interface MySubscribeState {
    showList: any[]
    isFetching: boolean
    keyword: string
    pageIndex: number
    hasMore: boolean
}

/**
 * MySubscribe.props 参数类型
 *
 * @export
 * @interface MySubscribeProps
 */
export interface MySubscribeProps {
    dispatch?: any
}
