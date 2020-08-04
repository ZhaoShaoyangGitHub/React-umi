/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-21 15:22:11
 * @LastEditTime: 2019-08-21 15:22:11
 */
/**
 * Home.state 参数类型
 *
 * @export
 * @interface HomeState
 */
export interface HomeState {
    NavOffsetTop: number
    isActivated: boolean
    current: number
    articleCategoryList: Array<any>
    articleList: Array<any>
    beginAppointment: any
    pageInfo: pageInfo
    isShowServiceConfirm: boolean
    isShowComment: boolean
    isLogin: boolean
    userId: number
}

interface pageInfo {
    pageIndex: number
    totalPage: number
}

/**
 * Home.props 参数类型
 *
 * @export
 * @interface HomeProps
 */
export interface HomeProps {
    articleCategoryList: Array<any>
    articleList: Array<any>
    dispatch?: any
}
