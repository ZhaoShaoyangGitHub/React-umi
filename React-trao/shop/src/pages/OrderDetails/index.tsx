import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OrderDetailsProps, OrderDetailsState } from './index.interface'
import styles from './OrderDetails.module.less'
import { timestampToTime } from '../../utils/function'
import { BASEURL } from '../../config/index'

@connect(({ OrderDetails }) => ({
    ...OrderDetails,
}))
class OrderDetails extends Component<OrderDetailsProps, OrderDetailsState> {
    config: Config = {
        navigationBarTitleText: '订单详情',
    }
    constructor(props: OrderDetailsProps) {
        super(props)
        this.state = {
            tradeId: 0,
            orderDetails: {},
        }
    }

    componentDidMount() {
        const { tradeId } = this.$router.params
        if (tradeId) {
            this.setState(
                {
                    tradeId: +tradeId,
                },
                () => {
                    this.getOrderDetails()
                },
            )
        }
    }

    getOrderDetails = () => {
        this.props.dispatch({
            type: 'OrderDetails/getOrderDetails',
            payload: {
                tradeId: this.state.tradeId,
            },
            cb: (data) => {
                console.log(data)
                this.setState({
                    orderDetails: data,
                })
            },
        })
    }

    render() {
        const { orderDetails } = this.state
        return (
            <View className={styles.OrderDetailsMain}>
                <View className={styles.orderDetailsWrapper}>
                    <View className={styles.orderTop}>
                        <View className={styles.goodsImage}>
                            {orderDetails.orderResponses[0].goodsThumb && (
                                <Image
                                    src={BASEURL + orderDetails.orderResponses[0].goodsThumb}
                                    className={styles.goodsThumb}
                                />
                            )}
                        </View>
                        <View className={styles.payAmount}>-{orderDetails.payAmount}</View>
                    </View>
                    <View className={styles.title}>订单信息</View>
                    <View className={styles.orderInfo}>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>当前状态</View>
                            <View className={styles.right}>{orderDetails.status.description}</View>
                        </View>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>商品</View>
                            <View className={styles.right}>{orderDetails.orderResponses[0].goodsTitle}</View>
                        </View>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>商户全称</View>
                            <View className={styles.right}>{orderDetails.shopName}</View>
                        </View>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>支付时间</View>
                            <View className={styles.right}>
                                {orderDetails.payTime && timestampToTime(orderDetails.payTime)}
                            </View>
                        </View>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>支付方式</View>
                            <View className={styles.right}>{orderDetails.payType.description}</View>
                        </View>
                        <View className={styles.orderInfoItem}>
                            <View className={styles.left}>交易单号</View>
                            <View className={styles.right}>{orderDetails.tradeSn}</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default OrderDetails
