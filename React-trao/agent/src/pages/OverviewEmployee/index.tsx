import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OverviewEmployeeProps, OverviewEmployeeState } from './index.interface'
import styles from './OverviewEmployee.module.less'
import moment from 'moment'
import SelectTime from '../../components/SelectTime'
import BarChart from '../../components/Echart/BarChart'

@connect(({ OverviewEmployee }) => ({
    ...OverviewEmployee,
}))
class OverviewEmployee extends Component<OverviewEmployeeProps, OverviewEmployeeState> {
    config: Config = {
        navigationBarTitleText: '员工概况',
    }
    barChart1: any //员工业绩
    barChart2: any //员工服务时长
    barChart3: any //员工服务次数
    constructor(props: OverviewEmployeeProps) {
        super(props)
        this.state = {
            shopId: 14,
            duration: 30,
            startTime: '',
            endTime: moment(new Date()).format('YYYY-MM-DD'),
            attendanceResponses: [], //工时统计
            achievementResponses: [], //员工业绩
            serviceResponses: [], //员工服务时长
            serviceNumberResponses: [], //员工服务次数
            serviceDetailResponses: [], //员工服务详情
        }
    }

    componentDidMount() {
        const { shopId } = this.$router.params
        const { endTime } = this.state
        let date1 = new Date(endTime)
        let date2 = new Date(date1)
        date2.setDate(date1.getDate() - 30)
        this.setState(
            {
                startTime: moment(new Date(date2)).format('YYYY-MM-DD'),
            },
            () => {
                if (shopId) {
                    this.setState(
                        {
                            shopId: +shopId,
                        },
                        () => {
                            this.getStaffStatistics()
                        },
                    )
                }
            },
        )
    }

