import Taro, { Component, Config } from '@tarojs/taro'
import { View, Progress } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OverviewMemberProps, OverviewMemberState } from './index.interface'
import styles from './OverviewMember.module.less'
import moment from 'moment'
import SelectTime from '../../components/SelectTime'
import BarChart from '../../components/Echart/BarChart'
import PieChart from '../../components/Echart/PieChart'

@connect(({ OverviewMember }) => ({
    ...OverviewMember,
}))
class OverviewMember extends Component<OverviewMemberProps, OverviewMemberState> {
    config: Config = {
        navigationBarTitleText: '会员概况',
    }
    barChart: any
    pieChart: any
    constructor(props: OverviewMemberProps) {
        super(props)
        this.state = {
            shopId: 15,
            duration: 30,
            startTime: '',
            endTime: moment(new Date()).format('YYYY-MM-DD'),
            consumptionResponses: [], //会员消费排行榜
            recommendResponses: [], //会员推荐数据
            sourceResponses: [], //会员来源渠道数据
            sourceTotal: 0,
            genderResponses: [], //性别比例
            ageResponses: [], //年龄分布
        }
    }

    componentDidMount() {
        // const { shopId } = this.$router.params
        const { shopId } = this.state
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
                            this.getMemberStatistics()
                        },
                    )
                }
            },
        )
    }

    getMemberStatistics = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        this.props.dispatch({
            type: 'OverviewMember/getUserStatistics',
            payload: {
                shopId: this.state.shopId,
                startTime: new Date(this.state.startTime).getTime(),
                endTime: new Date(this.state.endTime).getTime(),
            },
            cb: (data) => {
                Taro.hideLoading()
                const {
                    consumptionResponses,
                    recommendResponses,
                    sourceResponses,
                    genderResponses,
                    ageResponses,
                } = data
                let sourceTotal: number = 0
                if (sourceResponses.length) {
                    sourceResponses.map((item) => {
                        sourceTotal += item.sourceCount
                    })
                }
                this.setState(
                    {
                        consumptionResponses,
                        recommendResponses,
                        sourceResponses,
                        sourceTotal,
                        ageResponses,
                        genderResponses,
                    },
                    () => {
                        if (ageResponses && ageResponses.length > 0) {
                            this.initBarChart(ageResponses)
                        }
                        if (genderResponses && genderResponses.length > 0) {
                            this.initPieChart(genderResponses)
                        }
                    },
                )
            },
        })
    }

    initBarChart = (ageResponses) => {
        let dataX: any = []
        let dataValue: any = []
        let dataZoom: any = []
        let totalMount: any = 0
        ageResponses.map((item) => {
            dataX.push(item.ageGroup)
            totalMount += item.ageNumber
        })
        ageResponses.map((item) => {
            if (totalMount > 0) {
                dataValue.push(Math.ceil((item.ageNumber / totalMount) * 100))
            } else {
                dataValue.push(0)
            }
        })
        if (ageResponses.length > 7) {
            dataZoom = [
                {
                    type: 'inside',
                    start: 50,
                    end: 100,
                },
            ]
        }
        this.barChart.refresh({
            dataZoom,
            dimensions: {
                dataX,
                dataXTitle: ' ',
            },
            yAxis: {
                name: '%',
                dataY: [0, 25, 50, 75, 100],
            },
            measures: [
                {
                    data: dataValue,
                    barWidth: 15, //柱图宽度,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}%',
                        },
                    },
                },
            ],
        })
    }

    initPieChart = (genderResponses) => {
        const chartData: any = []
        genderResponses.map((item) => {
            chartData.push({
                value: item.genderCount,
                name: item.gender,
            })
        })
        this.pieChart.refresh(chartData)
    }

    refBarChart = (node) => (this.barChart = node)

    refPieChart = (node) => (this.pieChart = node)

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
                        this.getMemberStatistics()
                    },
                )
            },
        )
    }

    render() {
        const {
            duration,
            startTime,
            endTime,
            consumptionResponses,
            recommendResponses,
            sourceResponses,
            sourceTotal,
            ageResponses,
        } = this.state
        return (
            <View className={styles.OverviewMemberMain}>
                <View className={styles.top}>
                    <SelectTime
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        onChange={this.onChangeTime}
                    />
                </View>
                <View className={styles.OverviewStoreWrapper}>
                    <View className={styles.commonTitle}>会员消费排行榜</View>
                    {consumptionResponses.length > 0 ? (
                        <View className={styles.RankingList}>
                            {consumptionResponses.map((item) => {
                                return (
                                    <View className={styles.RankingListItem} key={item.userId}>
                                        <View className={item.userName}>{item.userName}</View>
                                        <View className={styles.amount}>￥{item.consumptionAmount}</View>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <View className={styles.noData}>暂无数据</View>
                    )}

                    <View className={styles.commonTitle}>会员推荐数量排行榜</View>
                    {recommendResponses.length > 0 ? (
                        <View className={styles.RankingList}>
                            {recommendResponses.map((item) => {
                                return (
                                    <View className={styles.RankingListItem} key={item.userId}>
                                        <View className={item.userName}>{item.userName}</View>
                                        <View className={styles.amount}>￥{item.recommendCount}</View>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <View className={styles.noData}>暂无数据</View>
                    )}
                    <View className={styles.commonTitle}>会员来源渠道</View>
                    {sourceResponses.length > 0 ? (
                        <View className={styles.cardsMain}>
                            {sourceResponses.map((item) => {
                                return (
                                    <View className={styles.cardsItem} key={item.name}>
                                        <View className={styles.leftTitle}>{item.sourceName}</View>
                                        <View className={styles.cardsItemInfo}>
                                            <View className={styles.progressContent}>
                                                <Progress
                                                    percent={(parseInt(item.sourceCount) / sourceTotal) * 100}
                                                    strokeWidth={10}
                                                    active
                                                    activeColor={'#CB86CE'}
                                                    backgroundColor={'#F9E0FB'}
                                                    duration={15}
                                                />
                                            </View>
                                            <View className={styles.value}>
                                                {Math.round((item.sourceCount / sourceTotal) * 100) + '%'}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <View className={styles.noData}>暂无数据</View>
                    )}
                    <View className={styles.commonTitle}>男女比例</View>
                    <View className={styles.consumption}>
                        <PieChart ref={this.refPieChart} />
                    </View>
                    <View className={styles.commonTitle}>年龄分布</View>
                    {ageResponses.length > 0 ? (
                        <View className={styles.consumption}>
                            <BarChart ref={this.refBarChart} />
                        </View>
                    ) : (
                        <View className={styles.noData}>暂无数据</View>
                    )}
                </View>
            </View>
        )
    }
}

export default OverviewMember
