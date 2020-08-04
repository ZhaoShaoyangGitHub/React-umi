import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input, Form } from '@tarojs/components'
import searchIcon from '@assets/img/search.png'
import deleteIcon from '@assets/img/search-close.png'
import { connect } from '@tarojs/redux'
import Price from '../../components/Price'
import { OrderSearchProps, OrderSearchState } from './index.interface'
import { timestampToTime } from '../../utils/function'
import CartItem from '../../components/CartItem/index'
import { BASEURL } from '../../config/index'
import styles from './OrderSearch.module.less'
// import { } from '../../components'

@connect(({ OrderSearch }) => ({
    ...OrderSearch,
}))
class OrderSearch extends Component<OrderSearchProps, OrderSearchState> {
    config: Config = {
        navigationBarTitleText: '订单搜索',
    }
    constructor(props: OrderSearchProps) {
        super(props)
        this.state = {
            searchText: '',
            resultList: [],
            searchOrderList: [],
        }
    }

    componentDidMount() {}
    handleSearchChange = (value) => {
        let resultList: any[] = []
        if (value) {
            resultList = [
                {
                    tradeId: 1,
                    username: '王小明13121863132',
                    date: '2019-04-20 14:00',
                    children: [
                        {
                            cartId: 1,
                            goodsId: 2,
                            goodsName: '中式传统推拿+拔罐',
                            price: 2000.0,
                            quantity: 1,
                            skuImage: 'http://img0.imgtn.bdimg.com/it/u=3536087198,2495969828&fm=26&gp=0.jpg',
                            inventory: 10,
                            isValid: true,
                        },
                        {
                            cartId: 9,
                            goodsId: 1,
                            goodsName: '减肥套餐+保健套餐',
                            price: 3800.0,
                            quantity: 2,
                            skuImage: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
                            inventory: 10,
                            isValid: true,
                        },
                    ],
                },
                {
                    tradeId: 2,
                    username: '王小明13121863132',
                    date: '2019-04-18 15:00',
                    children: [
                        {
                            cartId: 3,
                            goodsId: 4,
                            goodsName: '减肥套餐+保健套餐',
                            price: 3800.0,
                            quantity: 2,
                            skuImage:
                                'http://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/83678ef4-Lets-Relax-Spa-Packages-Bangkok/%E6%9B%BC%E8%B0%B7LetsRelaxSpa%E6%8C%89%E6%91%A9%E7%BB%84%E5%90%88',
                            inventory: 10,
                            isValid: true,
                        },
                    ],
                },
            ]
        } else {
            resultList = []
        }
        this.setState(
            {
                searchText: value,
                // resultList,
            },
            () => {
                console.log('值：', this.state.searchText)
            },
        )
    }

    searchOrder = () => {
        const { searchText } = this.state
        if (!searchText) {
            Taro.showToast({
                title: '请输入搜索内容',
                icon: 'none',
            })
            return
        }
        //18766668788
        this.props.dispatch({
            type: 'OrderSearch/searchOrderList',
            params: {
                status: 1,
                payStatus: 1,
                keyword: searchText,
                // keyword: '18766668788',
                pageIndex: 1,
                type: 2,
            },
            cb: (code, data, message) => {
                if (code !== 'OK') {
                    return
                }
                this.setState({ searchOrderList: data.list })
                if (data.list.length < 1) {
                    Taro.showToast({
                        title: '未搜索到用户订单',
                        icon: 'none',
                    })
                }
                console.log('--->>>', data)
            },
        })
    }
    getTotal = (trade, type) => {
        switch (type) {
            case 'num':
                let totalNum = 0
                for (let i = 0; i < trade.orderResponses.length; i++) {
                    console.log('执行了几次呢？')
                    totalNum += trade.orderResponses[i].goodsAmount
                }
                return totalNum
            case 'price':
                let totalPrice = 0
                for (let i = 0; i < trade.orderResponses.length; i++) {
                    console.log('执行了几次呢？')
                    totalPrice += trade.orderResponses[i].goodsPrice
                }
                return totalPrice
            default:
                return ''
        }
    }
    handleTradeClick = (trade) => {
        console.log(trade)
        Taro.showLoading({ title: '' })

        const _arr: any[] = []

        for (let i = 0; i < trade.orderResponses.length; i++) {
            const obj: any = {}
            obj.goodsId = trade.orderResponses[i].goodsId
            obj.number = trade.orderResponses[i].goodsAmount
            obj.type = trade.orderResponses[i].goodsType.value
            _arr.push(obj)
        }
        console.log(_arr)
        this.props.dispatch({
            type: 'GoodList/postOrderTradeAffirm',
            params: {
                goodsForms: _arr,
                // tradeId: trade.orderResponses[0].tradeId,
                //  payType: trade.payType
                // userId: trade.userId,
                // payType: trade.payType,
            },
            cb: (data) => {
                Taro.hideLoading()
                console.log('ok->', data)
                this.props.dispatch({
                    type: 'OrderConfirm/save',
                    payload: trade,
                })
                this.props.dispatch({
                    type: 'OrderConfirm/saveform',
                    payload: _arr,
                })
                Taro.navigateTo({
                    url: `/pages/OrderConfirm/index?userId=${trade.userInfoDomain.userId}`,
                })
            },
        })
    }
    clearSearchText = () => {
        this.setState({
            searchText: '',
            resultList: [],
        })
    }
    render() {
        const { searchText, resultList, searchOrderList } = this.state
        return (
            <View className={styles.OrderSearchMain}>
                <View className={styles.topWrapper}>
                    <View className={styles.searchWrapper}>
                        <View className={styles.iconWrapper}>
                            <Image src={searchIcon} className={styles.searchIcon} />
                        </View>
                        <Input
                            type="text"
                            placeholder="请输入要帮助支付的用户账号"
                            className={styles.searchText}
                            onInput={(e: any) => this.handleSearchChange(e.detail.value)}
                            value={searchText}
                            onConfirm={this.searchOrder}
                        />
                        {searchText && (
                            <View className={styles.iconWrapper} onClick={this.clearSearchText}>
                                <Image src={deleteIcon} className={styles.deleteIcon} />
                            </View>
                        )}
                    </View>
                    <View
                        style={{ marginLeft: '20rpx' }}
                        onClick={() => {
                            this.searchOrder()
                        }}
                    >
                        搜索
                    </View>
                </View>
                <View className={styles.resultList}>
                    {searchOrderList.map((trade: any) => {
                        return (
                            <View
                                className={styles.itemsWrapper}
                                key={trade.tradeId}
                                onClick={() => this.handleTradeClick(trade)}
                            >
                                <View className={styles.itemsTitle}>
                                    {trade.userName} {trade.userPhone}
                                    <Text className={styles.extraButton}>{timestampToTime(trade.createTime)}</Text>
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
                </View>
            </View>
        )
    }
}

export default OrderSearch
