/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:31:42
 */
/**
 * PackItem.state 参数类型
 *
 * @export
 * @interface PackItemState
 */
export interface PackItemState {}

interface Objects {
    [propsName: string]: any
}

/**
 * PackItem.props 参数类型
 *
 * @export
 * @interface PackItemProps
 */
export interface PackItemProps {
    imgSrc: string
    title: string
    showObj: Objects[]
    btnObj: Objects
    packageStatus: Objects
    propsStyles?: Objects
    shopPrice?: number
    shopDistance?: string
    onHandleClick?: () => void
    onHandleSuitClick?: () => void
    storeId?: any
    orderId: number
    isShowStatus: boolean
    isShowDetail?: boolean
    efficacy?: string
}
