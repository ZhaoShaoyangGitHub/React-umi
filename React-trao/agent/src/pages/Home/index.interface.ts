/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-20 09:34:52
 * @LastEditTime: 2019-08-20 14:44:01
 */
/**
 * Home.state 参数类型
 *
 * @export
 * @interface HomeState
 */
export interface HomeState {
    storeId: any
    storeName: string
    shopNumber: number
    tradeAmount: number
    tradeCount: number
}

/**
 * Home.props 参数类型
 *
 * @export
 * @interface HomeProps
 */
export interface HomeProps {
    storeId?: any
    storeName?: string
    shopNumber?: number
    tradeAmount?: number
    tradeCount?: number
    dispatch?: any
    [propName: string]: any
}
