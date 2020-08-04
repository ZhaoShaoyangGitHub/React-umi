/**
 * Store.state 参数类型
 *
 * @export
 * @interface StoreState
 */
export interface StoreState {
    shopId: number
    name: string
    address: string
    imageUrl: string
}

/**
 * Store.props 参数类型
 *
 * @export
 * @interface StoreProps
 */
export interface StoreProps {
    dispatch?: any
}
