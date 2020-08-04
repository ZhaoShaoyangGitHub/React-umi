import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text, Input, Form } from '@tarojs/components'
import moment from 'moment'
import { connect } from '@tarojs/redux'
import Price from '../../components/Price'
import { MyAchievementProps, MyAchievementState } from './index.interface'
import { timestampToTime, addComma } from '../../utils/function'
import CartItem from '../../components/CartItem/index'
import { BASEURL } from '../../config/index'
import styles from './MyAchievement.module.less'
// import { } from '../../components'

@connect(({ MyAchievement }) => ({
    ...MyAchievement,
}))
class MyAchievement extends Component<MyAchievementProps, MyAchievementState> {
    config: Config = {
        navigationBarTitleText: '我的业绩',
    }
    constructor(props: MyAchievementProps) {
        super(props)
        this.state = {
            orderList: [],
            date: moment().format('YYYY-MM'),
            totalMoney: 0,
            weekMoney: 0,
            totalNum: 0,
            monthMoney: 0,
            currentMonthMoney: 0,
            currentMonthNum: 0,
        }
    }

    componentDidShow() {
        this.props.dispatch({
            type: 'MyAchievement/achievementData',
            params: {},
            cb: (data) => {
                this.setState({
                    totalMoney: data.signatureAmount,
                    weekMoney: data.weekSignatureAmount,
                    totalNum: data.signatureNumber,
                    monthMoney: data.monthSignatureAmount,
                })
            },
        })
        this.getOrderList()
    }

    getOrderList = () => {
        const { date } = this.state
        this.props.dispatch({
            type: 'MyAchievement/getOrderList',
            params: {
                startTime: date + '-01',
            },
            cb: (code, data, message) => {
                if (code !== 'OK') {
                    return
                }
                const { tradeResponses } = data
                if (tradeResponses.length) {
                    for (let i = 0; i < tradeResponses.length; i++) {
                        for (let j = i + 1; j < tradeResponses.length; j++) {
                            let change: any = ''
                            if (tradeResponses[i].createTime < tradeResponses[j].createTime) {
                                change = tradeResponses[i].createTime
                                tradeResponses[i].createTime = tradeResponses[j].createTime
                                tradeResponses[j].createTime = change
                            }
                        }
                    }
                }
                this.setState({
                    orderList: data.tradeResponses,
                    currentMonthNum: data.tradeNumber,
                    currentMonthMoney: data.totalAmount,
                })
            },
        })
    }
    getTotal = (trade, type) => {
        switch (type) {
            case 'num':
                let totalNum = 0
                for (let i = 0; i < trade.orderResponses.length; i++) {
                    totalNum += trade.orderResponses[i].goodsAmount
                }
                return totalNum
            case 'price':
                let totalPrice = 0
                for (let i = 0; i < trade.orderResponses.length; i++) {
                    totalPrice += trade.orderResponses[i].goodsPrice
                }
                return totalPrice
            default:
                return ''
        }
    }
    handleTradeClick = (trade) => {
        Taro.navigateTo({
            url: `/pages/OrderDetail/index?tradeId=${trade.id}`,
        })
    }

    handleSelectDate = (e) => {
        this.setState(
            {
                date: e.detail.value,
            },
            () => {
                this.getOrderList()
            },
        )
    }
    render() {
        const {
            orderList,
            date,
            totalMoney,
            totalNum,
            weekMoney,
            monthMoney,
            currentMonthMoney,
            currentMonthNum,
        } = this.state
        const achievementTypeList = [
            {
                title: '累计签单(元)',
                value: addComma(totalMoney),
            },
            {
                title: '累计单数(单)',
                value: addComma(totalNum),
            },
            {
                title: '本月签单(元)',
                value: addComma(monthMoney),
            },
            {
                title: '本周签单(元)',
                value: addComma(weekMoney),
            },
        ]
        return (
            <View className={styles.MyAchievementMain}>
                <View className={styles.topWrapper}>
                    <View className={styles.columnLine} />
                    <View className={styles.rowLine} />
                    {achievementTypeList.map((item) => (
                        <View className={styles.typeItem}>
                            <Text>{item.title}</Text>
                            <Text>{item.value}</Text>
                        </View>
                    ))}
                </View>
                <View className={styles.resultList}>
                    <View className={styles.filter}>
                        <Picker
                            mode="date"
                            onChange={this.handleSelectDate}
                            value={date}
                            fields="month"
                            end={moment(new Date()).format('YYYY-MM-DD HH:mm')}
                        >
                            <View className={styles.picker}>
                                <Text>{date}▼</Text>
                            </View>
                        </Picker>
                        <Text className={styles.amout}>
                            ￥{currentMonthMoney.toFixed(2)} (共{currentMonthNum}单)
                        </Text>
                    </View>
                    {orderList.length > 0 &&
                        orderList.map((trade: any) => {
                            return (
                                <View
                                    className={styles.itemsWrapper}
                                    key={trade.tradeId}
                                    onClick={() => this.handleTradeClick(trade)}
                                >
                                    <View className={styles.itemsTitle}>
                                        {trade.userName} {trade.userPhone}
                                        <Text className={styles.extraButton}>
                                            {moment(trade.createTime).format('YYYY-MM-DD HH:mm')}
                                        </Text>
                                    </View>
                                    <View className={styles.itemsChildren}>
                                        {trade.orderResponses.map((item: any) => {
                                            return (
                                                <View className={styles.itemWrapper} key={item.cartId}>
                                                    <View className={styles.cartItemWrapper}>
                                                        <CartItem
                                                            cartId={item.cartId}
                                                            goodsId={item.goodsId}
                                                            goodsName={item.goodsTitle}
                                                            price={item.goodsPrice}
                                                            amount={item.goodsAmount}
                                                            imgSrc={BASEURL + item.goodsThumb}
                                                            inventory={item.inventory}
                                                            isValid={item.isValid}
                                                            type="order"
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View className={styles.itemsStatistic}>
                                        共{this.getTotal(trade, 'num')}件, 合计：
                                        <Price value={trade.totalAmount} />
                                    </View>
                                </View>
                            )
                        })}
                    {orderList.length === 0 && (
                        <View className={styles.emptyWrapper}>
                            <View className={styles.emptyWord}>暂无数据</View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default MyAchievement
