/**
 * ArticleDetails.state 参数类型
 *
 * @export
 * @interface ArticleDetailsState
 */
export interface ArticleDetailsState {
    relatedArticleList: Array<any>
    articleDetail: articleDetail
    isEnshrine: number
    isLike: number
    isLogin: boolean
}

interface articleDetail {
    banner: string
    title: string
    content: string
    numberWatch: number
    thumbUpNumber: number
    createTime: string
}

/**
 * ArticleDetails.props 参数类型
 *
 * @export
 * @interface ArticleDetailsProps
 */
export interface ArticleDetailsProps {
    articleDetails: any
    dispatch?: any
}
