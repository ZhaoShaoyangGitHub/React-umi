import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Price from '../../components/Price'
import CartItem from '../../components/CartItem'
import { BASEURL } from '../../config/index'
import { publicImages } from '../../assets/img/load'

import { OrderConfirmProps, OrderConfirmState } from './index.interface'
import styles from './OrderConfirm.module.less'
import Store from '../Store'
// import { } from '../../components'

@connect(({ OrderConfirm }) => ({
    ...OrderConfirm,
}))
class OrderConfirm extends Component<OrderConfirmProps, OrderConfirmState> {
    config: Config = {
        navigationBarTitleText: '订单确认',
    }
    constructor(props: OrderConfirmProps) {
        super(props)
        this.state = {
            isOneShopping: 0,
            regUserInfo: {},
            recomendPeople: '',
            firstMoney: '',
            username: '王小明 13121863132',
            instalment: false,
            balance: 0,
            date: '2019-08-22',
            payType: 'qrcode',
            sourceArray: [
                '会员推荐',
                '朋友推荐',
                '广告',
                '大众点评',
                '路过',
                '小程序',
                '抖音',
                '朋友圈',
                '微博',
                '户外广告',
                '地铁',
                '电台电视',
            ],
            selectedSource: 0,
            currentType: 2,
            orderConfirmData: {
                goodsResponses: [],
                shopName: '',
            },
            cartIds: [],
        }
    }

