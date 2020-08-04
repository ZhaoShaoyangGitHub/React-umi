import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { AtModal } from 'taro-ui'
import { View, Swiper, SwiperItem, Image, ScrollView, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PackageDetailProps, PackageDetailState } from './index.interface'
import styles from './PackageDetail.module.less'
import SelectToScroll from '../../components/SelectToScroll/index'
import ShopBottmBar from '../../components/ShopBottmBar/index'
import { BASEURL } from '../../config/index'
import ShopItem from '../../components/ShopItem/index'
import { Icons } from '../../assets/img/load'

@connect(({ GoodsDetail }) => ({
    ...GoodsDetail,
}))
class PackageDetail extends Component<PackageDetailProps, PackageDetailState> {
    config: Config = {
        navigationBarTitleText: '套餐详情',
    }
    constructor(props: PackageDetailProps) {
        super(props)
        this.state = {
            currentIndex: 1,
            PackDetailData: {
                projectResponses: [],
                goodsResponses: [],
            },
            scrollTopId: '',
            selectScrollHidden: true,
            packageId: 0,
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
        console.log(query)
        this.setState({
            packageId: Number.parseInt(query.id) || 0,
        })

        if (query.id || query.id == '0') {
            this.props.dispatch({
                type: 'PackageDetail/getPackDetail',
                params: { id: query.id, userId: query.userId },
                cb: (data) => {
                    data.isCollect = data.isEnshrine === 1
                    this.setState({
                        PackDetailData: data,
                    })
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
    handleChange = (e) => {
        this.setState({ currentIndex: e.target.current + 1 })
    }
    handleClickMore = () => {
        const { isLogin, packageId } = this.state
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
            url: '/pages/SuitStore/index?id=' + packageId + '&type=pack',
        })
    }
    handleSelectScroll = (id) => {
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

    handleScroll = (e) => {
        if (e.target.scrollTop > 50) {
            this.setState({ selectScrollHidden: false })
        } else {
            this.setState({ selectScrollHidden: true })
        }
    }

    // 收藏or取消收藏
    handelCollect = () => {
        const { PackDetailData, packageId, isLogin } = this.state
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
        const personalInfo = Taro.getStorageSync('personalInfo')
        if (!PackDetailData.isCollect) {
            this.props.dispatch({
                type: 'PackageDetail/collectPackage',
                params: {
                    domainId: packageId,
                    type: 1,
                    userId: JSON.parse(personalInfo).userId,
                },
                cb: () => {
                    this.setState({
                        PackDetailData: {
                            ...PackDetailData,
                            isCollect: true,
                        },
                    })
                },
            })
        } else {
            this.props.dispatch({
                type: 'PackageDetail/cancelCollectPackage',
                params: {
                    domainId: packageId,
                    type: 1,
                    userId: JSON.parse(personalInfo).userId,
                },
                cb: () => {
                    this.setState({
                        PackDetailData: {
                            ...PackDetailData,
                            isCollect: false,
                        },
                    })
                },
            })
        }
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
            isShowConfirmModal,
            PackDetailData,
            selectScrollHidden,
            scrollTopId,
            currentShopInfo,
            isLogin,
        } = this.state
        const {
            imageUrl,
            marketPrice,
            name,
            isCollect,
            efficacy,
            goodsResponses,
            projectResponses,
            originalPrice,
        } = PackDetailData
        const titleArr = [
            { title: '商品信息', id: 0 },
            { title: '适用门店', id: 1 },
            { title: '服务须知', id: 2 },
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
                <View className={styles.PackageDetailMain} id="zero">
                    <SelectToScroll
                        selectScrollHidden={selectScrollHidden}
                        handleSelectScroll={this.handleSelectScroll}
                        titleArr={titleArr}
                    />
                    <View className={styles.topGoodsSwiper}>
                        <View className={styles.userFavoriteShare}>
                            <Image
                                className={styles.FavoriteIcon}
                                src={isCollect ? Icons.favorited : Icons.favorite}
                                onClick={this.handelCollect}
                            />
                            <Image className={styles.ShareIcon} src={Icons.shareIcon} />
                            <Button openType="share" />
                        </View>
                        {/* <View className={styles.currentInfo}>
                            {currentIndex}/{imageUrl.length}
                            1/1
                        </View> */}
                        <Swiper
                            className={styles.swiperBox}
                            indicatorColor="#999"
                            indicatorActiveColor="#333"
                            circular
                            onChange={this.handleChange}
                        >
                            <SwiperItem>
                                {imageUrl && <Image className={styles.swiperItemImg} src={BASEURL + imageUrl} />}
                            </SwiperItem>
                            {/* {imageUrl.map(item => {
                                return (
                                    <SwiperItem key={item.file}>
                                        <Image className={styles.swiperItemImg} src={item} />
                                    </SwiperItem>
                                )
                                })} */}
                        </Swiper>
                    </View>
                    {/* 价格 */}
                    <View className={styles.priceBox}>
                        <View className={styles.priceIcon}>¥</View>
                        <View className={styles.priceInfo}>{marketPrice}</View>
                        {originalPrice && <Text className={styles.originalPrice}>￥{originalPrice}</Text>}
                    </View>
                    {/* 套餐描述 */}
                    <View className={styles.productDesc}>
                        <View className={styles.descItem}>
                            <View className={styles.descItemKey}>套餐名称：</View>
                            <View className={styles.descItemValue}>{name}</View>
                        </View>
                        <View className={styles.descItem}>
                            <View className={styles.descItemKey}>服务功效：</View>
                            <View className={styles.descItemValue}>{efficacy}</View>
                        </View>
                        {projectResponses.length > 0 && (
                            <View className={styles.descItem}>
                                <View className={styles.descItemKey}>服务项目：</View>
                                <View className={styles.descItemValue}>
                                    {projectResponses.map((item) => (
                                        <Text key={item}>{item.projectName + ' '} </Text>
                                    ))}
                                </View>
                            </View>
                        )}
                        {goodsResponses.length > 0 && (
                            <View className={styles.descItem}>
                                <View className={styles.descItemKey}>使用产品：</View>
                                <View className={styles.descItemValue}>
                                    {goodsResponses.map((item) => (
                                        <Text key={item}>{item.name + ' '} </Text>
                                    ))}
                                </View>
                            </View>
                        )}
                        {/* <View className={styles.descItem}>
                            <View className={styles.descItemKey}>服务时间：</View>
                            <View className={styles.descItemValue}>60分钟</View>
                        </View> */}
                    </View>
                    {/* 标题分割 */}
                    <View id="suitshop">
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
                    </View>

                    {/* 适用门店 marketAstrictShop */}
                    <ShopItem
                        storeId={
                            PackDetailData && PackDetailData.shopResponses && PackDetailData.shopResponses.length
                                ? currentShopInfo.id
                                : null
                        }
                        shopImg={
                            PackDetailData && PackDetailData.shopResponses && PackDetailData.shopResponses.length
                                ? currentShopInfo.coverUrl[0]
                                : null
                        }
                        shopTitle={
                            PackDetailData && PackDetailData.shopResponses && PackDetailData.shopResponses.length
                                ? currentShopInfo.name
                                : null
                        }
                        shopAddress={
                            PackDetailData && PackDetailData.shopResponses && PackDetailData.shopResponses.length
                                ? currentShopInfo.province + ' ' + currentShopInfo.city + ' ' + currentShopInfo.area
                                : ''
                        }
                        detailAddress={currentShopInfo.address}
                        onHandleSuitClick={this.handleSuitClick}
                    />
                    {/* 标题分割 */}

                    <View className={styles.TitleSessionMain}>
                        <View className={styles.titleSession}>
                            <View className={styles.titleBox}>
                                <View className={styles.leftBorder} />
                                <View className={styles.title}>服务须知</View>
                            </View>
                        </View>
                    </View>
                    {/* <View id="serviceknow">
                        <TitleSession title="服务须知" />
                    </View> */}
                    <View className={styles.serverInfo}>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>可用总数：</View>
                            <View className={styles.desc}>
                                {PackDetailData.validNumber}
                                {PackDetailData.type.description}
                            </View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>有效期限：</View>
                            <View className={styles.desc}>
                                {PackDetailData.effectiveDate
                                    ? moment(PackDetailData.effectiveDate).format('YYYY-MM-DD')
                                    : ''}
                            </View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>适宜人群：</View>
                            <View className={styles.desc}>{PackDetailData.crowdSuits}</View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>适宜人数：</View>
                            <View className={styles.desc}>{PackDetailData.suitsNumber || 0}人</View>
                        </View>
                        <View className={styles.serverItem}>
                            <View className={styles.title}>说明：</View>
                            <View className={styles.desc}>{PackDetailData.instructions}</View>
                        </View>
                    </View>
                </View>
                {/* 加入购物车 底部tabBar */}
                {isLogin && (
                    <ShopBottmBar
                        addCart={() => this.showModal('add')}
                        goCheck={() => this.showModal('buy')}
                        goCart={this.handleGoCart}
                    />
                )}

                <AtModal isOpened={isShowConfirmModal} className={styles.modal} onClose={this.hideModal}>
                    <View className={styles.header}>购买信息</View>
                    <View className={styles.content}>
                        <View className={styles.projectItem}>
                            <Text>套餐名称：</Text>
                            <Text>{name}</Text>
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
        Taro.navigateTo({
            url: '/pages/StoreDetail/index?id=' + storeId,
        })
    }

    handleAddCart = () => {
        const { PackDetailData, currentShopInfo } = this.state
        this.props.dispatch({
            type: 'PackageDetail/addGoodToCart',
            params: {
                amount: 1,
                createTime: '',
                goodsId: PackDetailData.id,
                goodsType: 2,
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
        const { PackDetailData, currentShopInfo } = this.state
        this.props.dispatch({
            type: 'OrderConfirm/getGoodsData',
            payload: {
                amount: 1,
                goodsId: PackDetailData.id,
                goodsType: 2,
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
        Taro.navigateTo({
            url: '/pages/Cart/index',
        })
    }
}

export default PackageDetail
