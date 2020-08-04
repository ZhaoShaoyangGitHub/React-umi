/**
 * SearchTop.state 参数类型
 *
 * @export
 * @interface SearchTopState
 */
export interface SearchTopState {
    searchText: string
}

/**
 * SearchTop.props 参数类型
 *
 * @export
 * @interface SearchTopProps
 */
export interface SearchTopProps {
    searchText: string
    placeholder: string
    isShowBack: boolean
    onSearchHandle: Function
    style?: object
}
