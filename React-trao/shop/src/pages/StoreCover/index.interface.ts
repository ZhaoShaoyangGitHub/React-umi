/**
 * StoreCover.state 参数类型
 *
 * @export
 * @interface StoreCoverState
 */
export interface StoreCoverState {
    imgUrl: string
    shopId: number
    saveLayerStatue: boolean
    moreOptionLayerStatue: boolean
}

/**
 * StoreCover.props 参数类型
 *
 * @export
 * @interface StoreCoverProps
 */
export interface StoreCoverProps {
    dispatch?: any
}
