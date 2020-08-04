import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import { AtTabs, AtModal, AtModalHeader, AtModalAction, AtModalContent } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { HomeProps, HomeState } from './index.interface'
import styles from './Home.module.less'
import { Icons } from '../../assets/img/load'
import ArticleItem from '../../components/ArticleItem/index'
import moment from 'moment'

@connect(({ Home, loading }) => ({
    ...Home,
    loading,
}))
class Home extends Component<HomeProps, HomeState> {
    config: Config = {
        navigationBarTitleText: '首页',
        onReachBottomDistance: 10,
    }
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            NavOffsetTop: 200,
            isActivated: false,
            current: 0,
            articleCategoryList: [],
            articleList: [],
            beginAppointment: null,
            pageInfo: {
                pageIndex: 1,
                totalPage: 1,
            },
            isShowServiceConfirm: false,
            isShowComment: false,
            isLogin: false, //用户是否登录状态
            userId: 0, //用户默认id，未登录默认是0
        }
    }

    componentDidShow() {
        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                this.props.dispatch({
                    type: 'Home/getIsConfirmOrder',
                    cb: (data) => {
                        if (data) {
                            Taro.hideTabBar({})
                        }
                        this.setState({
                            isShowServiceConfirm: data,
                        })
                    },
                })
                this.getAppointment()
                this.setState({
                    isLogin: true,
                })
            }
            var personInfo = Taro.getStorageSync('personalInfo')
            if (personInfo) {
                this.setState({
                    userId: JSON.parse(personInfo).userId,
                })
            }
        } catch (e) {
            // Do something when catch error
        }
        this.initData()
    }
    componentDidMount() {
        this.getNavOffsetTop()
    }
    onReachBottom() {
        const { pageInfo, current } = this.state
        if (pageInfo.pageIndex < pageInfo.totalPage) {
            pageInfo.pageIndex++
            this.getArticleList(current)
        }
    }
    initData = () => {
        this.props.dispatch({
            type: 'Home/getArticleCategory',
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
        this.getAreaInfo()
    }
    getAreaInfo = () => {
        this.props.dispatch({
            type: 'Home/areaData',
            cb: (data) => {
                Taro.setStorageSync('areaInfo', data)
            },
        })
    }
    getAppointment = () => {
        this.props.dispatch({
            type: 'Home/getAppointment',
            cb: (data) => {
                if (data) {
                    this.setState({
                        beginAppointment: data,
                    })
                }
            },
        })
    }
    handleClick(value) {
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

    closeAppointmentWarning = () => {
        this.setState({
            beginAppointment: null,
        })
    }

    getArticleList = (categoryId: number = 0) => {
        const { pageInfo, articleList } = this.state
        let payload: any = { pageIndex: pageInfo.pageIndex }
        if (categoryId !== 0) {
            payload.categoryId = categoryId
        }
        this.props.dispatch({
            type: 'Home/getArticleList',
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
    goShopSearch = () => {
        Taro.navigateTo({
            url: '/pages/ShopSearch/index?id=3',
        })
    }
    onPageScroll = (res) => {
        if (res.scrollTop >= this.state.NavOffsetTop) {
            this.setState({
                isActivated: true,
            })
        } else {
            this.setState({
                isActivated: false,
            })
        }
    }
    getNavOffsetTop = () => {
        const query = Taro.createSelectorQuery()
        query.select('#navWrapper').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            res[0].top
            res[0].scrollTop
            this.setState({
                NavOffsetTop: res[0].top,
            })
        })
    }

    // 关闭弹窗
    hideModal = () => {
        Taro.showTabBar({})
        this.setState({
            isShowServiceConfirm: false,
            isShowComment: false,
        })
    }

    // 跳转确认服务
    handleToConfirm = () => {
        Taro.showTabBar({})
        this.props.dispatch({
            type: 'Home/confirmService',
            cb: (data) => {
                Taro.showToast({
                    title: '确认服务成功',
                })
                this.setState({ isShowServiceConfirm: false })
            },
        })
    }

    //跳转其他页面
    goOtherPage = (path) => {
        const { isLogin } = this.state
        if (isLogin) {
            Taro.navigateTo({
                url: path,
            })
        } else {
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
        }
    }

    render() {
        const {
            articleCategoryList,
            articleList,
            pageInfo,
            isActivated,
            beginAppointment,
            isShowServiceConfirm,
            isShowComment,
            userId,
        } = this.state
        return (
            <View className={styles.HomeMain}>
                {beginAppointment && (
                    <View className={styles.subscribeClock}>
                        <Image className={styles.subscribeClockImg} src={Icons.subscribeClock} />
                        <View className={styles.subscribeClockInfo}>
                            您在{moment(beginAppointment.appointmentTime).format('YYYY年MM月DD日')}有一次
                            {beginAppointment.projectAppointmentResponses &&
                                beginAppointment.projectAppointmentResponses.length &&
                                beginAppointment.projectAppointmentResponses[0].packageName}
                            待服务
                        </View>
                        <Image
                            src={Icons.homeClose}
                            className={styles.subscribeClockClose}
                            onClick={this.closeAppointmentWarning}
                        />
                    </View>
                )}
                <View className={styles.topHeader} onClick={() => this.goShopSearch()}>
                    <Image className={styles.searchIcon} src={Icons.searchIcon} />
                    <View className={styles.searchInput}>请输入商品/门店/文章关键词</View>
                </View>
                <View className={styles.swiperWrap}>
                    <Swiper
                        className={styles.swiperBox}
                        indicatorColor="#999"
                        indicatorActiveColor="#333"
                        circular
                        indicatorDots
                        autoplay
                    >
                        <SwiperItem>
                            <View className={styles.swiperItem}>
                                <Image className={styles.swiperItemImg} src={Icons.bannerMock} />
                            </View>
                        </SwiperItem>
                    </Swiper>
                </View>

                <View className={styles.middleMenu}>
                    <View className={styles.menuItem}>
                        <View
                            className={styles.singleMenuItem}
                            onClick={() => {
                                this.goOtherPage('/pages/HealthRecords/index')
                            }}
                        >
                            <Image className={styles.menuImg} src={Icons.healthyFiles} />
                            <View className={styles.menuInfo}>健康档案</View>
                        </View>
                    </View>
                    <View className={styles.menuItem}>
                        <View
                            className={styles.singleMenuItem}
                            onClick={() => {
                                this.goOtherPage('/pages/PhysicalSelfTest/index')
                            }}
                        >
                            <Image className={styles.menuImg} src={Icons.healthyFiles} />
                            <View className={styles.menuInfo}>体质自测</View>
                        </View>
                    </View>
                </View>

                <View id="navWrapper" className={styles.navWrapper}>
                    <AtTabs
                        current={this.state.current}
                        scroll={false}
                        tabList={articleCategoryList}
                        onClick={this.handleClick.bind(this)}
                        className={isActivated ? styles.activeNav : ''}
                    ></AtTabs>
                </View>
                <View className={styles.articleList}>
                    {articleList &&
                        articleList.length > 0 &&
                        articleList.map((item) => {
                            return (
                                <ArticleItem
                                    onHandleClick={() => {
                                        Taro.navigateTo({
                                            url: `/pages/ArticleDetails/index?id=${item.id}&userId=${userId}`,
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
                        {pageInfo.pageIndex <= pageInfo.totalPage || pageInfo.totalPage === 0
                            ? '没有更多数据了~'
                            : '加载中···'}
                    </View>
                </View>

                {/* <AtModal
                    isOpened
                    title="标题"
                    confirmText="去评价"
                    onClose={this.handleClose}
                    onConfirm={this.handleConfirm}
                    content="欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室"
                /> */}
                <AtModal isOpened={isShowServiceConfirm} className={styles.modal} onClose={this.hideModal}>
                    <View className={styles.header}>服务待确认</View>
                    <View className={styles.content}>
                        {/* <View className={styles.projectItem}>
                            <Text>服务时间：</Text>
                            <Text>ddd</Text>
                        </View>
                        <View className={styles.projectItem}>
                            <Text>服务项目：</Text>
                            <Text>ddd</Text>
                        </View>
                        <View className={styles.projectItem}>
                            <Text>剩余次数：</Text>
                            <Text>ddd</Text>
                        </View> */}
                        <View className={styles.tips}>您有服务待确认</View>
                    </View>
                    <View className={styles.button} onClick={this.handleToConfirm}>
                        确认服务
                    </View>
                    {/* <Image className={styles.closeIcon} src="" /> */}
                </AtModal>

                <AtModal isOpened={isShowComment} className={styles.modal}>
                    <View className={styles.header}>服务已结束</View>
                    <View className={styles.content}>
                        <View className={styles.tips}>您有服务待评价</View>
                    </View>
                    <View className={styles.button}>去评价</View>
                    {/* <Image className={styles.closeIcon} src="" /> */}
                </AtModal>
            </View>
        )
    }
}

export default Home
