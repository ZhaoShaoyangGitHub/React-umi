import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OverviewGoodsProps, OverviewGoodsState } from './index.interface'
import styles from './OverviewGoods.module.less'
import moment from 'moment'
import SelectTime from '../../components/SelectTime'
import BarChart from '../../components/Echart/BarChart'

@connect(({ OverviewGoods }) => ({
    ...OverviewGoods,
}))
class OverviewGoods extends Component<OverviewGoodsProps, OverviewGoodsState> {
    config: Config = {
        navigationBarTitleText: '商品概况',
    }
    barChart: any
    constructor(props: OverviewGoodsProps) {
        super(props)
        this.state = {
            shopId: 14,
            duration: 30,
            startTime: '',
            endTime: moment(new Date()).format('YYYY-MM-DD'),
            typeResponses: [], //商品类型消耗
            goodsSaleResponses: [], //商品销售数据
            chartData: {},
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
                            this.getGoodsStatistics()
                        },
                    )
                }
            },
        )
    }

    getGoodsStatistics = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        this.props.dispatch({
            type: 'OverviewGoods/getGoodsStatistics',
            payload: {
                shopId: this.state.shopId,
                startTime: new Date(this.state.startTime).getTime(),
                endTime: new Date(this.state.endTime).getTime(),
            },
            cb: (data) => {
                Taro.hideLoading()
                const { typeResponses, goodsSaleResponses } = data
                let dataX: any = []
                let dataValue: any = []
                let dataZoom: any = []
                let totalMount: any = 0
                if (typeResponses && typeResponses.length > 0) {
                    typeResponses.map((item) => {
                        dataX.push(item.name)
                        totalMount += item.number
                    })
                    typeResponses.map((item) => {
                        if (totalMount > 0) {
                            dataValue.push(Math.ceil((item.number / totalMount) * 100))
                        } else {
                            dataValue.push(0)
                        }
                    })
                    if (typeResponses.length > 7) {
                        dataZoom = [
                            {
                                type: 'inside',
                                start: 50,
                                end: 100,
                            },
                        ]
                    }
                }
                this.setState(
                    {
                        typeResponses,
                        goodsSaleResponses,
                        chartData: {
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
                        },
                    },
                    () => {
                        if (typeResponses.length > 0) {
                            this.barChart.refresh(this.state.chartData)
                        }
                    },
                )
            },
        })
    }

    refBarChart = (node) => (this.barChart = node)

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
                        this.getGoodsStatistics()
                    },
                )
            },
        )
    }

    render() {
        const { duration, startTime, endTime, typeResponses, goodsSaleResponses } = this.state
        return (
            <View className={styles.OverviewGoodsMain}>
                <View className={styles.top}>
                    <SelectTime
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        onChange={this.onChangeTime}
                    />
                </View>
                <View className={styles.OverviewStoreWrapper}>
                    <View>
                        <View className={styles.commonTitle}>商品类型消耗</View>
                        {typeResponses.length > 0 ? (
                            <View className={styles.consumption}>
                                <BarChart ref={this.refBarChart} />
                            </View>
                        ) : (
                            <View className={styles.noData}>暂无数据</View>
                        )}
                    </View>
                    <View className={styles.hoursStatistics}>
                        <View className={styles.commonTitle}>商品销售数据</View>
                        {goodsSaleResponses.length > 0 ? (
                            <View className={styles.hoursStatisticsWrapper}>
                                <View className={styles.tableHeader}>
                                    <View className={styles.tableItem}>商品名称</View>
                                    <View className={styles.tableItem}>销售数量</View>
                                    <View className={styles.tableItem}>销售金额</View>
                                </View>
                                {goodsSaleResponses.map((item) => {
                                    return (
                                        <View className={styles.tableList} key={item.goodsName}>
                                            <View className={styles.tableItem}>{item.goodsName}</View>
                                            <View className={styles.tableItem}>{item.goodsSaleNumber}</View>
                                            <View className={styles.tableItem}>￥{item.goodsSaleAmount}</View>
                                        </View>
                                    )
                                })}
                            </View>
                        ) : (
                            <View className={styles.noData}>暂无数据</View>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default OverviewGoods
