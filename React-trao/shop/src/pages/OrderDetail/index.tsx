import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OrderDetailProps, OrderDetailState } from './index.interface'
import styles from './OrderDetail.module.less'
import CartItem from '../../components/CartItem/index'
import moment from 'moment'
// import { } from '../../components'

@connect(({ OrderDetail }) => ({
    ...OrderDetail,
}))
class OrderDetail extends Component<OrderDetailProps, OrderDetailState> {
    config: Config = {
        navigationBarTitleText: '业绩详情',
    }

    constructor(props: OrderDetailProps) {
        super(props)
        this.state = {
            cancelVisible: false,
            receiveVisible: false,
            countTimer: 0,
            endTime: '',
        }
    }

    componentDidShow() {
        this.getDetail()
    }

    getDetail = () => {
        const { tradeId } = this.$router.params
        this.props.dispatch({
            type: 'OrderDetail/get',
            payload: {
                tradeId: tradeId || 4,
            },
            callback: (data) => {},
        })
    }

    getTotalNum = () => {
        const { data } = this.props
        if (!data.children || !data.children.length) {
            return 0
        }
        return data.children.reduce((sum: number, acc: any) => {
            return (sum = sum + acc.amount)
        }, 0)
    }

    render() {
        const { data } = this.props
        return (
            <View className={styles.OrderDetailMain}>
                <View className={styles.contentWrapper}>
                    <View className={styles.itemsWrapper}>
                        {/* <View className={styles.itemsTitle}>{data.shopName}</View> */}
                        <View className={styles.itemsTitle}>
                            {data.userName} {data.userPhone}
                        </View>
                        <View className={styles.itemsChildren}>
                            {data &&
                                data.children.length > 0 &&
                                data.children.map((order: any) => {
                                    return (
                                        <View className={styles.itemWrapper} key={order.id}>
                                            <View className={styles.cartItemWrapper}>
                                                <CartItem
                                                    cartId={order.id}
                                                    goodsId={order.goodsId}
                                                    goodsName={order.goodsName}
                                                    price={order.price}
                                                    amount={order.amount}
                                                    imgSrc={order.imageUrl}
                                                    isValid={order.true}
                                                    type="order"
                                                />
                                            </View>
                                        </View>
                                    )
                                })}
                        </View>
                        {/* <View className={styles.itemsStatistic}>
                            共{this.getTotalNum()}件, 合计：
                            <Price value={data.totalAmount} />
                        </View> */}
                    </View>

                    <View className={styles.info}>
                        <View className={styles.blockTitle}>价格</View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>价格</View>
                            <View className={styles.infoValue}>¥{(data.totalAmount || 0).toFixed(2)}</View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>优惠金额</View>
                            <View className={styles.infoValue}>-¥{(data.discountAmount || 0).toFixed(2)}</View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>实付金额</View>
                            <View className={styles.infoValue}>
                                <Text className={styles.colorStrong}>¥{(data.payAmount || 0).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View className={styles.info}>
                        <View className={styles.blockTitle}>订单信息</View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>订单编号</View>
                            <View className={styles.infoValue}>{data.tradeSn}</View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>下单时间</View>
                            <View className={styles.infoValue}>
                                {data.createTime && moment(data.createTime).format('YYYY-MM-DD HH:mm')}
                            </View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>支付方式</View>
                            <View className={styles.infoValue}>
                                <Text className={styles.colorStrong}>{data.payType.description}</Text>
                            </View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>支付时间</View>
                            <View className={styles.infoValue}>
                                {data.payTime && moment(data.payTime).format('YYYY-MM-DD HH:mm')}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default OrderDetail
