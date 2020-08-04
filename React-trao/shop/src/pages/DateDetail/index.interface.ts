/**
 * DateDetail.state 参数类型
 *
 * @export
 * @interface DateDetailState
 */
export interface DateDetailState {
    selector: string[]
    selectorChecked: string
    isAnimation: boolean
    tagList: string[]
    tagInputVal: string
    tagModal: boolean
    isFootSoak: boolean
    schedulingRecordId: number
    isOneShopping: boolean
    eatInfo: {
        nowBreakfast: string
        nowLunch: string
        nowSupper: string
        yesterdayBreakfast: string
        yesterdayLunch: string
        yesterdaySupper: string
        weight: string
    }
    itemInfo: any
}

/**
 * DateDetail.props 参数类型
 *
 * @export
 * @interface DateDetailProps
 */
export interface DateDetailProps {
    dispatch?: any
}
