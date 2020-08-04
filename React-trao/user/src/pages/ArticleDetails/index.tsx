import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ArticleDetailsProps, ArticleDetailsState } from './index.interface'
import styles from './ArticleDetails.module.less'
import { BASEURL } from '../../config/index'
import { Icons } from '../../assets/img/load'
import { getToday } from '../../utils/function'
import ArticleItem from '../../components/ArticleItem/index'

@connect(({ ArticleDetails }) => ({
    ...ArticleDetails,
}))
class ArticleDetails extends Component<ArticleDetailsProps, ArticleDetailsState> {
    config: Config = {
        navigationBarTitleText: '文章详情',
    }
    constructor(props: ArticleDetailsProps) {
        super(props)
        this.state = {
            relatedArticleList: [],
            articleDetail: {
                banner: '',
                title: '',
                content: '',
                numberWatch: 0,
                thumbUpNumber: 0,
                createTime: '',
            },
            isEnshrine: 2, //是否被用户收藏：{1：是，2：否}
            isLike: 2, //是否被用户点赞：{1：是，2：否}
            isLogin: false, //用户是否登录状态
        }
    }

    componentDidShow() {
        const { id, userId } = this.$router.params
        if (id) {
            this.props.dispatch({
                type: 'ArticleDetails/getArticleDetails',
                payload: {
                    id,
                    userId,
                },
                cb: () => {
                    const { articleDetails } = this.props
                    this.setState({
                        relatedArticleList: articleDetails.articleResponses,
                        articleDetail: {
                            banner: BASEURL + JSON.parse(articleDetails.banner).file,
                            title: articleDetails.title,
                            content: articleDetails.content,
                            numberWatch: Math.floor(articleDetails.numberWatch),
                            thumbUpNumber: Math.floor(articleDetails.thumbUpNumber),
                            createTime: getToday(articleDetails.createTime),
                        },
                        isEnshrine: articleDetails.isEnshrine,
                        isLike: articleDetails.isLike,
                    })
                },
            })
        }
        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                this.setState({
                    isLogin: true,
                })
            }
        } catch (e) {
            // Do something when catch error
        }
    }

    handleCollection = () => {
        const { isEnshrine, isLogin } = this.state
        if (!isLogin) {
            Taro.showToast({
                title: '请登录',
                icon: 'none',
                duration: 500,
                mask: true,
                success: () => {
                    const timer = setTimeout(() => {
                        clearInterval(timer)
                        Taro.reLaunch({ url: '/pages/UserLogin/index' })
                    }, 500)
                },
            })
            return
        }
        const { id } = this.$router.params
        const { userId } = JSON.parse(Taro.getStorageSync('personalInfo'))
        this.props.dispatch({
            type: `ArticleDetails/${isEnshrine === 1 ? 'cancelCollection' : 'addCollection'}`,
            payload: {
                domainId: +id,
                type: 3,
                userId,
            },
            cb: () => {
                Taro.showToast({
                    title: `${isEnshrine === 1 ? '取消收藏' : '收藏成功'}`,
                    mask: true,
                })
                this.setState({
                    isEnshrine: isEnshrine === 1 ? 2 : 1,
                })
            },
        })
    }

    handleLike = () => {
        const { isLike, isLogin } = this.state
        if (!isLogin) {
            Taro.showToast({
                title: '请登录',
                icon: 'none',
                duration: 500,
                mask: true,
                success: () => {
                    const timer = setTimeout(() => {
                        clearInterval(timer)
                        Taro.navigateTo({ url: '/pages/UserLogin/index' })
                    }, 500)
                },
            })
            return
        }
        const { id } = this.$router.params
        this.props.dispatch({
            type: `ArticleDetails/${isLike === 1 ? 'cancelLike' : 'addLike'}`,
            payload: {
                domainId: id,
                type: 1,
            },
            cb: () => {
                Taro.showToast({
                    title: `${isLike === 1 ? '取消点赞' : '点赞成功'}`,
                    mask: true,
                })
                this.setState({
                    isLike: isLike === 1 ? 2 : 1,
                    articleDetail: {
                        banner: this.state.articleDetail.banner,
                        title: this.state.articleDetail.title,
                        content: this.state.articleDetail.content,
                        numberWatch: this.state.articleDetail.numberWatch,
                        createTime: this.state.articleDetail.createTime,
                        thumbUpNumber:
                            isLike === 1
                                ? this.state.articleDetail.thumbUpNumber - 1
                                : this.state.articleDetail.thumbUpNumber + 1,
                    },
                })
            },
        })
    }

    render() {
        const { relatedArticleList, articleDetail, isEnshrine, isLike } = this.state
        let richText = articleDetail.content.replace(/\<img src="\/uploads/gi, '<img src="' + BASEURL + '/uploads')
        richText = richText.replace(/\<img/gi, '<img style="width:300px;height:auto;display;block;" mode="aspectFill"')
        return (
            <View className={styles.ArticleDetailsMain}>
                <View className={styles.detailsImg}>
                    <View className={styles.userFavoriteShare}>
                        <View
                            onClick={() => {
                                this.handleCollection()
                            }}
                        >
                            {isEnshrine === 1 ? (
                                <Image className={styles.FavoriteIcon} src={Icons.favorited} />
                            ) : (
                                <Image className={styles.FavoriteIcon} src={Icons.favorite} />
                            )}
                        </View>

                        <Button openType="share" plain className={styles.shareIcon}>
                            <Image className={styles.ShareIcon} src={Icons.shareIcon} />
                        </Button>
                    </View>
                    <View className={styles.imgBox}>
                        <Image src={articleDetail.banner} mode="widthFix" />
                    </View>
                </View>
                <View className={styles.articleContent}>
                    <View className={styles.articleTitle}>{articleDetail.title}</View>
                    <View className={styles.articleInfo}>
                        <View className={styles.data}>发布时间：{articleDetail.createTime}</View>
                        <View className={styles.views}>
                            <View className={styles.views}>
                                <Image src={Icons.lookViews} className={styles.lookImg} />
                                <View className={styles.desc}>{articleDetail.numberWatch}</View>
                            </View>
                            <View className={styles.likes}>
                                <Image src={Icons.likeIcon} className={styles.lookImg} />
                                <View className={styles.desc}>{articleDetail.thumbUpNumber}</View>
                            </View>
                        </View>
                    </View>
                    <RichText className={styles.description} nodes={richText} />
                    <View className={styles.thumbsUp} onClick={() => this.handleLike()}>
                        {isLike === 1 ? (
                            <Image src={Icons.likeOn} className={styles.icon} mode="widthFix" />
                        ) : (
                            <Image src={Icons.likeOff} className={styles.icon} mode="widthFix" />
                        )}
                    </View>
                </View>
                <View className={styles.relatedArticles}>
                    <View className={styles.relatedTitle}>相关文章</View>
                    {relatedArticleList &&
                        relatedArticleList.length > 0 &&
                        relatedArticleList.map((item) => {
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
                </View>
            </View>
        )
    }
}

export default ArticleDetails
