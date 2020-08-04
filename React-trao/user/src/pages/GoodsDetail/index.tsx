import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, ScrollView, Button, Text } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { GoodsDetailProps, GoodsDetailState } from './index.interface'
import styles from './GoodsDetail.module.less'
import SelectToScroll from '../../components/SelectToScroll/index'
// import TitleSession from '../../components/TitleSession/index'
import { BASEURL } from '../../config/index'
import ShopBottmBar from '../../components/ShopBottmBar/index'
import ShopItem from '../../components/ShopItem/index'
import { Icons } from '../../assets/img/load'

@connect(({ GoodsDetail }) => ({
    ...GoodsDetail,
}))
class GoodsDetail extends Component<GoodsDetailProps, GoodsDetailState> {
    config: Config = {
        navigationBarTitleText: '商品详情',
    }
    constructor(props: GoodsDetailProps) {
        super(props)
        this.state = {
            currentIndex: 1,
            detailData: {
                photoImages: [],
            },
            scrollTopId: '',
            selectScrollHidden: true,
            goodsId: 0,
            currentShopInfo: {
                coverUrl: [],
                id: 0,
                city: '',
                province: '',
                area: '',
                name: '',
                address: '',
            },
            isShowConfirmModal: false,
            confirmType: 'buy', // buy 立即购买  add 加入购物车
            isLogin: false,
        }
    }