    getStaffStatistics = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        this.props.dispatch({
            type: 'OverviewEmployee/getStaffStatistics',
            payload: {
                shopId: this.state.shopId,
                startTime: new Date(this.state.startTime).getTime(),
                endTime: new Date(this.state.endTime).getTime(),
            },
            cb: (data) => {
                Taro.hideLoading()
                const {
                    attendanceResponses = [],
                    achievementResponses = [],
                    serviceResponses = [],
                    serviceNumberResponses = [],
                    serviceDetailResponses = [],
                } = data
                this.setState(
                    {
                        attendanceResponses,
                        achievementResponses,
                        serviceResponses,
                        serviceNumberResponses,
                        serviceDetailResponses,
                    },
                    () => {
                        this.initBarChart1()
                        this.initBarChart2()
                        // this.initBarChart3()
                    },
                )
            },
        })
    }
    //员工业绩图
    initBarChart1 = () => {
        const { achievementResponses } = this.state
        let dataX: any = []
        let dataValue: any = []
        let dataZoom: any = []
        if (achievementResponses.length > 0) {
            achievementResponses.map((item) => {
                dataX.push(item.userName)
                dataValue.push(item.amount / 10000)
            })
            if (achievementResponses.length > 7) {
                dataZoom = [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100,
                    },
                ]
            }
            this.barChart1.refresh({
                dataZoom,
                dimensions: {
                    dataX,
                    dataXTitle: ' ',
                },
                yAxis: {
                    name: '万元',
                },
                measures: [
                    {
                        data: dataValue,
                        barWidth: 15, //柱图宽度,
                    },
                ],
            })
        }
    }
    //员工服务时长
    initBarChart2 = () => {
        const { serviceResponses } = this.state
        let dataX: any = []
        let dataValue: any = []
        let dataZoom: any = []
        if (serviceResponses.length > 0) {
            serviceResponses.map((item) => {
                dataX.push(item.userName)
                dataValue.push(item.number)
            })
            if (serviceResponses.length > 7) {
                dataZoom = [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100,
                    },
                ]
            }
            this.barChart2.refresh({
                dataZoom,
                dimensions: {
                    dataX,
                    dataXTitle: ' ',
                },
                yAxis: {
                    name: '小时',
                },
                measures: [
                    {
                        data: dataValue,
                        barWidth: 15, //柱图宽度,
                    },
                ],
            })
        }
    }
    //员工服务次数
    initBarChart3 = () => {
        const { serviceNumberResponses } = this.state
        let dataX: any = []
        let dataValue: any = []
        let dataZoom: any = []
        if (serviceNumberResponses.length > 0) {
            serviceNumberResponses.map((item) => {
                dataX.push(item.userName)
                dataValue.push(item.serviceNumber)
            })
            if (serviceNumberResponses.length > 7) {
                dataZoom = [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100,
                    },
                ]
            }
            this.barChart3.refresh({
                dataZoom,
                dimensions: {
                    dataX,
                    dataXTitle: ' ',
                },
                yAxis: {
                    name: '次',
                },
                measures: [
                    {
                        data: dataValue,
                        barWidth: 15, //柱图宽度,
                    },
                ],
            })
        }
    }

    onChangeTime = (obj) => {
        const { startTime, endTime } = this.state
        if (obj.type === 'endTime') {
            if (new Date(obj.value) <= new Date(startTime)) {
                Taro.showToast({
                    title: '开始日期不能大于结束日期',
                    mask: true,
                })
                return
            }
        }
        if (obj.type === 'startTime') {
            if (new Date(obj.value) >= new Date(endTime)) {
                Taro.showToast({
                    title: '开始日期不能大于结束日期',
                    mask: true,
                })
                return
            }
        }
        this.setState(
            {
                [obj.type]: obj.value,
            },
            () => {
                let days = new Date(this.state.endTime).getTime() - new Date(this.state.startTime).getTime()
                this.setState(
                    {
                        duration: days / (1000 * 60 * 60 * 24),
                    },
                    () => {
                        this.getStaffStatistics()
                    },
                )
            },
        )
    }

    refBarChart1 = (node) => (this.barChart1 = node)
    refBarChart2 = (node) => (this.barChart2 = node)
    refBarChart3 = (node) => (this.barChart3 = node)

    render() {
        const {
            duration,
            startTime,
            endTime,
            attendanceResponses,
            achievementResponses,
            serviceResponses,
            serviceNumberResponses,
        } = this.state
        return (
            <View className={styles.OverviewEmployeeMain}>
                <View className={styles.top}>
                    <SelectTime
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        onChange={this.onChangeTime}
                    />
                </View>
                <View className={styles.OverviewStoreWrapper}>
                    <View className={styles.hoursStatistics}>
                        <View className={styles.commonTitle}>工时统计</View>
                        {attendanceResponses.length < 1 ? (
                            <View className={styles.noData}>暂无数据</View>
                        ) : (
                            <View className={styles.hoursStatisticsWrapper}>
                                <View className={styles.tableHeader}>
                                    <View className={styles.tableItem}>姓名</View>
                                    <View className={styles.tableItem}>出勤/天</View>
                                    <View className={styles.tableItem}>休息/天</View>
                                    <View className={styles.tableItem}>请假/天</View>
                                    <View className={styles.tableItem}>工时/小时</View>
                                </View>
                                {attendanceResponses.map((item) => {
                                    return (
                                        <View className={styles.tableList} key={item.userName}>
                                            <View className={styles.tableItem}>{item.userName}</View>
                                            <View className={styles.tableItem}>{item.attendanceDay}</View>
                                            <View className={styles.tableItem}>{item.restDay}</View>
                                            <View className={styles.tableItem}>{item.leaveDay}</View>
                                            <View className={styles.tableItem}>{item.workingHours}</View>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                    </View>
                    <View className={styles.achievement}>
                        <View className={styles.commonTitle}>员工业绩</View>
                        {achievementResponses.length < 1 ? (
                            <View className={styles.noData}>暂无数据</View>
                        ) : (
                            <View>
                                <View className={styles.rankWrapper}>
                                    <BarChart ref={this.refBarChart1} />
                                </View>
                                <View className={styles.achievementWrapper}>
                                    {achievementResponses.map((item) => {
                                        return (
                                            <View className={styles.list} key={item.userName}>
                                                <View>{item.userName}：</View>
                                                <View className={styles.amount}>￥{item.amount}</View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        )}
                    </View>
                    <View>
                        <View className={styles.commonTitle}>员工服务时长排行</View>
                        {serviceResponses.length < 1 ? (
                            <View className={styles.noData}>暂无数据</View>
                        ) : (
                            <View className={styles.rankWrapper}>
                                <BarChart ref={this.refBarChart2} />
                            </View>
                        )}
                    </View>
                    <View>
                        <View className={styles.commonTitle}>员工服务次数排行</View>
                        {serviceNumberResponses.length < 1 ? (
                            <View className={styles.noData}>暂无数据</View>
                        ) : (
                            <View className={styles.rankWrapper}>
                                <BarChart ref={this.refBarChart3} />
                            </View>
                        )}
                    </View>
                    <View>
                        <View className={styles.commonTitle}>员工服务详情</View>
                        <View className={styles.hoursStatisticsWrapper}>
                            <View className={styles.tableHeader}>
                                <View className={styles.tableItem}>姓名</View>
                                <View className={styles.tableItem}>出勤/天</View>
                                <View className={styles.tableItem}>休息/天</View>
                                <View className={styles.tableItem}>请假/天</View>
                                <View className={styles.tableItem}>服务总数</View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default OverviewEmployee
