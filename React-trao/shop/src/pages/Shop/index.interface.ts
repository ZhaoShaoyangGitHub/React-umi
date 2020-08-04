/**
 * Shop.state 参数类型
 *
 * @export
 * @interface ShopState
 */
export interface ShopState {
    shopDetails: Objects
    personalInfo?: Objects
}
export interface Objects {
    [propsName: string]: any
}
/**
 * Shop.props 参数类型
 *
 * @export
 * @interface ShopProps
 */
export interface ShopProps {
    dispatch?: any
}
