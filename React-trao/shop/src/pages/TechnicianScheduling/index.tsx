import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import CalendarNormal from '../../components/CalendarNormal/index'
import { connect } from '@tarojs/redux'
import { TechnicianSchedulingProps, TechnicianSchedulingState } from './index.interface'
import noData from '../../assets/img/empty/no-data.png'
import styles from './TechnicianScheduling.module.less'

@connect(({ TechnicianScheduling }) => ({
    ...TechnicianScheduling,
}))
class TechnicianScheduling extends Component<TechnicianSchedulingProps, TechnicianSchedulingState> {
    config: Config = {
        navigationBarTitleText: '技师排班',
    }
    constructor(props: TechnicianSchedulingProps) {
        super(props)
        this.state = {
            dotOpt: [],
            schedulingList: [],
            currentTime: new Date().getTime(),
        }
    }
    componentDidShow = () => {
        this.getSchedulingList()
    }

    getSchedulingList = () => {
        const { currentTime } = this.state
        this.props.dispatch({
            type: 'TechnicianScheduling/getScheduling',
            params: { time: currentTime },
            cb: (data) => {
                this.setState({ schedulingList: data })
            },
        })
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
                this.getSchedulingList()
            },
        )
    }

    handleToScheduling = () => {
        Taro.navigateTo({
            url: '/pages/StartScheduling/index',
        })
    }

    handleEdit = (id) => {
        Taro.navigateTo({
            url: `/pages/EditScheduling/index?technicianId=${id}`,
        })
    }

    render() {
        const { dotOpt, schedulingList } = this.state
        return (
            <View className={styles.TechnicianSchedulingMain}>
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
                <View className={styles.list}>
                    {schedulingList.length ? (
                        schedulingList.map((item) => (
                            <View className={styles.infoBox} key={item.id}>
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

                                <Text className={styles.cancelButton} onClick={() => this.handleEdit(item.userId)}>
                                    修改排班
                                </Text>
                            </View>
                        ))
                    ) : (
                        <View>
                            <Image src={noData} className={styles.noDataImg} />
                            <View className={styles.word}>暂时没有排班呦～</View>
                        </View>
                    )}
                </View>

                <View className={styles.button} onClick={this.handleToScheduling}>
                    我要排班
                </View>
            </View>
        )
    }
}

export default TechnicianScheduling
