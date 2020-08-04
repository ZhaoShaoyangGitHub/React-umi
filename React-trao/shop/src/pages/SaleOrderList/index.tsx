import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CartItem from '../../components/CartItem/index'
import { SaleOrderListProps, SaleOrderListState } from './index.interface'
import styles from './SaleOrderList.module.less'
import OrderOperation from '../../components/OrderOperation'
import Price from '../../components/Price'

@connect(({ SaleOrderList }) => ({
    ...SaleOrderList,
}))
class SaleOrderList extends Component<SaleOrderListProps, SaleOrderListState> {
    config: Config = {
        navigationBarTitleText: '销售订单',
    }
    constructor(props: SaleOrderListProps) {
        super(props)
        this.state = {
            current: 0,
            tabList: [
                { title: '全部' },
                { title: '待支付' },
                { title: '已支付' },
                { title: '已取消' },
                { title: '已退款' },
            ],
            pageIndex: 1,
            cancelVisible: false,
            receiveVisible: false,
            trade: {},
        }
    }

    componentDidShow() {
        this.getOrderList(this.getParams(0))
    }
    componentWillReceiveProps(nextProps) {}
    getOrderList = (params) => {
        const { pageIndex } = this.state
        this.props.dispatch({
            type: 'SaleOrderList/getList',
            payload: {
                pageIndex,
                keyword: '',
                type: 2,
                ...params,
            },
        })
    }
    handleClick(value) {
        console.log(value)
        this.setState(
            {
                current: value,
                pageIndex: 1,
            },
            () => {
                this.getOrderList(this.getParams(value))
            },
        )
    }
    onReachBottom() {
        const { totalPage } = this.props
        const { pageIndex, current } = this.state
        if (totalPage > pageIndex) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getOrderList(this.getParams(current))
                },
            )
        }
    }
    // 获取参数
    getParams = (index) => {
        switch (index) {
            // 全部
            case 0: {
                return {
                    status: '',
                    payStatus: '',
                    isRefundStatus: 0,
                }
            }
            // 待支付
            case 1: {
                return {
                    status: '',
                    payStatus: 1,
                    isRefundStatus: 0,
                }
            }
            // 已支付
            case 2: {
                return {
                    status: '',
                    payStatus: 3,
                    isRefundStatus: 0,
                }
            }
            // 已取消
            case 3: {
                return {
                    status: -1,
                    payStatus: '',
                    isRefundStatus: 0,
                }
            }
            // 已退款
            case 4: {
                return {
                    status: '',
                    payStatus: '',
                    isRefundStatus: 1,
                }
            }
            default:
                return {
                    status: '',
                    payStatus: '',
                    isRefundStatus: 0,
                }
        }
    }
    gotoDetail = (trade: any) => {
        Taro.navigateTo({
            url: `/pages/OrderDetail/index?tradeId=${trade.tradeId}`,
        })
    }
    handlePay = (trade: any) => {
        console.log('trade', trade)
        const wechatPayType = 1
        this.props.dispatch({
            type: 'OrderConfirm/pay',
            payload: {
                id: trade.tradeId,
                amount: trade.totalAmount, // TODO:  trade.awaitPayAmount,
                payType: wechatPayType,
            },
            callback: (id: number, data) => {
                // OrderConfirm r83也有
                console.log('调起微信支付')
                Taro.navigateTo({
                    url: `/pages/PayResult/index?id=${id}`,
                })
            },
        })
    }

    gotoShop = (shopId) => {
        console.log('跳转到商店', shopId)
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
                    <AtTabs current={current} scroll tabList={tabList} onClick={(value) => this.handleClick(value)} />
                </View>
                <View className={styles.listWrapper}>
                    {list.length ? (
                        list.map((trade) => {
                            return (
                                <View className={styles.itemsWrapper} key={trade.shopId}>
                                    {/* <View className={styles.itemsTitle} onClick={() => this.gotoShop(trade.shopId)}> */}
                                    <View className={styles.itemsTitle}>
                                        {trade.shopName}
                                        <Text className={styles.extraButton}>{trade.status.description}</Text>
                                    </View>
                                    <View className={styles.itemsChildren}>
                                        {trade.children.map((order: any) => {
                                            return (
                                                <View
                                                    className={styles.itemWrapper}
                                                    key={order.orderId}
                                                    // onClick={() => this.gotoDetail(trade)}
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
                                        <View className={styles.allGoods}>
                                            共{trade.totalNum}件，合计
                                            <Price value={trade.totalAmount} />
                                        </View>
                                        <View className={styles.itemsOperation}>
                                            <OrderOperation
                                                status={trade.status.value}
                                                trade={trade}
                                                handlePay={() => this.handlePay(trade)}
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
                {/* <ConfirmModal
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
                /> */}
            </View>
        )
    }
}

export default SaleOrderList
