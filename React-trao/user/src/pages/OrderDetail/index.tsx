import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { OrderDetailProps, OrderDetailState } from './index.interface'
import styles from './OrderDetail.module.less'
import Price from '../../components/Price'
import CartItem from '../../components/CartItem/index'
import OrderOperation from '../../components/OrderOperation'
import ConfirmModal from '../../components/ConfirmModal'
import { getRestTime } from '../../utils/function'
import moment from 'moment'
import { Icons } from '../../assets/img/load'

@connect(({ OrderDetail }) => ({
    ...OrderDetail,
}))
class OrderDetail extends Component<OrderDetailProps, OrderDetailState> {
    config: Config = {
        navigationBarTitleText: '订单详情',
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
    componentDidHide() {
        clearInterval(this.state.countTimer)
    }
    getDetail = () => {
        const { tradeId } = this.$router.params
        this.props.dispatch({
            type: 'OrderDetail/get',
            payload: {
                id: tradeId,
            },
            callback: (data) => {
                console.log(data)
                if (data.status && data.status.value === 1 && !data.payType) {
                    clearInterval(this.state.countTimer)
                    const HALF_AN_HOUR_MS = 30 * 60 * 1000
                    const countTimer = setInterval(() => {
                        this.setState({
                            endTime: getRestTime(data.createTime, HALF_AN_HOUR_MS),
                        })
                    }, 1000)
                    this.setState({
                        countTimer,
                    })
                }
            },
        })
    }
    getTotalPrice = () => {
        return 100.1
    }
    getTotalNum = () => {
        const { data } = this.props
        if (!data || !data.children || !data.children.length) {
            return 0
        }
        return data.children.reduce((sum: number, acc: any) => {
            return (sum = sum + acc.amount)
        }, 0)
    }
    gotoGoods = (goodsId, type) => {
        if (type === 2) {
            Taro.navigateTo({
                url: '/pages/GoodsDetail/index?id=' + goodsId,
            })
        } else if (type === 4) {
            Taro.navigateTo({
                url: '/pages/PackageDetail/index?id=' + goodsId,
            })
        }
    }
    handlePay = () => {
        const { data: trade } = this.props
        // if (trade.payType.value === 1) {
        // wechat
        Taro.login({
            success: (codeRes) => {
                this.props.dispatch({
                    type: 'OrderConfirm/getPayParam',
                    payload: {
                        tradeId: trade.tradeId,
                        jsCode: codeRes.code,
                    },
                    callback: (params) => {
                        Taro.requestPayment({
                            timeStamp: params.timeStamp,
                            nonceStr: params.nonceStr,
                            package: params.packageValue,
                            signType: params.signType,
                            paySign: params.sign,
                            success: () => {
                                this.getDetail()
                            },
                            fail() {},
                        })
                    },
                })
            },
        })
        // } else {
        //     Taro.showToast({
        //         title: '请联系技师确认',
        //     })
        // }
    }
    handleCancelConfirm = () => {
        this.setState({
            cancelVisible: true,
        })
    }
    handleReceiveConfirm = () => {
        this.setState({
            receiveVisible: true,
        })
    }
    handleClose = () => {
        this.setState({
            cancelVisible: false,
            receiveVisible: false,
        })
    }
    handleRefund = () => {
        const { data } = this.props
        console.log('申请售后', data)
        Taro.showToast({
            title: '暂无功能',
            icon: 'none',
        })
    }
    handleReceive = () => {
        const { data } = this.props
        console.log('确认收货', data)
        Taro.showToast({
            title: '暂无功能',
            icon: 'none',
        })
        // this.props.dispatch({
        //     type: 'OrderDetail/receive',
        //     payload: {
        //         id: data.tradeId,
        //     },
        //     callback: () => {
        //         this.getDetail()
        //         this.handleClose()
        //     },
        // })
    }
    handleCancel = () => {
        const { data } = this.props
        this.props.dispatch({
            type: 'OrderDetail/cancel',
            payload: {
                id: data.tradeId,
            },
            callback: () => {
                this.getDetail()
                this.handleClose()
            },
        })
    }
    render() {
        const { data } = this.props
        const { receiveVisible, cancelVisible, endTime } = this.state
        return (
            <View className={styles.OrderDetailMain}>
                <View className={styles.topWrapper}>
                    <View className={styles.title}>{data.status.description}</View>
                    <View className={styles.description}>{endTime && `请在${endTime}内完成支付`}</View>
                    <View className={styles.extra}>
                        <Image src={Icons.searchIcon} className={styles.icon} />
                    </View>
                </View>
                <View className={styles.contentWrapper}>
                    <View className={styles.itemsWrapper}>
                        <View className={styles.itemsTitle}>{data.shopName}</View>
                        <View className={styles.itemsChildren}>
                            {data &&
                                data.children.length > 0 &&
                                data.children.map((order: any) => {
                                    return (
                                        <View
                                            className={styles.itemWrapper}
                                            key={order.id}
                                            onClick={() => this.gotoGoods(order.goodsId, order.goodsType.value)}
                                        >
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
                        <View className={styles.itemsStatistic}>
                            共{this.getTotalNum()}件, 合计：
                            <Price value={data.totalAmount} />
                        </View>
                    </View>
                    {/* <View className={styles.info}>
                        <View className={styles.blockTitle}>推荐技师</View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>王欢</View>
                            <View className={styles.infoValue}>159357456</View>
                        </View>
                    </View> */}
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
                                {data.createTime && moment(data.createTime).format('YYYY-MM-DD')}
                            </View>
                        </View>
                        <View className={styles.infoList}>
                            <View className={styles.infoTitle}>支付方式</View>
                            <View className={styles.infoValue}>
                                <Text className={styles.colorStrong}>{data.payType.description}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={styles.bottom}>
                    <OrderOperation
                        status={data.status ? data.status.value : 1}
                        evaluationStatus={data.evaluationStatus}
                        // evaluationStatus={1}
                        trade={data}
                        handlePay={() => this.handlePay()}
                        handleCancel={() => this.handleCancelConfirm()}
                        handleRecieve={() => this.handleReceiveConfirm()}
                        handleRefund={() => this.handleRefund()}
                    />
                </View>
                <ConfirmModal
                    visible={cancelVisible}
                    title="取消订单"
                    content="确认要取消订单吗?"
                    handleCancel={this.handleClose}
                    handleConfirm={this.handleCancel}
                />
                <ConfirmModal
                    visible={receiveVisible}
                    title="确认收货"
                    content="确认已经收到货物了吗?"
                    handleCancel={this.handleClose}
                    handleConfirm={this.handleReceive}
                />
            </View>
        )
    }
}

export default OrderDetail
