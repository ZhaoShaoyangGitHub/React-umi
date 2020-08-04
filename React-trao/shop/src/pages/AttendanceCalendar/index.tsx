import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AttendanceCalendarProps, AttendanceCalendarState } from './index.interface'
import styles from './AttendanceCalendar.module.less'
import CalendarNormal from '../../components/CalendarNormal'
import TechnicianTop from '../../components/TechnicianTop'
import { getToday, getTime } from '../../utils/function'
import { attendanceImages } from '../../assets/img/load'

@connect(({ AttendanceCalendar, Personal }) => ({
    ...AttendanceCalendar,
    ...Personal,
}))
class AttendanceCalendar extends Component<AttendanceCalendarProps, AttendanceCalendarState> {
    config: Config = {
        navigationBarTitleText: '考勤月历',
    }
    constructor(props: AttendanceCalendarProps) {
        super(props)
        this.state = {
            currentDate: 0,
            weeks: '',
            personalInfo: {
                avatar: '',
                workNumber: 0,
                name: '',
            },
            times: 0,
            startTime: '',
            endTime: '',
            hours: 0,
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
    }

    // 获取当前是日期
    getTime = () => {
        let { weeks } = this.state
        weeks = this.weeksFun(new Date().getDay())
        this.setState(
            {
                currentDate: getToday(),
                weeks,
            },
            () => {
                this.getAttendanceCalendar(new Date(getToday()).getTime())
            },
        )
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

    handleSelectDay = (item) => {
        const _time =
            item.year +
            '/' +
            (item.month > 9 ? item.month : '0' + item.month) +
            '/' +
            (item.day > 9 ? item.day : '0' + item.day)
        if (_time === this.state.currentDate) return
        const date = new Date(_time)
        const appointmentTime = date.getTime()
        this.setState(
            {
                currentDate: _time,
            },
            () => {
                this.getAttendanceCalendar(appointmentTime)
            },
        )
    }

    getAttendanceCalendar = (appointmentTime) => {
        this.props.dispatch({
            type: 'AttendanceCalendar/getAttendanceCalendar',
            payload: {
                attendanceTime: appointmentTime,
            },
            cb: (data) => {
                if (data) {
                    let { times } = this.state
                    let { hours, startTime, endTime } = data
                    if (startTime) {
                        times++
                        startTime = getTime(startTime).substring(0, 5)
                    }
                    if (endTime) {
                        times++
                        endTime = getTime(endTime).substring(0, 5)
                    }
                    hours = Math.round((hours / 3600 / 1000) * 100) / 100
                    this.setState({
                        times,
                        hours,
                        startTime,
                        endTime,
                    })
                } else {
                    this.setState({
                        times: 0,
                        hours: 0,
                        startTime: '',
                        endTime: '',
                    })
                }
            },
        })
    }

    render() {
        const { currentDate, weeks, personalInfo, times, startTime, endTime, hours } = this.state
        return (
            <View className={styles.AttendanceCalendarMain}>
                <TechnicianTop
                    avatar={personalInfo.avatar && JSON.parse(personalInfo.avatar).file}
                    name={personalInfo.name}
                    workNumber={personalInfo.workNumber}
                >
                    <View className={styles.todayContent}>
                        <Text className={styles.data}>{currentDate} </Text>
                        <Text className={styles.weeks}>{weeks}</Text>
                    </View>
                </TechnicianTop>
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
                        isShowCalendarTop={false}
                        // 天的样式主题配置
                        dayOpt={{
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
                    />
                </View>
                <View className={styles.AttendanceContent}>
                    <View className={styles.contentTop}>
                        <Image src={attendanceImages.time} mode="widthFix" className={styles.time} />
                        {times > 0 ? (
                            <View>
                                今日打卡{times}次，工时共计{hours}小时
                            </View>
                        ) : (
                            <View>今日没有打卡记录</View>
                        )}
                    </View>
                    {times > 0 && (
                        <View className={styles.AttendanceList}>
                            {times > 1 && <View className={styles.line}></View>}
                            {startTime && (
                                <View className={styles.AttendanceListItem}>
                                    <Image src={attendanceImages.startWorkOff} mode="widthFix" className={styles.dot} />
                                    <View>打卡时间{startTime}</View>
                                    <View className={styles.AttendanceStatus}>正常</View>
                                </View>
                            )}
                            {endTime && (
                                <View className={styles.AttendanceListItem}>
                                    <Image src={attendanceImages.endWorkOff} mode="widthFix" className={styles.dot} />
                                    <View>打卡时间{endTime}</View>
                                    <View className={styles.AttendanceStatus}>正常</View>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default AttendanceCalendar
