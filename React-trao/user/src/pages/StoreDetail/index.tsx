import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StoreDetailProps, StoreDetailState } from './index.interface'
import styles from './StoreDetail.module.less'
// import TitleSession from '../../components/TitleSession/index'
import ShopItem from '../../components/ShopItem/index'
import { BASEURL } from '../../config/index'
import { Icons } from '../../assets/img/load'

@connect(({ StoreDetail }) => ({
    ...StoreDetail,
}))
class StoreDetail extends Component<StoreDetailProps, StoreDetailState> {
    config: Config = {
        navigationBarTitleText: '门店详情',
    }
    constructor(props: StoreDetailProps) {
        super(props)
        this.state = {
            currentIndex: 1,
            detailData: {},
            storeId: 0,
        }
    }

    componentDidMount() {
        const query = this.$router.params
        if (query.id) {
            this.setState({
                storeId: +query.id,
            })
            this.props.dispatch({
                type: 'StoreDetail/getShopDetail',
                params: { shopId: query.id },
                cb: (data) => {
                    data.isCollect = data.isEnshrine === 1
                    data.userEntityGoodsDomainList.forEach((item) => {
                        item.imageUrl = item.image
                    })
                    this.setState({ detailData: data })
                },
            })
        }
    }
    handleChange = (e) => {
        console.log(e.target.current)
        this.setState({ currentIndex: e.target.current + 1 })
    }
    // handleClickMore = () => {
    //     Taro.navigateTo({
    //         url: '/pages/SuitStore/index',
    //     })
    // }
    handlePhoneCall = () => {
        const { detailData } = this.state
        Taro.makePhoneCall({
            phoneNumber: detailData.phone,
        }).then((res) => {})
    }
    SwitchToPackageDetail = (id: number = 1) => {
        Taro.navigateTo({
            url: '/pages/PackageDetail/index?id=' + id,
        })
    }
    SwitchToGoodsDetail = (id: number = 1) => {
        Taro.navigateTo({
            url: '/pages/GoodsDetail/index?id=' + id,
        })
    }
    // 收藏or取消收藏
    handelCollect = () => {
        const { detailData, storeId } = this.state

        const personalInfo = Taro.getStorageSync('personalInfo')
        if (!detailData.isCollect) {
            this.props.dispatch({
                type: 'PackageDetail/collectPackage',
                params: {
                    domainId: storeId,
                    type: 4,
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
                    domainId: storeId,
                    type: 4,
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
        const { photoUrl } = detailData
        const urls = photoUrl.map((item) => {
            return BASEURL + item
        })
        Taro.previewImage({
            current, // 当前显示图片的http链接
            urls, // 需要预览的图片http链接列表
        })
    }
    render() {
        const { currentIndex, detailData } = this.state
        const { photoUrl } = detailData
        return (
            <View className={styles.StoreDetailMain}>
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
                        {currentIndex}/{photoUrl.length}
                    </View>
                    <Swiper
                        className={styles.swiperBox}
                        indicatorColor="#999"
                        indicatorActiveColor="#333"
                        circular
                        onChange={this.handleChange}
                    >
                        {photoUrl &&
                            photoUrl.length > 0 &&
                            photoUrl.map((item) => {
                                return (
                                    <SwiperItem key={item.file} onClick={() => this.handlePreviewImg(BASEURL + item)}>
                                        {/* <View className={styles.swiperItem}>1</View> */}
                                        <Image className={styles.swiperItemImg} src={BASEURL + item} />
                                    </SwiperItem>
                                )
                            })}
                    </Swiper>
                </View>
                {/* 价格 */}
                {/* 套餐描述 */}
                <View className={styles.storeInfo}>
                    <View className={styles.leftInfo}>
                        <View className={styles.topTitle}>{detailData.name}</View>
                        <View className={styles.bottomDesc}>
                            {detailData.province} {detailData.city} {detailData.area}
                        </View>
                        <View className={styles.bottomDesc}>{detailData.address}</View>
                    </View>
                    <View className={styles.rightBtn} onClick={this.handlePhoneCall}>
                        拨打电话
                    </View>
                </View>

                <View className={styles.TitleSessionMain}>
                    <View className={styles.titleSession}>
                        <View className={styles.titleBox}>
                            <View className={styles.leftBorder} />
                            <View className={styles.title}>我已购买</View>
                        </View>
                    </View>
                </View>
                {/* <TitleSession title="我已购买" /> */}
                {detailData.userEntityGoodsDomainList &&
                    detailData.userEntityGoodsDomainList.map((item) => {
                        return (
                            <View key={item.name} onClick={this.SwitchToGoodsDetail.bind(this, item.id)}>
                                <ShopItem
                                    shopImg={item.imageUrl}
                                    shopTitle={item.name}
                                    shopAddress=""
                                    shopPrice={item.marketPrice}
                                    propsStyles={{ marginBottom: '30rpx' }}
                                    efficacy={item.efficacy}
                                />
                            </View>
                        )
                    })}
                {detailData.userGoodsPackageResponses &&
                    detailData.userGoodsPackageResponses.map((item) => {
                        return (
                            <View key={item.name} onClick={this.SwitchToPackageDetail.bind(this, item.id)}>
                                <ShopItem
                                    shopImg={item.imageUrl}
                                    shopTitle={item.name}
                                    shopAddress=""
                                    shopPrice={item.marketPrice}
                                    propsStyles={{ marginBottom: '30rpx' }}
                                    efficacy={item.efficacy}
                                />
                            </View>
                        )
                    })}
                {/* <TitleSession title='优惠专区' />
                <ShopItem
                    shopImg={fitShop}
                    shopTitle='寇氏拔罐减肥（莘庄店）'
                    shopAddress='闵行区 莘浜路275号(靠近莘建支路)'
                    shopPrice={300}
                /> */}
                {/* 标题分割 */}
                <View className={styles.TitleSessionMain}>
                    <View className={styles.titleSession}>
                        <View className={styles.titleBox}>
                            <View className={styles.leftBorder} />
                            <View className={styles.title}>套餐推荐</View>
                        </View>
                    </View>
                </View>
                {/* <TitleSession title="套餐推荐" /> */}
                {detailData.goodsPackageResponses &&
                    detailData.goodsPackageResponses.map((item) => {
                        return (
                            <View key={item.name} onClick={this.SwitchToPackageDetail.bind(this, item.id)}>
                                <ShopItem
                                    shopImg={item.imageUrl}
                                    shopTitle={item.name}
                                    shopAddress=""
                                    shopPrice={item.marketPrice}
                                    propsStyles={{ marginBottom: '30rpx' }}
                                    efficacy={item.efficacy}
                                />
                            </View>
                        )
                    })}
                {detailData.goodsPackageResponses && detailData.goodsPackageResponses.length > 0 && (
                    <View className={styles.fixedBottom}>—— 暂时只有这么多啦 ——</View>
                )}
            </View>
        )
    }
}

export default StoreDetail
