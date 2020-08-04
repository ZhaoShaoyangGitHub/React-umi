import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Text, Image } from '@tarojs/components'
import CalendarNormal from '../../components/CalendarNormal/index'
import { connect } from '@tarojs/redux'
import { TechnicianSchedulingProps, TechnicianSchedulingState } from './index.interface'
import styles from './TechnicianScheduling.module.less'
import StoreItem from '../../components/StoreItem'
import { publicImages, EmptyImg } from '../../assets/img/load'

@connect(({ TechnicianScheduling }) => ({
    ...TechnicianScheduling,
}))
class TechnicianScheduling extends Component<TechnicianSchedulingProps, TechnicianSchedulingState> {
    config: Config = {
        navigationBarTitleText: '预约',
    }
    constructor(props: TechnicianSchedulingProps) {
        super(props)
        this.state = {
            shopId: 0,
            dotOpt: [],
            numOpt: [],
            schedulingList: [],
            currentMonth: moment().format('YYYY-MM'),
            currentTime: new Date().getTime(),
            storeInfo: null,
        }
    }
    componentDidShow = () => {
        const { shopId } = this.$router.params
        if (shopId) {
            this.setState(
                {
                    shopId: +shopId,
                },
                () => {
                    this.getDetail()
                    this.getCurrentMonthScheduling()
                },
            )
        }
        try {
            var value = Taro.getStorageSync('storeInfo')
            if (value) {
                this.setState({
                    storeInfo: JSON.parse(value),
                })
            } else {
                if (shopId) {
                    this.setState(
                        {
                            shopId: +shopId,
                        },
                        () => {
                            this.getShopDetails()
                        },
                    )
                }
            }
        } catch (e) {
            if (shopId) {
                this.setState(
                    {
                        shopId: +shopId,
                    },
                    () => {
                        this.getShopDetails()
                    },
                )
            }
        }
    }
    getShopDetails = () => {
        const { shopId } = this.state
        this.props.dispatch({
            type: 'Store/getShopDetails',
            payload: {
                shopId,
            },
            cb: (data) => {
                const { name, imageUrl, address } = data
                this.setState({
                    storeInfo: {
                        name,
                        imageUrl,
                        address,
                    },
                })
                Taro.setStorage({
                    key: 'storeInfo',
                    data: JSON.stringify({
                        name,
                        imageUrl,
                        address,
                    }),
                })
            },
        })
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }
    getDetail = () => {
        const { currentTime, shopId } = this.state
        Taro.showLoading({
            title: '加载中',
        })
        this.props.dispatch({
            type: 'TechnicianScheduling/getSchedulingDetail',
            params: {
                time: moment(currentTime).format('YYYY-MM-DD'),
                shopId,
            },
            cb: (data) => {
                this.setState({ schedulingList: data || [] })
                Taro.hideLoading()
            },
        })
    }

    getCurrentMonthScheduling = () => {
        const { currentMonth, shopId } = this.state
        this.props.dispatch({
            type: 'TechnicianScheduling/getScheduling',
            params: { time: currentMonth + '-01', shopId },
            cb: (data) => {
                // this.setState({ appointmentList: data })
                this.getNumStyle(data)
            },
        })
    }

    // 月份改变
    handleMonthChange = (year, month) => {
        this.setState(
            {
                currentMonth: year + '-' + month,
            },
            () => {
                this.getCurrentMonthScheduling()
            },
        )
    }

    // 获取日历点样式
    resolveAppointment = (arr) => {
        const _this = this
        const _arr: any[] = []
        for (let i = 0; i < arr.length; i++) {
            _arr.push({ color: '#FFCA1B', date: _this.formatDate(arr[i].appointmentTime, 'short') })
        }

        this.setState({ dotOpt: _arr })
    }

    // 获取日历右上角数量样式
    getNumStyle = (arr) => {
        const _arr: any[] = []
        const { currentTime } = this.state
        for (let i = 0; i < arr.length; i++) {
            if (moment(arr[i].time).isBefore(moment(currentTime), 'day')) {
                _arr.push({ color: '#C396DF', num: arr[i].number, date: moment(arr[i].time).format('YYYY-MM-DD') })
            } else {
                _arr.push({ color: '#D22385', num: arr[i].number, date: moment(arr[i].time).format('YYYY-MM-DD') })
            }
        }

        this.setState({ numOpt: _arr })
    }

