import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'
import { AtFab } from 'taro-ui'
import ShopItem from '../../components/ShopItem/index'
import { ShopmallProps, ShopmallState } from './index.interface'
import { Icons, shopMall } from '../../assets/img/load'
import Price from '../../components/Price/index'
import styles from './shopmall.module.less'

@connect(({ ShopMall, loading }) => ({
    ...ShopMall,
    loading,
}))
class Shopmall extends Component<ShopmallProps, ShopmallState> {
    config: Taro.Config = {
        navigationBarTitleText: '商城',
    }
    constructor(props: ShopmallProps) {
        super(props)
        this.state = {
            city: '上海市',
            packageList: [],
            cats: [
                {
                    title: '全部',
                    id: 0,
                },
                {
                    title: '胸部',
                    id: 1,
                },
                {
                    title: '减肥',
                    id: 2,
                },
                {
                    title: '妇科',
                    id: 3,
                },
                {
                    title: '优惠',
                    id: 4,
                },
            ],
            currentCat: '',
            list: [],
            isLogin: false, //用户是否登录状态
            userId: 0,
        }
    }

    componentDidShow() {
        // Taro.getLocation({
        //     type: 'gcj02',
        //     isHighAccuracy: true,
        //     success(res) {
        //         Taro.setStorageSync('currentLocationInfo', JSON.stringify(res))
        //         console.log(res)
        //     },
        //     fail(res) {
        //         Taro.setStorageSync(
        //             'currentLocationInfo',
        //             JSON.stringify({
        //                 accuracy: 65,
        //                 errMsg: 'getLocation:ok',
        //                 horizontalAccuracy: 65,
        //                 latitude: 31.25956,
        //                 longitude: 121.52609,
        //                 speed: -1,
        //                 verticalAccuracy: 65,
        //             }),
        //         )
        //     },
        // })

        this.props.dispatch({
            type: 'ShopMall/getPackageCategory',
        })
        this.getList()

        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                this.props.dispatch({
                    type: 'ShopMall/getCartQuantity',
                })
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
        } catch (e) {}
    }

    getList = () => {
        const { currentCat } = this.state
        if (currentCat === '') {
            this.props.dispatch({
                type: 'ShopSearch/packageSearch',
                params: { pageIndex: 1, pageSize: 50, keyword: '', categoryId: currentCat },
                cb: (data) => {
                    this.setState({ packageList: data.list }, () => {
                        console.log('搜索数据', this.state.packageList)
                    })
                },
            })
        } else {
            this.props.dispatch({
                type: 'ShopSearch/goodsSearch',
                params: { pageIndex: 1, pageSize: 50, keyword: '', categoryId: currentCat },
                cb: (data) => {
                    data.list.forEach((item) => {
                        item.imageUrl = item.image
                    })
                    this.setState({ packageList: data.list }, () => {
                        console.log('搜索数据', this.state.packageList)
                    })
                },
            })
        }
    }

    handleCurrentCatChange = (catId: number | string): void => {
        this.setState(
            {
                currentCat: catId,
            },
            () => {
                this.getList()
            },
        )
    }
    handleCityClick = (): void => {
        console.log('跳转选择城市')
        Taro.navigateTo({
            url: '/pages/LocateList/index?params=上海市',
        })
    }
    handleSearchClick = (): void => {
        Taro.navigateTo({
            url: '/pages/ShopSearch/index?id=0',
        })
    }
    handleLocateClick = (): void => {
        Taro.navigateTo({
            url: '/pages/ShopMap/index',
        })
    }
    handleActivityClick = (activity: string): void => {
        console.log('跳转活动' + activity)
    }
    handleGoodsClick = (id: number): void => {
        Taro.navigateTo({
            url: `/pages/GoodsDetail/index?id=${id}&userId=${this.state.userId}`,
        })
    }
    onButtonClick = () => {
        Taro.navigateTo({
            url: '/pages/Cart/index',
        })
    }
    handleSwitch = (id, type) => {
        switch (type) {
            case 'pack':
                Taro.navigateTo({
                    url: `/pages/PackageDetail/index?id=${id}&userId=${this.state.userId}`,
                })
                break
            case 'goods':
                Taro.navigateTo({
                    url: `/pages/GoodsDetail/index?id=${id}&userId=${this.state.userId}`,
                })
                break
            default:
                return
        }
    }

    render() {
        const { city, cats, currentCat, list, packageList, isLogin } = this.state
        const { cartQuantity, packageCategoryList } = this.props
        return (
            <View className={styles.shopmallMain}>
                <View className={styles.filterBlock}>
                    {/* <View className={styles.cityBlock} onClick={this.handleCityClick}>
                        <Text className={styles.cityText}>{city}</Text>
                        <View className={styles.iconWrapper}>
                            <Image src={shopMall.downArray} className={styles.cityIcon} />
                        </View>
                    </View> */}
                    <View className={styles.searchBlock} onClick={this.handleSearchClick}>
                        <View className={styles.iconWrapper}>
                            <Image src={Icons.searchIcon} className={styles.searchIcon} />
                        </View>
                        <Text className={styles.searchText}>请输入商品/门店关键词</Text>
                    </View>
                    {/* <View className={styles.locateBlock} onClick={this.handleLocateClick}>
                        <View className={styles.iconWrapper}>
                            <Image src={shopMall.locate} className={styles.locateIcon} />
                        </View>
                    </View> */}
                </View>
                <View className={styles.activityBlock}>
                    {/* <View className={styles.left} onClick={() => this.handleActivityClick('限时秒杀')}>
                        <Text className={styles.title}>限时秒杀</Text>
                        <Text className={styles.subTitle}>限时秒杀</Text>
                        <Image src={shopMall.activityLeft} className={styles.activityLeftIcon} />
                    </View>
                    <View className={styles.right}>
                        <View className={styles.top} onClick={() => this.handleActivityClick('拼团')}>
                            <Text className={styles.title}>拼团</Text>
                            <Text className={styles.subTitle}>限时秒杀</Text>
                            <Image src={shopMall.activityTop} className={styles.activityTopIcon} />
                        </View>
                        <View className={styles.bottom} onClick={() => this.handleActivityClick('砍价')}>
                            <Text className={styles.title}>砍价</Text>
                            <Text className={styles.subTitle}>限时秒杀</Text>
                            <Image src={shopMall.activityBottom} className={styles.activityBottomIcon} />
                        </View>
                    </View> */}
                    <Image className={styles.banner} src={Icons.bannerMock} />
                </View>
                <View className={styles.TabBlock}>
                    <View className={styles.catsWrapper}>
                        {packageCategoryList.map((cat) => {
                            return (
                                <View
                                    className={styles.catWrapper}
                                    key={cat.id}
                                    onClick={() => this.handleCurrentCatChange(cat.id)}
                                >
                                    <Text className={classNames(styles.cat, currentCat === cat.id && styles.activeCat)}>
                                        {cat.name}
                                    </Text>
                                    {currentCat === cat.id && <View className={styles.activeBorder} />}
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View className={styles.listBlock}>
                    {packageList.map((item) => {
                        return (
                            <ShopItem
                                key={item.id}
                                onHandleClick={this.handleSwitch.bind(
                                    this,
                                    item.id,
                                    currentCat === '' ? 'pack' : 'goods',
                                )}
                                shopImg={item.imageUrl}
                                shopTitle={item.name}
                                shopAddress={''}
                                efficacy={item.efficacy}
                                // shopPhoneNum={item.phone}
                                shopPrice={item.marketPrice}
                                originalPrice={item.originalPrice}
                                propsStyles={{ marginBottom: '30rpx' }}
                            />
                        )
                    })}
                </View>
                {isLogin && (
                    <View className={styles.fixedButton}>
                        {cartQuantity && (
                            <View className={styles.badge}>{Number(cartQuantity) > 99 ? '99+' : cartQuantity}</View>
                        )}
                        <AtFab onClick={() => this.onButtonClick()}>
                            <Text className="at-fab__icon at-icon at-icon-menu " />
                        </AtFab>
                    </View>
                )}
            </View>
        )
    }
}

export default Shopmall
