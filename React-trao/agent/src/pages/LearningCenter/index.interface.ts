/**
 * LearningCenter.state 参数类型
 *
 * @export
 * @interface LearningCenterState
 */
export interface LearningCenterState {
    current: number
    articleCategoryList: Array<any>
    articleList: Array<any>
    pageInfo: pageInfo
}

interface pageInfo {
    pageIndex: number
    totalPage: number
}

/**
 * LearningCenter.props 参数类型
 *
 * @export
 * @interface LearningCenterProps
 */
export interface LearningCenterProps {
    articleCategoryList: Array<any>
    articleList: Array<any>
    dispatch?: any
}
