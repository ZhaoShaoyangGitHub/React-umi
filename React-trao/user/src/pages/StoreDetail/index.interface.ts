/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-21 15:22:11
 */
/**
 * StoreDetail.state 参数类型
 *
 * @export
 * @interface StoreDetailState
 */
export interface StoreDetailState {
    currentIndex: number
    detailData: Objects
    storeId: number
}

/**
 * StoreDetail.props 参数类型
 *
 * @export
 * @interface StoreDetailProps
 */
export interface StoreDetailProps {
    dispatch?: any
}

export interface Objects {
    [propsName: string]: any
}
