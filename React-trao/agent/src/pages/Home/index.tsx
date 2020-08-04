import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { HomeProps, HomeState } from './index.interface'
import { HomeImages, publicImages } from '../../assets/img/load'
import styles from './Home.module.less'

@connect(({ Home, ChooseStore }) => ({
    ...Home,
    ...ChooseStore,
}))
class Home extends Component<HomeProps, HomeState> {
    config: Config = {
        navigationBarTitleText: '荣月代理商户',
    }
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            storeId: 0,
            storeName: '',
            shopNumber: 0,
            tradeAmount: 0,
            tradeCount: 0,
        }
    }

    public menuList = [
        { imgUrl: HomeImages.selectIcon1, title: '我的门店', id: 0 },
        { imgUrl: HomeImages.selectIcon7, title: '我的会员', id: 1 },
        // { imgUrl: HomeImages.selectIcon3, title: '货品库存', id: 2 },
        { imgUrl: HomeImages.selectIcon4, title: '销售订单', id: 3 },
        { imgUrl: HomeImages.selectIcon5, title: '加盟商订单', id: 4 },
        { imgUrl: HomeImages.selectIcon2, title: '采购订单', id: 5 },
        { imgUrl: HomeImages.selectIcon6, title: '学习专区', id: 6 },
    ]

    handleMenuClick = (id) => {
        switch (id) {
            case 0:
                Taro.switchTab({
                    url: '/pages/StoreManagement/index',
                })
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/MemberSearch/index',
                })
                break
            case 2:
                Taro.navigateTo({
                    url: '/pages/StockList/index',
                })
                break
            case 3:
                Taro.navigateTo({
                    url: '/pages/SaleOrderList/index',
                })
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/JoinOrderList/index',
                })
                break
            case 5:
                Taro.navigateTo({
                    url: '/pages/OrderList/index',
                })
                break
                break
            case 6:
                Taro.navigateTo({
                    url: '/pages/LearningCenter/index',
                })
                break
            default:
                return
        }
    }

    componentDidMount() {
        this.getAreaInfo()
    }

    componentDidShow() {
        if (!Taro.getStorageSync('token')) {
            Taro.reLaunch({ url: '/pages/UserLogin/index' })
        } else {
            this.getHomeData()
        }
    }

    getAreaInfo = () => {
        this.props.dispatch({
            type: 'Home/areaData',
            cb: (data) => {
                Taro.setStorageSync('areaInfo', data)
            },
        })
    }

    getStoreList = () => {
        this.props.dispatch({
            type: 'ChooseStore/getStoreList',
            payload: {
                name: '',
                pageIndex: 1,
            },
            cb: (data) => {
                const { list } = data
                if (list && list.length) {
                    if (list[0].id) {
                        Taro.setStorageSync('shopId', list[0].id)
                        this.setState(
                            {
                                storeId: list[0].id,
                            },
                            () => {
                                this.getHomeData()
                            },
                        )
                    }
                }
            },
        })
    }

    getHomeData = () => {
        this.props.dispatch({
            type: 'Home/getHomeData',
            cb: () => {
                const { storeId, storeName, shopNumber, tradeAmount, tradeCount } = this.props.HomeData
                this.setState({
                    storeId,
                    storeName,
                    shopNumber,
                    tradeAmount,
                    tradeCount,
                })
            },
        })
    }

    goChoseStore = () => {
        Taro.navigateTo({
            url: '/pages/ChooseStore/index',
        })
    }

    render() {
        const { storeName, shopNumber, tradeAmount, tradeCount } = this.state
        return (
            <View className={styles.HomeMain}>
                <View className={styles.HomeWrapper}>
                    <View className={styles.topInfoBox}>
                        <View className={styles.topBox}>
                            <View className={styles.title}>今日情况</View>
                            <View className={styles.storeName}>
                                <Text className={styles.name}>{storeName}</Text>
                                <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpPageIcon} />
                            </View>
                        </View>
                        <View className={styles.botBox}>
                            <View className={styles.countItem}>
                                <View className={styles.title}>订单数量(个)</View>
                                <View className={styles.content}>{tradeCount}</View>
                            </View>
                            <View className={styles.countLine} />
                            <View className={styles.countItem}>
                                <View className={styles.title}>订单总额(元)</View>
                                <View className={styles.content}>{tradeAmount.toFixed(2)}</View>
                            </View>
                            <View className={styles.countLine} />
                            <View className={styles.countItem}>
                                <View className={styles.title}>到店人数(位)</View>
                                <View className={styles.content}>{shopNumber}</View>
                            </View>
                        </View>
                    </View>
                    <View className={styles.selectMenuBox}>
                        {this.menuList.map((item) => {
                            return (
                                <View
                                    key={item.id}
                                    className={styles.selectItem}
                                    onClick={this.handleMenuClick.bind(this, item.id)}
                                >
                                    <Image src={item.imgUrl} className={styles.selectImg} />
                                    <View className={styles.selectTitle}>{item.title}</View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    }
}

export default Home
