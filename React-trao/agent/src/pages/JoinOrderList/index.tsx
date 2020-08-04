import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtSwitch, AtToast } from 'taro-ui'
import { HomeImages } from '../../assets/img/load'
import CartItem from '../../components/CartItem/index'
import { JoinOrderListProps, JoinOrderListState } from './index.interface'
import styles from './JoinOrderList.module.less'
import Price from '../../components/Price'

@connect(({ JoinOrderList }) => ({
    ...JoinOrderList,
}))
class JoinOrderList extends Component<JoinOrderListProps, JoinOrderListState> {
    config: Config = {
        navigationBarTitleText: '加盟商订单',
    }
    constructor(props: JoinOrderListProps) {
        super(props)
        this.state = {
            current: 0,
            tabList: [{ title: '全部' }, { title: '已支付' }, { title: '售后' }],
            pageIndex: 1,
            cancelVisible: false,
            receiveVisible: false,
            trade: {},
            showMask: false,
            isCheck: false,
            logisticsProvider: '',
            logisticsNumber: '',
            currentTradeId: 0,
        }
    }

    componentDidMount() {
        // TODO: 滚动加载
        this.getJoinOrderList()
    }
    componentWillReceiveProps(nextProps) {}
    getJoinOrderList = () => {
        const { current, pageIndex } = this.state
        this.props.dispatch({
            type: 'JoinOrderList/getList',
            payload: {
                pageIndex,
                ...this.getParams(current),
            },
        })
    }
    onReachBottom() {
        const { totalPage } = this.props
        const { pageIndex } = this.state
        if (totalPage > pageIndex) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getJoinOrderList()
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
                }
            }
            // 已支付
            case 1: {
                return {
                    status: '',
                    payStatus: 3,
                }
            }
            // 售后
            case 2: {
                return {
                    status: 4,
                    payStatus: '',
                }
            }
            default:
                return {
                    status: '',
                    payStatus: '',
                }
        }
    }
    handleClick(value) {
        console.log(value)
        this.setState(
            {
                current: value,
            },
            () => {
                this.getJoinOrderList()
            },
        )
    }
    gotoDetail = (trade: any) => {
        Taro.navigateTo({
            url: `/pages/OrderDetail/index?tradeId=${trade.tradeId}`,
        })
    }

    handleClose = () => {
        this.setState({
            cancelVisible: false,
            receiveVisible: false,
        })
    }

    gotoShop = (shopId) => {
        console.log('跳转到商店', shopId)
        Taro.navigateTo({
            url: '/pages/StoreDetail/index?id=' + shopId,
        })
    }

    // 自取
    handleChangePickUp = () => {
        const { isCheck } = this.state
        this.setState({
            isCheck: !isCheck,
        })
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value,
        })
    }

    // 提交物流信息
    handleSubmit = () => {
        const { isCheck, logisticsProvider, logisticsNumber, currentTradeId } = this.state
        this.props.dispatch({
            type: 'JoinOrderList/deliverTrade',
            params: {
                deliveryCompany: logisticsProvider,
                deliveryNo: logisticsNumber,
                deliveryType: isCheck ? 2 : 1,
                tradeId: currentTradeId,
            },
            cb: (data) => {
                this.setState(
                    {
                        showMask: false,
                        pageIndex: 1,
                    },
                    () => {
                        this.getJoinOrderList()
                    },
                )
                Taro.showToast({
                    title: '发货成功',
                })
            },
        })
    }
    render() {
        const {
            current,
            tabList,
            cancelVisible,
            receiveVisible,
            showMask,
            isCheck,
            logisticsProvider,
            logisticsNumber,
        } = this.state
        const { list } = this.props
        return (
            <View className={styles.JoinOrderListMain}>
                <View className={styles.topWrapper}>
                    <AtTabs current={current} tabList={tabList} onClick={(value) => this.handleClick(value)} />
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
                                            <View className={styles.buttonList}>
                                                <Text className={styles.grayButton}>驳回</Text>
                                                <Text
                                                    className={styles.lightButton}
                                                    onClick={() => {
                                                        this.setState({
                                                            showMask: true,
                                                            logisticsProvider: '',
                                                            logisticsNumber: '',
                                                            isCheck: false,
                                                            currentTradeId: trade.tradeId,
                                                        })
                                                    }}
                                                >
                                                    发货
                                                </Text>
                                            </View>
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

                {showMask && (
                    <View className={styles.mask}>
                        <View className={styles.maskInfoBox}>
                            <Image src={HomeImages.maskBg} className={styles.maskBgImg} />
                            <View className={styles.maskBgword}>填写物流信息</View>
                            <View className={styles.selectBox}>
                                <AtSwitch
                                    title="是否自取"
                                    checked={isCheck}
                                    onChange={this.handleChangePickUp}
                                    color="#B365B7"
                                />
                                <Input
                                    value={logisticsProvider}
                                    placeholder="请填写物流商"
                                    onInput={(e) => this.handleChange(e, 'logisticsProvider')}
                                />
                                <Input
                                    value={logisticsNumber}
                                    placeholder="请填写物流编号"
                                    onInput={(e) => this.handleChange(e, 'logisticsNumber')}
                                />
                            </View>
                            <View className={styles.buttonList}>
                                <View
                                    // className={styles.confirm}
                                    onClick={() => {
                                        this.setState({
                                            showMask: false,
                                        })
                                    }}
                                >
                                    取消
                                </View>
                                <View className={styles.confirm} onClick={() => this.handleSubmit()}>
                                    提交
                                </View>
                            </View>
                            <Image
                                src={HomeImages.maskCloseIcon}
                                className={styles.closeBtn}
                                onClick={() => {
                                    this.setState({ showMask: false })
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default JoinOrderList
