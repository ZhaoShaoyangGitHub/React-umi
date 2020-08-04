import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Text, Image } from '@tarojs/components'
import CalendarNormal from '../../components/CalendarNormal/index'
import { connect } from '@tarojs/redux'
import { SubscribeProps, SubscribeState } from './index.interface'
import { EmptyImg } from '../../assets/img/load'
import styles from './Subscribe.module.less'

@connect(({ Subscribe }) => ({
    ...Subscribe,
}))
class Subscribe extends Component<SubscribeProps, SubscribeState> {
    config: Config = {
        navigationBarTitleText: '预约',
    }
    constructor(props: SubscribeProps) {
        super(props)
        this.state = {
            dotOpt: [],
            appointmentList: [],
            notAppointmentList: [],
            currentTime: new Date().getTime(),
            pageIndex: 1,
            hasMore: true,
            isSend: false,
            hasConfirm: false,
        }
    }
    componentDidShow = () => {
        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                this.initData()
            } else {
                Taro.reLaunch({ url: '/pages/UserLogin/index' })
            }
        } catch (e) {
            // Do something when catch error
        }
    }

    initData = () => {
        Taro.showLoading({ title: '' })
        this.getIsConfirmOrder()
        this.props.dispatch({
            type: 'Subscribe/getAppointment',
            params: { appointmentTime: '' },
            cb: (data) => {
                // this.setState({ appointmentList: data })
                this.resolveAppointment(data)
            },
        })
    }

    onReachBottom() {
        const { hasMore, pageIndex, isSend } = this.state
        if (hasMore) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getPackage()
                },
            )
        } else {
            if (!isSend) {
                this.getDetail()
            }
        }
    }

    getIsConfirmOrder = () => {
        this.props.dispatch({
            type: 'Home/getIsConfirmOrder',
            cb: (data) => {
                this.setState(
                    {
                        hasConfirm: data,
                    },
                    () => {
                        this.getPackage()
                    },
                )
            },
        })
    }

    getPackage = () => {
        const { notAppointmentList, pageIndex, hasConfirm } = this.state
        if (hasConfirm) {
            this.setState({
                notAppointmentList: [],
                appointmentList: [],
                hasMore: false,
            })
            Taro.hideLoading()
            this.getDetail()
            return
        }
        this.props.dispatch({
            type: 'Subscribe/getPackageList',
            params: { status: 1, pageIndex },
            cb: (data) => {
                if (data) {
                    this.setState(
                        {
                            notAppointmentList: pageIndex === 1 ? data.list : notAppointmentList.concat(data.list),
                            appointmentList: pageIndex === 1 ? data.list : notAppointmentList.concat(data.list),
                            hasMore: pageIndex < data.totalPage,
                        },
                        () => {
                            if (pageIndex >= data.totalPage) {
                                this.getDetail()
                            }
                        },
                    )
                } else {
                    this.getDetail()
                }

                Taro.hideLoading()
            },
        })
    }
    getDetail = () => {
        const { currentTime, notAppointmentList } = this.state
        const _this = this
        this.props.dispatch({
            type: 'Subscribe/getAppointment',
            params: { appointmentTime: currentTime },
            cb: (data) => {
                Taro.hideLoading()
                console.log('套餐-getAppointment:', data)
                const newList = data.map((item) => ({
                    ...item,
                    isSchedul: true,
                }))
                // if (!appointmentTime) {
                //     _this.resolveAppointment(data)
                // } else {
                this.setState({
                    isSend: true,
                })
                if (moment(currentTime).isBefore(moment(), 'day')) {
                    _this.setState({ appointmentList: newList || [] })
                } else {
                    _this.setState({ appointmentList: notAppointmentList.concat(newList) })
                }
                // }
            },
        })
    }

    resolveAppointment = (arr) => {
        const _this = this
        const _arr: any[] = []
        for (let i = 0; i < arr.length; i++) {
            _arr.push({ color: '#FFCA1B', date: _this.formatDate(arr[i].appointmentTime, 'short') })
        }
        console.log(_arr)

        this.setState({ dotOpt: _arr })
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

    // 获取border色值
    getBorderColor = (appointmentInfo) => {
        // 1未开始 2已开始 3已取消 4已完成 5待确认
        if (appointmentInfo.isSchedul) {
            switch (appointmentInfo.status.value) {
                case 1: {
                    return '#D22385'
                }
                case 2: {
                    return '#CCCCCC'
                }
                case 3: {
                    return '#2BCC6E'
                }
                case 5: {
                    return '#D22385'
                }
                default:
                    return ''
            }
        } else {
            return '#45C3F2'
        }
    }

    handleSelectDay = (item) => {
        console.log(item)
        const _time = item.year + '/' + item.month + '/' + item.day
        const date = new Date(_time)
        const appointmentTime = date.getTime()
        this.setState(
            {
                currentTime: appointmentTime,
                isSend: false,
            },
            () => {
                this.getDetail()
            },
        )
    }

    // 取消预约
    handleCancel = (appointmentInfo) => {
        const { currentTime } = this.state
        this.props.dispatch({
            type: 'Subscribe/cancelAppointment',
            params: { id: appointmentInfo.id },
            cb: (data) => {
                Taro.showToast({
                    title: '取消成功',
                })
                this.getDetail()
            },
        })
    }

    // 申请预约
    handleApply = (orderId) => {
        Taro.navigateTo({
            url: `/pages/PackageSelect/index?orderId=${orderId}`,
        })
    }

    handleAddComment = (appointmentInfo) => {
        Taro.navigateTo({
            url: `/pages/AddComment/index?id=${appointmentInfo.id}&commentType=2`,
        })
    }

    // 确认服务
    handleConfirmService = (appointmentInfo) => {
        this.props.dispatch({
            type: 'Subscribe/confirmService',
            params: { id: appointmentInfo.id },
            cb: (data) => {
                Taro.showToast({
                    title: '确认成功',
                })
                this.getIsConfirmOrder()
            },
        })
    }

    render() {
        const { dotOpt, appointmentList } = this.state
        return (
            <View className={styles.SubscribeMain}>
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
                    />
                </View>
                {appointmentList.length ? (
                    appointmentList.map((item) => (
                        <View className={styles.infoBox} style={{ borderColor: this.getBorderColor(item) }}>
                            <View className={styles.titleBox}>
                                {item.isSchedul
                                    ? `${moment(item.appointmentTime).format('YYYY-MM-DD')}
                                ${this.getWeekDay(item.appointmentTime)} 第${item.usedNumber}
                                次服务`
                                    : ''}
                            </View>
                            <View className={styles.keyValBox}>
                                <View className={styles.itemBox}>
                                    <View className={styles.key}>套餐名称：</View>
                                    <View className={styles.val}>{item.packageName}</View>
                                </View>
                                <View className={styles.itemBox}>
                                    <View className={styles.key}>服务项目：</View>
                                    <View className={styles.val}>
                                        {item.packageOrderProjectRecordResponseList.map((pack) => {
                                            return <Text key={pack.id}>{pack.projectName + ' '}</Text>
                                        })}
                                    </View>
                                </View>
                                {!item.isSchedul ? (
                                    <View className={styles.itemBox}>
                                        <View className={styles.key}>套餐状态：</View>
                                        <View className={styles.val}>未预约</View>
                                    </View>
                                ) : (
                                    <View>
                                        <View className={styles.itemBox}>
                                            <View className={styles.key}>预约时间：</View>
                                            <View className={styles.val}>
                                                {/* {Array.isArray(appointmentList) &&
                                        appointmentList[0] &&
                                        appointmentList[0].createTime &&
                                        this.formatDate(appointmentList[0].createTime, 'long')}
                                    至
                                    {Array.isArray(appointmentList) &&
                                        appointmentList[0] &&
                                        appointmentList[0].appointmentTime &&
                                        this.formatDate(appointmentList[0].appointmentTime, 'long')} */}
                                                {moment(item.appointmentTime).format('YYYY-MM-DD HH:mm')}
                                            </View>
                                        </View>
                                        <View className={styles.itemBox}>
                                            <View className={styles.key}>服务技师：</View>
                                            <View className={styles.val}>
                                                {item.staffUserName} {item.staffUserWorkNumber}
                                            </View>
                                        </View>
                                        <View className={styles.itemBox}>
                                            <View className={styles.key}>服务次数：</View>
                                            <View className={styles.val}>第{item.usedNumber}次</View>
                                        </View>
                                    </View>
                                )}
                            </View>
                            {item.status.value === 1 && item.isSchedul && (
                                <Text className={styles.cancelButton} onClick={() => this.handleCancel(item)}>
                                    取消预约
                                </Text>
                            )}
                            {item.status.value === 2 &&
                                item.isSchedul &&
                                (item.evaluationStatus.value === 1 ? (
                                    <Text className={styles.cancelButton} onClick={() => this.handleAddComment(item)}>
                                        待评价
                                    </Text>
                                ) : (
                                    <Text className={styles.cancelButton} onClick={() => this.handleAddComment(item)}>
                                        已评价
                                    </Text>
                                ))}
                            {item.status.value === 5 && item.isSchedul && (
                                <Text className={styles.cancelButton} onClick={() => this.handleConfirmService(item)}>
                                    确认服务
                                </Text>
                            )}
                            {!item.isSchedul && (
                                <Text className={styles.cancelButton} onClick={() => this.handleApply(item.orderId)}>
                                    去预约
                                </Text>
                            )}
                        </View>
                    ))
                ) : (
                    <View>
                        <Image src={EmptyImg.emptyShop} className={styles.noDataImg} />
                        <View className={styles.word}>暂时没有预约呦～</View>
                    </View>
                )}
            </View>
        )
    }
}

export default Subscribe