    formatDate = (time, type) => {
        const date = new Date(time)
        const year = date.getFullYear() //取得4位数的年份
        const month = date.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
        const day = date.getDate() //返回日期月份中的天数（1到31）

        const hour = date.getHours() //返回日期中的小时数（0到23）
        const minute = date.getMinutes() //返回日期中的分钟数（0到59）
        const second = date.getSeconds()

        if (type === 'short') {
            return year + '-' + month + '-' + day
        } else {
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        }
    }
    getWeekDay = (time) => {
        switch (moment(time).weekday()) {
            case 1: {
                return ' 星期一'
            }
            case 2: {
                return ' 星期二'
            }

            case 3: {
                return ' 星期三'
            }
            case 4: {
                return ' 星期四'
            }
            case 5: {
                return ' 星期五'
            }
            case 6: {
                return ' 星期六'
            }
            case 7: {
                return ' 星期日'
            }
            default:
                return ''
        }
    }

    handleSelectDay = (item) => {
        const _time = item.year + '/' + item.month + '/' + item.day
        const date = new Date(_time)
        const appointmentTime = date.getTime()
        this.setState(
            {
                currentTime: appointmentTime,
            },
            () => {
                this.getDetail()
            },
        )
    }

    render() {
        const { dotOpt, schedulingList, numOpt, currentTime, storeInfo, shopId } = this.state
        return (
            <View className={styles.TechnicianSchedulingMain}>
                {storeInfo && (
                    <StoreItem
                        storeTitle={storeInfo.name}
                        storeAddress={storeInfo.address}
                        storeImg={storeInfo.imageUrl && JSON.parse(storeInfo.imageUrl)[0].file}
                        nameStyles={{ fontSize: '32rpx' }}
                        itemStyles={{ 'box-shadow': 'none!important' }}
                        onHandleClick={() => {
                            this.goStorePage(shopId)
                        }}
                    >
                        <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                    </StoreItem>
                )}
                <View className={styles.calendarBox}>
                    <CalendarNormal
                        onSelectDay={this.handleSelectDay}
                        // 年月标题样式
                        titleOpt={{
                            template: 'AYearBMonth',
                        }}
                        // 周末标题配置
                        weekOpt={{
                            // 周末标题文字和样式
                            data: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
                        }}
                        // 天的样式主题配置
                        dayOpt={{
                            // 天的默认样式
                            defaultStyle: {},
                            // 今天的样式
                            todayStyle: {
                                width: '48rpx',
                                height: '48rpx',
                                lineHeight: '48rpx',
                                textAlign: 'center',
                                borderRadius: '24rpx',
                                color: '#B365B7',
                                backgroundColor: '#fff',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                            },
                            // 天的当前月样式
                            currentMonthStyle: {
                                color: 'rgba(51, 51, 51, 1)',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                                fontWeight: 'bold',
                                marginLeft: '10rpx',
                            },
                            // 天的点击样式
                            clickedStyle: {
                                width: '68rpx',
                                height: '68rpx',
                                borderRadius: '34rpx',
                                backgroundColor: 'rgba(179, 101, 183, 1)',
                                color: '#fff',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                            },
                        }}
                        dotOpt={dotOpt}
                        numOpt={numOpt}
                        monthChange={this.handleMonthChange}
                    />
                </View>
                <View className={styles.list}>
                    <View className={styles.titleBox}>
                        {moment(currentTime).format('YYYY-MM-DD')}
                        {this.getWeekDay(currentTime)}
                    </View>
                    {schedulingList.length ? (
                        schedulingList.map((item, index) => (
                            <View className={styles.infoBox} key={index}>
                                <View className={styles.itemBox}>
                                    <View className={styles.key}>服务技师：</View>
                                    <View className={styles.val}>
                                        {item.staffUserName} {item.userName}
                                    </View>
                                </View>
                                <View className={styles.itemBox}>
                                    <View className={styles.key}>技师工号：</View>
                                    <View className={styles.val}>{item.userNumber}</View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View>
                            <Image src={EmptyImg.emptyPackage} className={styles.noDataImg} />
                            <View className={styles.word}>暂时没有排班呦～</View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default TechnicianScheduling
