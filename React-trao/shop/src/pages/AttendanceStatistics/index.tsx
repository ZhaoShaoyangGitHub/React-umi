import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AttendanceStatisticsProps, AttendanceStatisticsState } from './index.interface'
import styles from './AttendanceStatistics.module.less'
import TechnicianTop from '../../components/TechnicianTop'
import AttendanceTabBar from '../../components/AttendanceTabBar'
import { attendanceImages } from '../../assets/img/load'

@connect(({ AttendanceStatistics, Personal }) => ({
    ...AttendanceStatistics,
    ...Personal,
}))
class AttendanceStatistics extends Component<AttendanceStatisticsProps, AttendanceStatisticsState> {
    config: Config = {
        navigationBarTitleText: '考勤统计',
    }
    constructor(props: AttendanceStatisticsProps) {
        super(props)
        this.state = {
            personalInfo: {
                avatar: '',
                workNumber: '',
                name: '',
            },
            year: 2020,
            month: 5,
            attendanceDays: 0,
            averageHours: 0,
            restDays: 0,
            currentMonth: 0,
        }
    }

    componentDidMount() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
        }
        let { year, month } = this.state
        const currentDate = new Date()
        year = currentDate.getFullYear()
        month = currentDate.getMonth() + 1
        this.setState({
            year,
            month,
            currentMonth: month,
        })
        this.getStatisticalDate()
    }

    changeDate = (direction) => {
        let { year, month, currentMonth } = this.state
        if (direction === 'prev') {
            month--
            if (month <= 0) {
                month = 12
                year--
            }
        }
        if (direction === 'next') {
            if (month === currentMonth) {
                Taro.showToast({
                    title: '下个月无考勤记录',
                    mask: true,
                    icon: 'none',
                })
                return
            }
            month++
            if (month >= 13) {
                month = 1
                year++
            }
        }
        this.setState(
            {
                year,
                month,
            },
            () => {
                this.getStatisticalDate()
            },
        )
    }

    getStatisticalDate = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { year, month } = this.state
        this.props.dispatch({
            type: 'AttendanceStatistics/getStatistical',
            payload: {
                attendanceTime: new Date(`${year}-${month > 9 ? month : '0' + month}-01`.replace(/-/g, '/')).getTime(),
            },
            cb: (data) => {
                const { avatar, workNumber, userName, attendanceDays, averageHours, restDays } = data
                this.setState({
                    personalInfo: {
                        avatar,
                        workNumber,
                        name: userName,
                    },
                    attendanceDays,
                    averageHours,
                    restDays,
                })
                Taro.hideLoading()
            },
        })
    }

    goAttendanceCalendarPage = () => {
        Taro.navigateTo({
            url: '/pages/AttendanceCalendar/index',
        })
    }

    render() {
        const tabBar= {
            currentId: 1,
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
        },
        const { personalInfo, year, month, attendanceDays, averageHours, restDays } = this.state
        return (
            <View className={styles.AttendanceStatisticsMain}>
                <View className={styles.monthWrapper}>
                    <View className={styles.monthLeft}>
                        <View className={styles.box}>月</View>
                        <View className={styles.box}>周</View>
                    </View>
                    <View className={styles.changeMonth}>
                        <View
                            className={styles.changeIcon}
                            onClick={() => {
                                this.changeDate('prev')
                            }}
                        >
                            <Image src={attendanceImages.prevIcon} mode="widthFix" className={styles.icon} />
                        </View>
                        <View className={styles.text}>{year + '.' + (month > 9 ? month : '0' + month)}</View>
                        <View
                            className={styles.changeIcon}
                            onClick={() => {
                                this.changeDate('next')
                            }}
                        >
                            <Image src={attendanceImages.nextIcon} mode="widthFix" className={styles.icon} />
                        </View>
                    </View>
                </View>
                <TechnicianTop
                    avatar={personalInfo.avatar && JSON.parse(personalInfo.avatar).file}
                    name={personalInfo.name}
                    workNumber={personalInfo.workNumber}
                >
                    <View className={styles.monthlyCalendar} onClick={this.goAttendanceCalendarPage}>
                        <Image src={attendanceImages.calendar} mode="widthFix" className={styles.calendar} />
                        <Text>打卡月历</Text>
                    </View>
                </TechnicianTop>
                <View className={styles.workDataList}>
                    <View className={styles.workDataListItem}>
                        <View>平均工时</View>
                        <View className={styles.rightDate}>
                            <Text>{Math.abs(averageHours)}小时</Text>
                            <Image src={attendanceImages.findMore} className={styles.findMore} mode="widthFix" />
                        </View>
                    </View>
                    <View className={styles.workDataListItem}>
                        <View>出勤天数</View>
                        <View className={styles.rightDate}>
                            <Text>{attendanceDays}天</Text>
                            <Image src={attendanceImages.findMore} className={styles.findMore} mode="widthFix" />
                        </View>
                    </View>
                    <View className={styles.workDataListItem}>
                        <View>休息天数</View>
                        <View className={styles.rightDate}>
                            <Text>{restDays}天</Text>
                            <Image src={attendanceImages.findMore} className={styles.findMore} mode="widthFix" />
                        </View>
                    </View>
                </View>
                <AttendanceTabBar tabBar={tabBar} />
            </View>
        )
    }
}

export default AttendanceStatistics
