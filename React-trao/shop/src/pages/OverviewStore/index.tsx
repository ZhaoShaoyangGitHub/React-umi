import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Progress } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OverviewStoreProps, OverviewStoreState } from './index.interface'
import styles from './OverviewStore.module.less'
import moment from 'moment'
import SelectTime from '../../components/SelectTime'

@connect(({ OverviewStore }) => ({
    ...OverviewStore,
}))
class OverviewStore extends Component<OverviewStoreProps, OverviewStoreState> {
    config: Config = {
        navigationBarTitleText: '门店概况',
    }
    constructor(props: OverviewStoreProps) {
        super(props)
        this.state = {
            duration: 30,
            startTime: '',
            endTime: moment(new Date()).format('YYYY-MM-DD'),
            tradeTotalAmount: 0,
            payTradeNumber: 0,
            serviceUserNumber: 0,
            payResponse: [],
            tradeTotalCount: 0,
            payTradeTotalCount: 0,
            cancelTradeTotalCount: 0,
            refundTradeTotalCount: 0,
            packageResponse: [],
            cardsAmount: 0,
        }
    }

    componentDidMount() {
        const { endTime } = this.state
        let date1 = new Date(endTime)
        let date2 = new Date(date1)
        date2.setDate(date1.getDate() - 30)
        this.setState(
            {
                startTime: moment(new Date(date2)).format('YYYY-MM-DD'),
            },
            () => {
                this.getShopStatistics()
            },
        )
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
                        this.getShopStatistics()
                    },
                )
            },
        )
    }

    getShopStatistics = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        this.props.dispatch({
            type: 'OverviewStore/getShopStatistics',
            payload: {
                startTime: new Date(this.state.startTime).getTime(),
                endTime: new Date(this.state.endTime).getTime(),
            },
            cb: (data) => {
                Taro.hideLoading()
                let { cardsAmount } = this.state
                if (data && data.packageResponse.length) {
                    data.packageResponse.map((item) => {
                        cardsAmount += item.packageNumber
                    })
                }
                this.setState({
                    tradeTotalAmount: data && data.tradeTotalAmount,
                    payTradeNumber: data && data.payTradeNumber,
                    serviceUserNumber: data && data.serviceUserNumber,
                    payResponse: data && data.payResponse,
                    tradeTotalCount: data && data.tradeTotalCount,
                    payTradeTotalCount: data && data.payTradeTotalCount,
                    cancelTradeTotalCount: data && data.cancelTradeTotalCount,
                    refundTradeTotalCount: data && data.refundTradeTotalCount,
                    packageResponse: data && data.packageResponse,
                    cardsAmount,
                })
            },
        })
    }

    render() {
        const {
            duration,
            startTime,
            endTime,
            tradeTotalAmount,
            payTradeNumber,
            serviceUserNumber,
            payResponse,
            tradeTotalCount,
            payTradeTotalCount,
            cancelTradeTotalCount,
            refundTradeTotalCount,
            packageResponse,
            cardsAmount,
        } = this.state
        return (
            <View className={styles.OverviewStoreMain}>
                <SelectTime duration={duration} startTime={startTime} endTime={endTime} onChange={this.onChangeTime} />
                <View className={styles.OverviewStoreWrapper}>
                    <View className={styles.storeBusinessData}>
                        <View className={styles.dataBox}>
                            <View>营业额(元)</View>
                            <View className={styles.number}>{tradeTotalAmount}</View>
                        </View>
                        <View className={styles.dataBox}>
                            <View>订单数</View>
                            <View className={styles.number}>{payTradeNumber}</View>
                        </View>
                        <View className={styles.dataBox}>
                            <View>服务人次</View>
                            <View className={styles.number}>{serviceUserNumber}</View>
                        </View>
                    </View>
                    <View className={styles.payDataWrapper}>
                        <View className={styles.commonTitle}>支付渠道流水数据</View>
                        {/* <View className={styles.payBar}></View> */}
                        <View className={styles.payData}>
                            {payResponse.length > 0 &&
                                payResponse.map((item) => {
                                    return (
                                        <View className={styles.payDataItem} key={item.payType}>
                                            <Text className={styles.leftTitle}>{item.payTypeStr}：</Text>
                                            <Text>￥{item.amount.toFixed(2)}</Text>
                                        </View>
                                    )
                                })}
                        </View>
                    </View>
                    <View className={styles.orderDataWrapper}>
                        <View className={styles.commonTitle}>订单数据</View>
                        <View className={styles.orderData}>
                            <View className={styles.orderDataItem}>
                                <View className={styles.leftTitle}>总订单量</View>
                                <View>{tradeTotalCount}</View>
                            </View>
                            <View className={styles.orderDataItem}>
                                <View className={styles.leftTitle}>支付订单</View>
                                <View>{payTradeTotalCount}</View>
                            </View>
                            <View className={styles.orderDataItem}>
                                <View className={styles.leftTitle}>取消订单</View>
                                <View>{cancelTradeTotalCount}</View>
                            </View>
                            <View className={styles.orderDataItem}>
                                <View className={styles.leftTitle}>退款订单</View>
                                <View>{refundTradeTotalCount}</View>
                            </View>
                        </View>
                    </View>
                    <View className={styles.cardsWrapper}>
                        <View className={styles.commonTitle}>
                            套卡情况<Text className={styles.subTitle}>(总量{cardsAmount})</Text>
                        </View>
                        <View className={styles.cardsMain}>
                            {packageResponse.length &&
                                packageResponse.map((item) => {
                                    return (
                                        <View className={styles.cardsItem} key={item.name}>
                                            <View className={styles.leftTitle}>{item.packageName}</View>
                                            <View className={styles.cardsItemInfo}>
                                                <View className={styles.progressContent}>
                                                    <Progress
                                                        percent={(parseInt(item.packageNumber) / cardsAmount) * 100}
                                                        strokeWidth={10}
                                                        active
                                                        activeColor={'#CB86CE'}
                                                        backgroundColor={'#F9E0FB'}
                                                        duration={15}
                                                    />
                                                </View>
                                                <View className={styles.value}>{item.packageNumber}</View>
                                            </View>
                                        </View>
                                    )
                                })}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default OverviewStore
