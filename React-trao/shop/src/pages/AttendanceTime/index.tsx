import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AttendanceTimeProps, AttendanceTimeState } from './index.interface'
import TechnicianTop from '../../components/TechnicianTop'
import AttendanceTabBar from '../../components/AttendanceTabBar'
import styles from './AttendanceTime.module.less'
import { getToday, getTime } from '../../utils/function'
import { attendanceImages, publicImages } from '../../assets/img/load'

@connect(({ AttendanceTime, Personal }) => ({
    ...AttendanceTime,
    ...Personal,
}))
class AttendanceTime extends Component<AttendanceTimeProps, AttendanceTimeState> {
    config: Config = {
        navigationBarTitleText: '考勤打卡',
    }
    constructor(props: AttendanceTimeProps) {
        super(props)
        this.state = {
            data: '',
            time: '',
            timer: null,
            weeks: '',
            startTime: '',
            endTime: '',
            workState: 1, //1：上班打卡 2：下班打卡
            isRecord: false,
            personalInfo: {
                avatar: '',
                workNumber: '',
                name: '',
            },

            punchStatus: false, //是否到达考勤范围
            addressLocation: {
                longitude: 0,
                latitude: 0,
            },
        }
    }

    componentDidMount() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
        }
        if (Taro.getStorageSync('personalInfo')) {
            let { avatar, workNumber, name } = JSON.parse(Taro.getStorageSync('personalInfo'))
            this.setState({
                personalInfo: {
                    avatar,
                    workNumber,
                    name,
                },
            })
        } else {
            this.props.dispatch({
                type: 'Personal/getUserInfo',
                cb: (data) => {
                    const { avatar, workNumber, name } = data
                    this.setState({
                        personalInfo: {
                            avatar,
                            workNumber,
                            name,
                        },
                    })
                    Taro.setStorage({
                        key: 'personalInfo',
                        data: JSON.stringify(data),
                    })
                },
            })
        }
        this.getTime()
        this.timing()
        this.getAttendanceStatus()
        this.setPunchStatus()
        // this.getAddressDistance()
    }

    //是否到达考勤范围
    setPunchStatus = () => {
        const _this = this
        Taro.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    Taro.authorize({
                        scope: 'scope.userLocation',
                        success: () => {
                            Taro.getLocation({
                                type: 'gcj02',
                                isHighAccuracy: true,
                                success(res) {
                                    _this.setState(
                                        {
                                            addressLocation: {
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                            },
                                        },
                                        () => {
                                            _this.getAddressDistance()
                                        },
                                    )
                                },
                            })
                        },
                        fail: () => {
                            _this.openConfirm()
                        },
                    })
                } else {
                    Taro.getLocation({
                        type: 'gcj02',
                        isHighAccuracy: true,
                        success(res) {
                            _this.setState(
                                {
                                    addressLocation: {
                                        longitude: res.longitude,
                                        latitude: res.latitude,
                                    },
                                },
                                () => {
                                    _this.getAddressDistance()
                                },
                            )
                        },
                    })
                }
            },
        })
    }

    openConfirm = () => {
        const _this = this
        Taro.showModal({
            content: '检测到您没打开此小程序的定位权限，会影响个人打开功能，是否去设置打开？',
            confirmText: '确认',
            cancelText: '取消',
            success: function (res) {
                //点击“确认”时打开设置页面
                if (res.confirm) {
                    Taro.openSetting({
                        success: (res) => {
                            Taro.getLocation({
                                type: 'gcj02',
                                isHighAccuracy: true,
                                success(res) {
                                    _this.setState(
                                        {
                                            addressLocation: {
                                                longitude: res.longitude,
                                                latitude: res.latitude,
                                            },
                                        },
                                        () => {
                                            _this.getAddressDistance()
                                        },
                                    )
                                },
                            })
                        },
                    })
                } else {
                    console.log('用户点击取消')
                }
            },
        })
    }

    getAddressDistance = () => {
        const { addressLocation } = this.state
        console.log(addressLocation)
        this.props.dispatch({
            type: 'AttendanceTime/getAddressDistance',
            payload: {
                longitude: addressLocation.latitude,
                latitude: addressLocation.longitude,
            },
            cb: (res) => {
                this.setState({
                    punchStatus: res,
                })
            },
        })
    }

    // 获取当前是日期
    getTime = () => {
        let { weeks } = this.state
        weeks = this.weeksFun(new Date().getDay())
        this.setState({
            data: getToday(),
            time: getTime(),
            weeks,
        })
    }
    // 获取当前是星期几
    weeksFun = (index) => {
        switch (index) {
            case 0:
                return '星期日'
                break
            case 1:
                return '星期一'
                break
            case 2:
                return '星期二'
                break
            case 3:
                return '星期三'
                break
            case 4:
                return '星期四'
                break
            case 5:
                return '星期五'
                break
            case 6:
                return '星期六'
                break
        }
    }
    //获取当日打卡记录
    getAttendanceStatus = () => {
        this.props.dispatch({
            type: 'AttendanceTime/attendanceStatus',
            cb: (data) => {
                if (data) {
                    const { startTime, endTime } = data
                    if (startTime) {
                        this.setState({
                            workState: 2,
                            startTime: getTime(startTime).substring(0, 5),
                            isRecord: true,
                        })
                    }
                    if (endTime) {
                        this.setState({
                            workState: 3,
                            endTime: getTime(endTime).substring(0, 5),
                            isRecord: true,
                        })
                    }
                } else {
                    this.setState({
                        isRecord: false,
                    })
                }
            },
        })
    }
    //打卡时间
    timing = () => {
        let { timer } = this.state
        timer = setInterval(() => {
            this.getTime()
        }, 1000)
        this.setState({
            timer,
        })
    }
    punchTheClock = () => {
        if (!this.state.punchStatus) return
        Taro.showLoading({
            title: '打卡中',
            mask: true,
        })
        let { workState, startTime, endTime } = this.state
        const currentTime = new Date().getTime()
        let payload: object = {}
        if (workState === 1) {
            startTime = getTime().substring(0, 5)
            payload = {
                startTime: currentTime,
            }
        }
        if (workState === 2) {
            endTime = getTime().substring(0, 5)
            payload = {
                endTime: currentTime,
            }
        }
        this.props.dispatch({
            type: `AttendanceTime/${workState === 1 ? 'startWork' : 'offDuty'}`,
            payload,
            cb: () => {
                Taro.hideLoading()
                Taro.showToast({
                    title: '打卡成功',
                    mask: true,
                })
                workState++
                this.setState({
                    workState,
                    startTime,
                    endTime,
                    isRecord: true,
                })
            },
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    render() {
        const tabBar = {
            currentId: 0,
            list: [
                {
                    id: 0,
                    pagePath: 'pages/AttendanceTime/index',
                    text: '打卡',
                    iconPath: attendanceImages.clockOff,
                    selectedIconPath: attendanceImages.clockOn,
                },
                {
                    id: 1,
                    pagePath: 'pages/AttendanceStatistics/index',
                    text: '统计',
                    iconPath: attendanceImages.statisticsOff,
                    selectedIconPath: attendanceImages.statisticsOn,
                },
            ],
        }
        const { data, time, weeks, personalInfo, workState, startTime, endTime, isRecord, punchStatus } = this.state
        return (
            <View className={styles.AttendanceTimeMain}>
                <TechnicianTop
                    avatar={personalInfo.avatar && JSON.parse(personalInfo.avatar).file}
                    name={personalInfo.name}
                    workNumber={personalInfo.workNumber}
                />
                <View className={styles.punchTheClock}>
                    <View className={styles.todayContent}>
                        <Text className={styles.data}>{data} </Text>
                        <Text className={styles.weeks}>{weeks}</Text>
                    </View>
                    <View className={styles.recode}>
                        {isRecord && (
                            <View className={styles.recodeWrapper}>
                                <View className={styles.listItem}>
                                    <View className={styles.title}>上班打卡</View>
                                    <View className={styles.pointTime}>打卡时间{startTime}</View>
                                </View>
                                <View className={styles.listItem}>
                                    <View className={styles.title}>下班打卡</View>
                                    <View className={styles.pointTime}>打卡时间{endTime}</View>
                                </View>
                            </View>
                        )}
                    </View>
                    {workState < 3 && (
                        <View
                            className={`${styles.timeBox} ${!punchStatus && styles.disable}`}
                            onClick={this.punchTheClock}
                        >
                            <View>{workState === 1 ? '上' : '下'}班时间</View>
                            <View className={styles.time}>{time}</View>
                        </View>
                    )}
                    <View className={styles.warningTxt}>
                        <View className={styles.icon}>
                            {punchStatus && (
                                <Image src={publicImages.selectedIcon} className={styles.img} mode="widthFix" />
                            )}
                        </View>
                        <View>{punchStatus ? '已进入考勤范围' : '不在考勤范围'}</View>
                    </View>
                </View>
                <AttendanceTabBar tabBar={tabBar} />
            </View>
        )
    }
}

export default AttendanceTime
