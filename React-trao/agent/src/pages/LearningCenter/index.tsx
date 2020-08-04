import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { LearningCenterProps, LearningCenterState } from './index.interface'
import ArticleItem from '../../components/ArticleItem/index'
import NoSearchData from '../../components/NoSearchData'
import styles from './LearningCenter.module.less'

@connect(({ LearningCenter }) => ({
    ...LearningCenter,
}))
class LearningCenter extends Component<LearningCenterProps, LearningCenterState> {
    config: Config = {
        navigationBarTitleText: '学习中心',
    }
    constructor(props: LearningCenterProps) {
        super(props)
        this.state = {
            current: 0,
            articleCategoryList: [],
            articleList: [],
            pageInfo: {
                pageIndex: 1,
                totalPage: 1,
            },
        }
    }

    componentDidShow() {
        if (!Taro.getStorageSync('token')) {
            Taro.reLaunch({ url: '/pages/UserLogin/index' })
            return
        }
        this.props.dispatch({
            type: 'LearningCenter/getArticleCategory',
            cb: () => {
                this.setState({
                    articleCategoryList: this.props.articleCategoryList,
                })
            },
        })
        this.setState(
            {
                articleList: [],
            },
            () => {
                this.getArticleList()
            },
        )
    }

    onReachBottom() {
        const { pageInfo, current } = this.state
        if (pageInfo.pageIndex < pageInfo.totalPage) {
            pageInfo.pageIndex++
            this.getArticleList(current)
        }
    }

    handleClick = (value) => {
        this.setState(
            {
                current: value,
                articleList: [],
                pageInfo: {
                    pageIndex: 1,
                    totalPage: 0,
                },
            },
            () => {
                this.getArticleList(value)
            },
        )
    }

    getArticleList = (categoryId: number = 0) => {
        const { pageInfo, articleList } = this.state
        let payload: any = { pageIndex: pageInfo.pageIndex }
        if (categoryId !== 0) {
            payload.categoryId = categoryId
        }
        this.props.dispatch({
            type: 'LearningCenter/getArticleList',
            payload,
            cb: (data) => {
                const { list, pageIndex, totalPage } = data
                this.setState({
                    articleList: list && list.length > 0 ? articleList.concat(list) : articleList,
                    pageInfo: {
                        pageIndex,
                        totalPage,
                    },
                })
            },
        })
    }

    render() {
        const { current, articleCategoryList, articleList, pageInfo } = this.state
        return (
            <View className={styles.LearningCenterMain}>
                <View className={styles.fixedTab}>
                    <AtTabs
                        current={current}
                        tabList={articleCategoryList}
                        onClick={this.handleClick.bind(this)}
                    ></AtTabs>
                </View>
                <View className={styles.articleListWrapper}>
                    {articleList && articleList.length > 0 ? (
                        <View>
                            {articleList.map((item) => {
                                return (
                                    <ArticleItem
                                        onHandleClick={() => {
                                            Taro.navigateTo({
                                                url: '/pages/ArticleDetails/index?id=' + item.id,
                                            })
                                        }}
                                        key={item.id}
                                        articleImg={JSON.parse(item.image).file}
                                        articleTitle={item.title}
                                        numberWatch={item.numberWatch}
                                        thumbUpNumber={item.thumbUpNumber}
                                        data={item.createTime}
                                        propsStyles={{ marginBottom: '30rpx' }}
                                    />
                                )
                            })}
                            <View className={styles.loadText}>
                                {pageInfo.pageIndex <= pageInfo.totalPage ? '没有更多数据了~' : '加载中···'}
                            </View>
                        </View>
                    ) : (
                        <NoSearchData text="搜索文章" />
                    )}
                </View>
            </View>
        )
    }
}

export default LearningCenter