    componentDidShow() {
        const { ids } = this.$router.params
        this.setState(
            {
                cartIds: ids ? ids.split(',') : [],
            },
            () => {
                const { cartIds } = this.state
                let params = {}
                if (cartIds.length > 0) {
                    params = { cartIds }
                } else {
                    params = {
                        ...(JSON.parse(Taro.getStorageSync('quickBuyInfo')) || {}),
                    }
                }
                this.props.dispatch({
                    type: 'OrderConfirm/getOrderConfirmInfo',
                    params,
                    cb: (data) => {
                        console.log(data)
                        this.setState({
                            orderConfirmData: data,
                        })
                    },
                })
            },
        )
    }
    getTotalNum = () => {
        if (this.props.OrderConfirmData.goodsResponses) {
            return this.props.OrderConfirmData.goodsResponses
                ? this.props.OrderConfirmData.goodsResponses.length
                : this.props.OrderConfirmData.orderResponses.length
        } else {
            return 0
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                date: e.target.value,
            },
            () => {
                console.info('截止日期', this.state.date)
            },
        )
    }
    handlePayTypeChange = (payType: string) => {
        this.setState(
            {
                payType,
            },
            () => {
                console.log(payType)
            },
        )
    }
    handleSourceChange = (e) => {
        this.setState(
            {
                selectedSource: Number(e.target.value) + 1,
            },
            () => {
                console.log('来源渠道', this.state.selectedSource)
            },
        )
    }
    handleRecomendPeople = (e) => {
        this.setState(
            {
                recomendPeople: Number(e.target.value),
            },
            () => {
                console.log('推荐人帐号', this.state.recomendPeople)
            },
        )
    }
    getTotalPrice = () => {
        return 5800
    }
    gotoPay = () => {
        // OrderConfirmData.goodsResponses OrderConfirmData.orderResponses

        // obj = {
        //     goodsForms,
        //     userId: regUserInfo.userId,
        //     isInstalment: instalment ? 1 : 2,
        //     payType: this.checkPayType(payType),
        //     source: selectedSource,
        //     referrerPhone: recomendPeople,
        // }
        // Taro.navigateTo({
        //     url: `/pages/PayResult/index`,
        // })

        const { cartIds, currentType } = this.state
        let params = {}
        const quickBuyInfo =
            (Taro.getStorageSync('quickBuyInfo') && JSON.parse(Taro.getStorageSync('quickBuyInfo'))) || {}
        if (cartIds.length > 0) {
            params = { cartIds, isInvoice: 0, deliveryType: currentType }
        } else {
            params = {
                isInvoice: 0,
                deliveryType: currentType,
                ...quickBuyInfo,
                goodsNumber: quickBuyInfo.number,
            }
        }
        this.props.dispatch({
            type: 'OrderConfirm/saveUserTrade',
            params,
            cb: (code, data, message) => {
                if (code !== 'OK') {
                    Taro.showToast({
                        title: message || '下单出错',
                        icon: 'none',
                    })
                } else {
                    Taro.showToast({
                        title: '下单成功',
                        duration: 1000,
                    })
                    setTimeout(() => {
                        Taro.navigateTo({
                            url: `/pages/PayResult/index`,
                        })
                    }, 1000)
                }
            },
        })
    }
    checkPayType = (pay) => {
        switch (pay) {
            case 'qrcode':
                return 3
            case 'pos':
                return 4
            case 'cash':
                return 5
            default:
                return 3
        }
    }
    gotoUserSelect = () => {
        Taro.navigateTo({
            url: '/pages/SelectUser/index',
        })
    }

    // 选择收货方式
    handleSelectType = (type: number) => {
        this.setState({
            currentType: type,
        })
    }

    render() {
        // const { OrderConfirmData } = this.props
        const { currentType, orderConfirmData } = this.state

        return (
            <View className={styles.OrderConfirmMain}>
                <View className={styles.shopTitle}>{orderConfirmData.shopName}</View>
                <View className={styles.listWrapper}>
                    <View className={styles.itemsWrapper}>
                        <View className={styles.goodsList}>
                            {orderConfirmData.goodsResponses.map((item: any) => {
                                return (
                                    <View className={styles.itemWrapper} key={item.cartId}>
                                        <View className={styles.cartItemWrapper}>
                                            <CartItem
                                                goodsName={item.name}
                                                price={item.price}
                                                amount={item.amount}
                                                imgSrc={BASEURL + item.imageUrl}
                                                type="order"
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    {/* {OrderConfirmData.orderResponses &&
                        OrderConfirmData.orderResponses.map((item: any) => {
                            return (
                                <View className={styles.itemWrapper} key={item.cartId}>
                                    <View className={styles.cartItemWrapper}>
                                        <CartItem
                                            goodsId={item.goodsId}
                                            goodsName={item.goodsTitle}
                                            price={item.goodsPrice}
                                            amount={item.goodsAmount}
                                            imgSrc={item.goodsThumb}
                                            inventory={item.inventory}
                                            type="order"
                                        />
                                    </View>
                                </View>
                            )
                        })} */}
                    {/* <View className={styles.itemsStatistic}>
                        共{this.getTotalNum()}件, 合计：
                        <Price value={0} />
                    </View> */}
                </View>

                <View className={styles.titleBox}>
                    <View className={styles.left}>
                        <View className={styles.leftBorder} />
                        <View className={styles.title}>收货方式</View>
                    </View>

                    <View className={styles.receiveType}>
                        <Text
                            className={currentType === 1 ? styles.active : ''}
                            onClick={() => this.handleSelectType(1)}
                        >
                            自提
                        </Text>
                        <Text
                            className={currentType === 2 ? styles.active : ''}
                            onClick={() => this.handleSelectType(2)}
                        >
                            送货
                        </Text>
                    </View>
                </View>
                <View className={styles.blockWrapper}>
                    <View className={styles.blockItem} style={{ marginTop: 0 }}>
                        <View className={styles.left}>开具发票</View>
                        <View className={styles.right}>
                            {/* {!regUserInfo || Object.keys(regUserInfo).length === 0 ? (
                                <Text className={styles.placeholder}></Text>
                            ) : (
                                regUserInfo.nickName + ' ' + regUserInfo.phone
                            )} */}
                            本次不开具发票
                            <Image src={publicImages.jumpIcon} className={styles.arrowIcon} />
                        </View>
                    </View>
                </View>
                {/* <View className={styles.blockTitle}>选择支付方式</View>
                <View className={styles.payTypeItemWrapper}>
                    {[
                        { code: 'qrcode', title: '扫码支付', img: qrcodeIcon },
                        { code: 'pos', title: 'POS机支付', img: posIcon },
                        { code: 'cash', title: '现金支付', img: cashIcon },
                    ].map((item) => {
                        return (
                            <View
                                className={styles.payTypeItem}
                                onClick={() => this.handlePayTypeChange(item.code)}
                                key={item.code}
                            >
                                <Image src={item.img} className={styles.payTypeIcon} />
                                <View className={styles.text}>{item.title}</View>
                                <View className={styles.checkboxWrapper}>
                                    {payType === item.code ? (
                                        <Image src={checkedIcon} className={styles.checkedIcon} />
                                    ) : (
                                        <View className={styles.uncheckedIcon} />
                                    )}
                                </View>
                            </View>
                        )
                    })}
                </View> */}

                <View className={styles.bottom}>
                    <View className={styles.totalprice}>
                        合计：
                        <Price value={orderConfirmData.totalAmount} />
                    </View>
                    <View className={styles.confirm} onClick={this.gotoPay}>
                        支付
                    </View>
                </View>
            </View>
        )
    }
    checkFenqi = () => {
        const { OrderConfirmData, goodsForms } = this.props
        if (OrderConfirmData.goodsResponses) {
            return true
        }

        return goodsForms.every((item) => {
            console.log('itemsss:', item)
            // 类型为4：套餐商品
            return item.type === 4
        })
    }
}

export default OrderConfirm
