import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { HomeProps, HomeState } from './index.interface'
import { HomeImages } from '../../assets/img/load'
import styles from './Home.module.less'

@connect(({ Home }) => ({
    ...Home,
}))
class Home extends Component<HomeProps, HomeState> {
    config: Config = {
        navigationBarTitleText: '荣月健康店长端',
    }
    constructor(props: HomeProps) {
        super(props)
        this.state = {
            currentIndex: 0,
            showMask: false,
            currentOrderAmount: 0,
            currentOrderNum: 0,
            userSum: 0,
            currentAppointmentInfo: null,
            shopName: '',
        }
    }

    public menuList = [
        { imgUrl: HomeImages.selectIcon4, title: '预约列表', id: 3 },
        { imgUrl: HomeImages.selectIcon1, title: '开始服务', id: 0 },
        { imgUrl: HomeImages.selectIcon2, title: '结束服务', id: 1 },
        { imgUrl: HomeImages.selectIcon5, title: '套餐排期', id: 4 },
        { imgUrl: HomeImages.selectIcon8, title: '套餐暂停', id: 7 },
        { imgUrl: HomeImages.selectIcon9, title: '订单退款', id: 8 },
        { imgUrl: HomeImages.selectIcon3, title: '订单生成', id: 2 },
        { imgUrl: HomeImages.selectIcon6, title: '我的会员', id: 5 },
        { imgUrl: HomeImages.selectIcon7, title: '学习专区', id: 6 },
    ]
    public maskSelectList = [
        { title: '帮助用户搭配下单', id: 0 },
        { title: '帮助用户完成线下支付', id: 1 },
    ]
    componentDidShow() {
        if (!Taro.getStorageSync('token')) {
            Taro.reLaunch({ url: '/pages/UserLogin/index' })
        }
        this.props.dispatch({
            type: 'Home/getCurrentInfo',
            params: {},
            cb: (data) => {
                if (data) {
                    this.setState({
                        currentOrderAmount: data.tradePayAmount,
                        currentOrderNum: data.tradeSum,
                        userSum: data.userSum,
                        shopName: data.shopName,
                    })
                }
            },
        })
        this.getPageList()
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

    // 获取最新的预约信息
    getPageList = () => {
        Taro.showLoading({ title: '加载中' })
        this.props.dispatch({
            type: 'MySubscribe/getPageList',
            params: { pageIndex: 1, isAppointment: 1, keyword: '', status: 1 },
            cb: (data) => {
                Taro.hideLoading()
                if (data && data.list) {
                    this.setState({ currentAppointmentInfo: data.list[0] })
                }
            },
        })
    }
    handleSelectItem = (id) => {
        this.setState({ currentIndex: id })
    }
    handleGotoAssistantPay = () => {
        const { currentIndex } = this.state
        if (currentIndex) {
            // 帮助用户完成线下支付
            Taro.navigateTo({
                url: '/pages/OrderSearch/index',
            })
        } else {
            // 帮助用户搭配下单
            Taro.navigateTo({
                url: `/pages/SelectUser/index?type=placeOrder`,
            })
        }

        this.setState({
            showMask: false,
        })
    }
    handleMenuClick = (id) => {
        switch (id) {
            case 0:
                Taro.navigateTo({
                    url: '/pages/MySubscribe/index',
                })
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/EndServeies/index',
                })
                break
            case 2:
                this.setState({ showMask: true })
                break
            case 3:
                Taro.navigateTo({
                    url: '/pages/AppointmentList/index',
                })
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/SchedulSelectUser/index',
                })
                break
            case 5:
                Taro.navigateTo({
                    url: '/pages/MemberSearch/index',
                })
                break
            case 6:
                Taro.navigateTo({
                    url: '/pages/LearningCenter/index',
                })
                break
            case 7:
                Taro.navigateTo({
                    url: `/pages/SelectUser/index?type=suspendPackage`,
                })
                break
            case 8:
                Taro.navigateTo({
                    url: `/pages/SelectUser/index?type=refundOrder`,
                })
                break
            default:
                return
        }
    }
    render() {
        const {
            currentIndex,
            showMask,
            currentOrderAmount,
            currentOrderNum,
            currentAppointmentInfo,
            userSum,
            shopName,
        } = this.state
        return (
            <View className={styles.HomeMain}>
                {showMask && (
                    <View className={styles.mask}>
                        <View className={styles.maskInfoBox}>
                            <Image src={HomeImages.maskBg} className={styles.maskBgImg} />
                            <View className={styles.maskBgword}>选择辅助方式</View>
                            <View className={styles.selectBox}>
                                {this.maskSelectList.map((item) => {
                                    return (
                                        <View
                                            key={item.id}
                                            className={styles.selectSingleItem}
                                            onClick={this.handleSelectItem.bind(this, item.id)}
                                        >
                                            <View className={styles.selectIconBox}>
                                                {currentIndex === item.id ? (
                                                    <Image src={HomeImages.maskSelect} className={styles.lefted} />
                                                ) : (
                                                    <View className={styles.left} />
                                                )}
                                            </View>

                                            <View className={styles.right}>{item.title}</View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View className={styles.confirm} onClick={this.handleGotoAssistantPay}>
                                确认
                            </View>
                            <Image
                                src={HomeImages.maskCloseIcon}
                                className={styles.closeBtn}
                                onClick={() => {
                                    this.setState({ showMask: false })
                                }}
                            />
                        </View>
                    </View>
                )}
                <View className={styles.topInfobox}>
                    <View className={styles.topBox}>
                        <View>今日情况</View>
                        <View className={styles.shopName}>{shopName}</View>
                    </View>
                    <View className={styles.botBox}>
                        <View className={styles.countItem}>
                            <View className={styles.title}>订单数量(个)</View>
                            <View className={styles.content}>{currentOrderNum}</View>
                        </View>
                        <View className={styles.countLine} />
                        <View className={styles.countItem}>
                            <View className={styles.title}>订单总额(元)</View>
                            <View className={styles.content}>{currentOrderAmount.toFixed(2)}</View>
                        </View>
                        <View className={styles.countLine} />
                        <View className={styles.countItem}>
                            <View className={styles.title}>到店人数(位)</View>
                            <View className={styles.content}>{userSum}</View>
                        </View>
                    </View>
                </View>
                {currentAppointmentInfo && currentAppointmentInfo.status.value === 1 && (
                    <View className={styles.userInfobox}>
                        <View className={styles.topBox}>
                            <Image src={HomeImages.reminder} className={styles.iconImg} />
                            <View className={styles.info}>
                                您在
                                {currentAppointmentInfo.schedulingTime
                                    ? moment(currentAppointmentInfo.schedulingTime).format('YYYY年MM月DD日 HH:mm')
                                    : ''}
                                有
                                {currentAppointmentInfo.projectSchedulingResponses
                                    .map((item) => item.packageName)
                                    .join(',')}
                                服务项目。
                            </View>
                        </View>
                        <View className={styles.botBox}>
                            <View className={styles.infoItem}>
                                <View className={styles.infoKey}>服务项目</View>
                                <View className={styles.infoVal}>
                                    {currentAppointmentInfo.projectSchedulingResponses
                                        .map((item) => item.packageName)
                                        .join(',')}
                                </View>
                            </View>
                            <View className={styles.infoItem}>
                                <View className={styles.infoKey}>开始时间</View>
                                <View className={styles.infoVal}>
                                    {currentAppointmentInfo.schedulingTime
                                        ? moment(currentAppointmentInfo.schedulingTime).format('YYYY-MM-DD')
                                        : ''}
                                </View>
                            </View>
                            <View className={styles.infoItem}>
                                <View className={styles.infoKey}>预约客户</View>
                                <View className={styles.infoVal}>{currentAppointmentInfo.userName}</View>
                            </View>
                            <View className={styles.infoItem}>
                                <View className={styles.infoKey}>联系电话</View>
                                <View className={styles.infoVal}>{currentAppointmentInfo.userPhone}</View>
                            </View>
                        </View>
                    </View>
                )}

                <View className={styles.selectMenuBox}>
                    {this.menuList.map((item) => {
                        return (
                            <View
                                key={item.id}
                                className={styles.selectItem}
                                onClick={this.handleMenuClick.bind(this, item.id)}
                            >
                                <Image src={item.imgUrl} className={styles.selectImg} />
                                <View className={styles.title}>{item.title}</View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default Home