    componentDidShow() {
        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                this.setState({
                    isLogin: true,
                })
            }
        } catch (e) {}
        const query = this.$router.params
        // const query = { id: 3 }
        this.setState({
            goodsId: Number.parseInt(query.id, 10) || 0,
        })
        if (query.id) {
            this.props.dispatch({
                type: 'GoodsDetail/getGoodsDetail',
                params: { id: query.id, userId: query.userId },
                cb: (data) => {
                    console.log(data)
                    data.isCollect = data.isEnshrine === 1
                    this.setState({ detailData: data })
                    this.getCurrentShopInfo(data.shopResponses)
                },
            })
        }
    }
    getCurrentShopInfo = (shopResponses) => {
        if (Taro.getStorageSync('packageShopId')) {
            const id = Number.parseInt(Taro.getStorageSync('packageShopId'), 10)
            shopResponses.forEach((item) => {
                if (item.id === id) {
                    this.setState(
                        {
                            currentShopInfo: item,
                        },
                        () => {
                            Taro.removeStorageSync('packageShopId')
                        },
                    )
                }
            })
        } else {
            this.setState({
                currentShopInfo: shopResponses[0],
            })
        }
    }
    handleSelectScroll = (id) => {
        console.log(id)
        switch (id) {
            case 0:
                this.setState({ scrollTopId: 'zero' })
                break
            case 1:
                this.setState({ scrollTopId: 'suitshop' })
                break
            case 2:
                this.setState({ scrollTopId: 'serviceknow' })
                break
            default:
                this.setState({ scrollTopId: 'zero' })
        }
    }

    handleChange = (e) => {
        console.log(e.target.current)
        this.setState({ currentIndex: e.target.current + 1 })
    }
    handleClickMore = () => {
        const { goodsId, isLogin } = this.state
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
        Taro.navigateTo({
            url: '/pages/SuitStore/index?id=' + goodsId + '&type=goods',
        })
    }

    handleScroll = (e) => {
        if (e.target.scrollTop > 50) {
            this.setState({ selectScrollHidden: false })
        } else {
            this.setState({ selectScrollHidden: true })
        }
    }

    // 收藏or取消收藏
    handelCollect = () => {
        const { detailData, goodsId } = this.state

        const personalInfo = Taro.getStorageSync('personalInfo')
        if (!detailData.isCollect) {
            this.props.dispatch({
                type: 'PackageDetail/collectPackage',
                params: {
                    domainId: goodsId,
                    type: 2,
                    userId: JSON.parse(personalInfo).userId,
                },
                cb: (data) => {
                    this.setState({
                        detailData: {
                            ...detailData,
                            isCollect: true,
                        },
                    })
                },
            })
        } else {
            this.props.dispatch({
                type: 'PackageDetail/cancelCollectPackage',
                params: {
                    domainId: goodsId,
                    type: 2,
                    userId: JSON.parse(personalInfo).userId,
                },
                cb: (data) => {
                    this.setState({
                        detailData: {
                            ...detailData,
                            isCollect: false,
                        },
                    })
                },
            })
        }
    }
    // 预览 banner
    handlePreviewImg = (current) => {
        const { detailData } = this.state
        const { photoImages } = detailData
        const urls = photoImages.map((item) => {
            return BASEURL + item
        })
        Taro.previewImage({
            current, // 当前显示图片的http链接
            urls, // 需要预览的图片http链接列表
        })
    }

    hideModal = () => {
        this.setState({
            isShowConfirmModal: false,
        })
    }

    showModal = (confirmType) => {
        this.setState({
            isShowConfirmModal: true,
            confirmType,
        })
    }

    handleToConfirm = () => {
        const { confirmType } = this.state
        this.setState({
            isShowConfirmModal: false,
        })
        if (confirmType === 'buy') {
            this.handleGoCheck()
        } else {
            this.handleAddCart()
        }
    }
    render() {
        const {
            currentIndex,
            detailData,
            selectScrollHidden,
            scrollTopId,
            currentShopInfo,
            isShowConfirmModal,
            confirmType,
            isLogin,
        } = this.state
        const titleArr = [
            { title: '商品信息', id: 0 },
            { title: '适用门店', id: 1 },
            { title: '购买须知', id: 2 },
        ]
        return (
            <ScrollView
                // upperThreshold={50}
                scrollY
                scrollWithAnimation
                scrollIntoView={scrollTopId}
                scrollTop={0}
                style={{ height: '100vh' }}
                onScroll={this.handleScroll}
            >
                <View className={styles.goodsDetailMain} id="zero">
                    <SelectToScroll
                        selectScrollHidden={selectScrollHidden}
                        handleSelectScroll={this.handleSelectScroll}
                        titleArr={titleArr}
                    />
                    <View className={styles.topGoodsSwiper}>
                        <View className={styles.userFavoriteShare}>
                            <Image
                                className={styles.FavoriteIcon}
                                src={detailData.isCollect ? Icons.favorited : Icons.favorite}
                                onClick={this.handelCollect}
                            />
                            <Image className={styles.ShareIcon} src={Icons.shareIcon} />
                            <Button openType="share" />
                        </View>
                        <View className={styles.currentInfo}>
                            {currentIndex}/{detailData.photoImages.length}
                        </View>
                        <Swiper
                            className={styles.swiperBox}
                            indicatorColor="#999"
                            indicatorActiveColor="#333"
                            circular
                            onChange={this.handleChange}
                        >
                            {detailData.photoImages.map((item) => (
                                <SwiperItem
                                    onClick={() => {
                                        this.handlePreviewImg(BASEURL + item)
                                    }}
                                    key={item}
                                >
                                    <Image className={styles.swiperItemImg} src={BASEURL + item} />
                                </SwiperItem>
                            ))}
                        </Swiper>
                    </View>
                    {/* 价格 */}
                    <View className={styles.priceBox}>
                        <View className={styles.priceIcon}>¥</View>
                        <View className={styles.priceInfo}>{detailData.marketPrice}</View>
                    </View>
                    {/* 套餐描述 */}
                    <View className={styles.productDesc}>
                        <View className={styles.descItem}>
                            <View className={styles.descItemKey}>套餐名称：</View>
                            <View className={styles.descItemValue}>{detailData.name}</View>
                        </View>
                        {/* <View className={styles.descItem}>
                            <View className={styles.descItemKey}>服务项目：</View>
                            <View className={styles.descItemValue}>精油SPA x10次 针灸减肥 x10次</View>
                        </View> */}
                        <View className={styles.descItem}>
                            <View className={styles.descItemKey}>商品功效：</View>
                            <View className={styles.descItemValue}>{detailData.efficacy}</View>
                        </View>
                        <View className={styles.descItem}>
                            <View className={styles.descItemKey}>使用产品：</View>
                            <View className={styles.descItemValue}>
                                {detailData.goodsDomains &&
                                    detailData.goodsDomains.map((item) => (
                                        <Text key={item.name}>{item.name + ' '}</Text>
                                    ))}
                            </View>
                        </View>
                        {/* <View className={styles.descItem}>
                        <View className={styles.descItemKey}>服务时间：</View>
                        <View className={styles.descItemValue}>60分钟</View>
                    </View> */}
                    </View>
                    {/* 标题分割 */}
                    <View className={styles.TitleSessionMain}>
                        <View className={styles.titleSession}>
                            <View className={styles.titleBox}>
                                <View className={styles.leftBorder} />
                                <View className={styles.title}>选择门店</View>
                            </View>
                            <View
                                className={styles.findMore}
                                onClick={() => {
                                    this.handleClickMore()
                                }}
                            >
                                <View className={styles.findMoreInfo}>查看更多</View>
                                <Image className={styles.findMoreImg} src={Icons.findMore} />
                            </View>
                        </View>
                    </View>
                    {/* <TitleSession title="适用门店" handleMore={this.handleClickMore} /> */}
                    {/* 适用门店 */}
                    <ShopItem
                        storeId={
                            detailData && detailData.shopResponses && detailData.shopResponses.length
                                ? currentShopInfo.id
                                : null
                        }
                        shopImg={
                            detailData && detailData.shopResponses && detailData.shopResponses.length
                                ? currentShopInfo.coverUrl[0]
                                : null
                        }
                        shopTitle={
                            detailData && detailData.shopResponses && detailData.shopResponses.length
                                ? currentShopInfo.name
                                : null
                        }
                        shopAddress={
                            detailData && detailData.shopResponses && detailData.shopResponses.length
                                ? currentShopInfo.province + ' ' + currentShopInfo.city + ' ' + currentShopInfo.area
                                : ''
                        }
                        detailAddress={
                            detailData &&
                            detailData.shopResponses &&
                            detailData.shopResponses.length > 0 &&
                            currentShopInfo.address
                        }
                        onHandleSuitClick={this.handleSuitClick}
                    />
                    {/* 标题分割 */}
                    <View className={styles.TitleSessionMain}>
                        <View className={styles.titleSession}>
                            <View className={styles.titleBox}>
                                <View className={styles.leftBorder} />
                                <View className={styles.title}>购买须知</View>
                            </View>
                        </View>
                    </View>
                    {/* <TitleSession title="购买须知" /> */}
                    <View className={styles.serverInfo}>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>有效期：</View>
                            <View className={styles.desc}>2019-10-18</View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>适宜人群：</View>
                            <View className={styles.desc}>
                                老少咸宜，都可以做，主要面对压力大大人群，越做身体越棒棒哦～
                            </View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>适宜人数：</View>
                            <View className={styles.desc}>1人</View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>说明：</View>
                            <View className={styles.desc}>男性顾客多加收50元</View>
                        </View>
                    </View>
                    {/* 加入购物车 底部tabBar */}
                    {isLogin && (
                        <ShopBottmBar
                            addCart={this.handleAddCart}
                            goCheck={this.handleGoCheck}
                            goCart={this.handleGoCart}
                        />
                    )}
                </View>

                <AtModal isOpened={isShowConfirmModal} className={styles.modal} onClose={this.hideModal}>
                    <View className={styles.header}>购买信息</View>
                    <View className={styles.content}>
                        <View className={styles.projectItem}>
                            <Text>商品名称：</Text>
                            <Text>{detailData.name}</Text>
                        </View>
                        <View className={styles.projectItem}>
                            <Text>使用门店：</Text>
                            <Text>{currentShopInfo.name}</Text>
                        </View>
                    </View>
                    <View className={styles.button} onClick={this.handleToConfirm}>
                        确认
                    </View>
                    {/* <Image className={styles.closeIcon} src="" /> */}
                </AtModal>
            </ScrollView>
        )
    }
    handleSuitClick = (storeId) => {
        console.log('storeId:', storeId)
        Taro.navigateTo({
            url: '/pages/StoreDetail/index?id=' + storeId,
        })
    }
    handleAddCart = () => {
        console.log('添加购物车')
        const { currentShopInfo } = this.state
        const { detailData } = this.state
        this.props.dispatch({
            type: 'PackageDetail/addGoodToCart',
            params: {
                amount: 1,
                createTime: '',
                goodsId: detailData.id,
                goodsType: 1,
                shopId: currentShopInfo.id,
                userId: 0,
            },
            cb: (message, id) => {
                Taro.showToast({
                    title: message || '加入购物车成功',
                    icon: 'none',
                    mask: true,
                    duration: 1500,
                })
            },
        })
    }
    handleGoCheck = () => {
        const { currentShopInfo } = this.state
        const { detailData } = this.state
        this.props.dispatch({
            type: 'OrderConfirm/getGoodsData',
            payload: {
                amount: 1,
                goodsId: detailData.id,
                goodsType: 1,
                shopId: currentShopInfo.id,
            },
            callback: () => {
                this.props.dispatch({
                    type: 'OrderConfirm/save',
                    payload: {
                        currentAddress: {},
                    },
                })
                Taro.navigateTo({
                    url: '/pages/OrderConfirm/index',
                })
            },
        })
    }
    handleGoCart = () => {
        console.log('去购物车')
        Taro.navigateTo({
            url: '/pages/Cart/index',
        })
    }
}

export default GoodsDetail
