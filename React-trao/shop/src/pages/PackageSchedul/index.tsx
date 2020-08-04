import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Text, Image } from '@tarojs/components'
import CalendarNormal from '../../components/CalendarNormal/index'
import { connect } from '@tarojs/redux'
import { PackageSchedulProps, PackageSchedulState } from './index.interface'
import testAvatar from '../../assets/img/select-user/test-avatar.png'
import styles from './PackageSchedul.module.less'
import { BASEURL } from '../../config'

@connect(({ PackageSchedul }) => ({
    ...PackageSchedul,
}))
class PackageSchedul extends Component<PackageSchedulProps, PackageSchedulState> {
    config: Config = {
        navigationBarTitleText: '预约',
    }
    constructor(props: PackageSchedulProps) {
        super(props)
        this.state = {
            userId: 0,
            dotOpt: [],
            appointmentList: [],
            notAppointmentList: [],
            currentTime: new Date().getTime(),
            currentUserInfo: {
                avatar: '',
                nickName: '',
                phone: '',
                province: '',
                city: '',
            },
        }
    }
    componentDidShow = () => {
        const { id } = this.$router.params
        this.setState(
            {
                userId: Number.parseInt(id, 10),
            },
            () => {
                this.getPackage()
            },
        )
        this.props.dispatch({
            type: 'PackageSchedul/getCurrentUserInfo',
            params: { userId: id },
            cb: (data) => {
                this.setState({ currentUserInfo: data })
            },
        })
        this.props.dispatch({
            type: 'PackageSchedul/getAppointment',
            params: { appointmentTime: '', userId: id },
            cb: (data) => {
                // if (!currentTime) {
                this.resolveAppointment(data)
                // } else {

                // }
            },
        })
        // this.props.dispatch({
        //     type: 'PackageSchedul/getAppointment',
        //     params: { appointmentTime: currentTime, userId: id },
        //     cb: (data) => {
        //         this.setState({ appointmentList: data || [] })
        //     },
        // })
    }

    getPackage = () => {
        const { userId } = this.state
        const _this = this
        this.props.dispatch({
            type: 'PackageSchedul/getPackageList',
            params: { userId },
            cb: (data) => {
                const newList = data.map((item) => ({
                    ...item,
                    isSchedul: false,
                }))
                // console.log(newList)
                _this.setState({ notAppointmentList: newList || [] }, () => {
                    _this.getDetail()
                })
            },
        })
    }

    getDetail = () => {
        const { userId } = this.state
        const { currentTime, notAppointmentList } = this.state
        Taro.showLoading({
            title: '加载中',
        })
        const _this = this
        this.props.dispatch({
            type: 'PackageSchedul/getAppointment',
            params: { appointmentTime: currentTime, userId },
            cb: (data) => {
                // console.log('套餐-getAppointment:', data)
                const newList = data.map((item) => ({
                    ...item,
                    isSchedul: true,
                }))
                // console.log(moment(currentTime).isBefore(moment(), 'day'))

                // if (!currentTime) {
                // _this.resolveAppointment(data)
                // } else {
                if (moment(currentTime).isBefore(moment(), 'day')) {
                    _this.setState({ appointmentList: newList || [] })
                } else {
                    _this.setState({ appointmentList: newList.concat(notAppointmentList) })
                }
                // }
                Taro.hideLoading()
            },
        })
    }

    resolveAppointment = (arr) => {
        const _this = this
        const _arr: any[] = []
        for (let i = 0; i < arr.length; i++) {
            _arr.push({ color: '#FFCA1B', date: _this.formatDate(arr[i].appointmentTime, 'short') })
        }

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
        if (appointmentInfo.isSchedul) {
            if (appointmentInfo.status.value === 2) {
                return '#cccccc'
            } else {
                return '#D22385'
            }
        } else {
            return '#45C3F2'
        }
    }

    handleSelectDay = (item) => {
        // console.log(item)
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

    // 跳转排期
    handleToSchedul = (info: any) => {
        const { currentTime } = this.state
        Taro.navigateTo({
            url: `/pages/PackageSelect/index?orderId=${info.orderId}&currentTime=${moment(currentTime).format(
                'YYYY-MM-DD',
            )}&appointmentId=${info.id}`,
        })
    }

    render() {
        const { dotOpt, appointmentList, currentUserInfo } = this.state
        // console.log(appointmentList)

        return (
            <View className={styles.PackageSchedulMain}>
                {/**用户信息 */}
                <View className={styles.resultItem}>
                    <View className={styles.userAvatar}>
                        <Image
                            className={styles.avatar}
                            src={
                                currentUserInfo.avatar ? BASEURL + JSON.parse(currentUserInfo.avatar).file : testAvatar
                            }
                        />
                    </View>
                    <View className={styles.userInfo}>
                        <View className={styles.top}>
                            <View className={styles.left}>{currentUserInfo.nickName}</View>
                            <View className={styles.right}>{currentUserInfo.phone}</View>
                        </View>
                        <View className={styles.bottom}>
                            <View className={styles.location}>
                                {currentUserInfo.province} {currentUserInfo.city}
                            </View>
                        </View>
                    </View>
                </View>

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
                {appointmentList.map((appointment) => (
                    <View className={styles.infoBox} style={{ borderColor: this.getBorderColor(appointment) }}>
                        <View className={styles.titleBox}>
                            {/* {console.log(appointment.packageOrderProjectRecordResponseList)} */}
                            {/* {moment(appointmentList[0].appointmentTime).format('YYYY-MM-DD')}
                            {this.getWeekDay(appointmentList[0].appointmentTime)} 第{appointmentList[0].usedNumber}
                            次服务 */}
                            {appointment.isSchedul ? '今日已排期' : '待排期'}
                        </View>
                        <View className={styles.keyValBox}>
                            <View className={styles.itemBox}>
                                <View className={styles.key}>套餐名称：</View>
                                <View className={styles.val}>{appointment.packageName}</View>
                            </View>
                            <View className={styles.itemBox}>
                                <View className={styles.key}>服务项目：</View>
                                <View className={styles.val}>
                                    {appointment.packageOrderProjectRecordResponseList.map((item) => {
                                        return (
                                            <View key={item.id} className={styles.items}>
                                                {item.projectName} X{item.validNumber}
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                        {appointment.isSchedul ? (
                            <Text className={styles.cancelButton} onClick={() => this.handleToSchedul(appointment)}>
                                修改排期
                            </Text>
                        ) : (
                            <Text className={styles.cancelButton} onClick={() => this.handleToSchedul(appointment)}>
                                开始排期
                            </Text>
                        )}
                    </View>
                ))}
            </View>
        )
    }
}

export default PackageSchedul
