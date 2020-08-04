import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs } from 'taro-ui'
import CartItem from '../../components/CartItem/index'
import { OrderListProps, OrderListState } from './index.interface'
import styles from './OrderList.module.less'
import OrderOperation from '../../components/OrderOperation'
import ConfirmModal from '../../components/ConfirmModal'

@connect(({ OrderList }) => ({
    ...OrderList,
}))
class OrderList extends Component<OrderListProps, OrderListState> {
    config: Config = {
        navigationBarTitleText: '我的订单',
    }
    constructor(props: OrderListProps) {
        super(props)
        this.state = {
            current: 0,
            tabList: [
                { title: '全部' },
                { title: '待支付' },
                // { title: '待发货' },
                // { title: '待收货' },
                { title: '交易成功' },
            ],
            pageIndex: 1,
            cancelVisible: false,
            receiveVisible: false,
            trade: {},
        }
    }

    componentDidShow() {
        // TODO: 滚动加载
        this.getOrderList()
    }
    componentWillReceiveProps(nextProps) {}
    getOrderList = () => {
        const { current, pageIndex } = this.state
        this.props.dispatch({
            type: 'OrderList/getList',
            payload: {
                status: !current ? '' : current === 2 ? 4 : current,
                pageIndex,
            },
        })
    }
    handleClick(value) {
        this.setState(
            {
                current: value,
            },
            () => {
                this.getOrderList()
            },
        )
    }
    gotoDetail = (trade: any) => {
        Taro.navigateTo({
            url: `/pages/OrderDetail/index?tradeId=${trade.tradeId}`,
        })
    }
    handlePay = (trade: any) => {
        // if (trade.payType.value === 1 || !trade.payType) {
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
                                this.getOrderList()
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
    handleCancelConfirm = (trade: any) => {
        this.setState({
            cancelVisible: true,
            trade,
        })
    }
    handleReceiveConfirm = (trade: any) => {
        this.setState({
            receiveVisible: true,
            trade,
        })
    }
    handleRefund = (trade) => {
        Taro.showToast({
            title: '暂无功能',
            icon: 'none',
        })
    }
    handleClose = () => {
        this.setState({
            cancelVisible: false,
            receiveVisible: false,
        })
    }
    handleReceive = () => {
        const { trade } = this.state
        Taro.showToast({
            title: '暂无功能',
            icon: 'none',
        })
        // this.props.dispatch({
        //     type: 'OrderDetail/receive',
        //     payload: {
        //         id: trade.tradeId,
        //     },
        //     callback: () => {
        //         this.getOrderList()
        //         this.handleClose()
        //     },
        // })
    }
    handleCancel = () => {
        const { trade, current, pageIndex } = this.state
        this.props.dispatch({
            type: 'OrderDetail/cancel',
            payload: {
                id: trade.tradeId,
            },
            callback: () => {
                this.getOrderList()
                this.handleClose()
            },
        })
    }
    handleDeleteTrade = (trade: any) => {
        this.props.dispatch({
            type: 'OrderList/deleteTrade',
            payload: {
                tradeId: trade.tradeId,
            },
            cb: () => {
                Taro.showToast({
                    title: '删除成功',
                })
                this.getOrderList()
            },
        })
    }
    gotoShop = (shopId) => {
        Taro.navigateTo({
            url: '/pages/StoreDetail/index?id=' + shopId,
        })
    }
    render() {
        const { current, tabList, cancelVisible, receiveVisible } = this.state
        const { list } = this.props
        return (
            <View className={styles.OrderListMain}>
                <View className={styles.topWrapper}>
                    <AtTabs current={current} tabList={tabList} onClick={(value) => this.handleClick(value)} />
                </View>
                <View className={styles.listWrapper}>
                    {list.length ? (
                        list.map((trade) => {
                            return (
                                <View className={styles.itemsWrapper} key={trade.shopId}>
                                    <View className={styles.itemsTitle} onClick={() => this.gotoShop(trade.shopId)}>
                                        {trade.shopName}
                                        <Text className={styles.extraButton}>{trade.status.description}</Text>
                                    </View>
                                    <View className={styles.itemsChildren}>
                                        {trade.children.map((order: any) => {
                                            return (
                                                <View
                                                    className={styles.itemWrapper}
                                                    key={order.orderId}
                                                    onClick={() => this.gotoDetail(trade)}
                                                >
                                                    <View className={styles.cartItemWrapper}>
                                                        <CartItem
                                                            cartId={order.orderId}
                                                            goodsId={order.goodsId}
                                                            goodsName={order.goodsName}
                                                            price={order.price}
                                                            amount={order.amount}
                                                            imgSrc={order.imageUrl}
                                                            type="order"
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        })}
                                        <View className={styles.itemsOperation}>
                                            <OrderOperation
                                                status={trade.status.value}
                                                evaluationStatus={trade.evaluationStatus}
                                                trade={trade}
                                                handlePay={() => this.handlePay(trade)}
                                                handleCancel={() => this.handleCancelConfirm(trade)}
                                                handleRecieve={() => this.handleReceiveConfirm(trade)}
                                                handleRefund={() => this.handleRefund(trade)}
                                                handleDelete={() => this.handleDeleteTrade(trade)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    ) : (
                        <View className={styles.emptyWrapper}>
                            <View className={styles.emptyWord}>暂无数据</View>
                        </View>
                    )}
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

export default OrderList
