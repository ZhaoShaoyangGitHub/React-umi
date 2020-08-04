import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Price from '../../components/Price'
import CartItem from '../../components/CartItem'
import { BASEURL } from '../../config/index'
import rightIcon from '@assets/img/find-more.png'
import checkedIcon from '@assets/img/home/mask-select.png'
import qrcodeIcon from '@assets/img/qrcode.png'
import cashIcon from '@assets/img/cash.png'
import posIcon from '@assets/img/pos.png'
import { OrderConfirmProps, OrderConfirmState } from './index.interface'
import styles from './OrderConfirm.module.less'

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
        }
    }

    // componentDidMount() {
    //     console.log('props:::', this.props)
    //     const pages = Taro.getCurrentPages()
    //     const { OrderConfirmData } = this.props
    //     const currPage = pages[pages.length - 1] //当前页面
    //     console.log(OrderConfirmData)
    //     if (OrderConfirmData.orderResponses) {
    //         const obj = {
    //             userId: OrderConfirmData.userId,
    //             nickName: OrderConfirmData.userName,
    //             phone: OrderConfirmData.userPhone,
    //         }
    //         currPage.setData({
    //             regdata: obj,
    //         })
    //         this.setState({ regUserInfo: obj }, () => {})
    //     }
    // }
    componentDidShow() {
        // const pages = Taro.getCurrentPages()
        // const currPage = pages[pages.length - 1] //当前页面
        //   currPage.setData({
        //     regdata: vipUserList[ind],
        // })
        const { userId } = this.$router.params

        this.props.dispatch({
            type: 'PackageSchedul/getCurrentUserInfo',
            params: { userId },
            cb: (data) => {
                this.setState({ regUserInfo: data }, () => {
                    console.log(this.state.regUserInfo)
                    if (this.state.regUserInfo && this.state.regUserInfo.userId) {
                        this.props.dispatch({
                            type: 'OrderConfirm/userJudgeOneTrade',
                            params: { userId: this.state.regUserInfo.userId },
                            cb: (code, data, message) => {
                                console.log('userId数据', data)
                                if (code === 'OK') {
                                    this.setState({ isOneShopping: data.isOneShopping })
                                    if (data.isOneShopping === 2) {
                                        this.setState({
                                            recomendPeople: '',
                                            selectedSource: 0,
                                        })
                                    }
                                } else {
                                    Taro.showToast({
                                        title: message,
                                        icon: 'none',
                                        duration: 2000,
                                    })
                                }
                            },
                        })
                    }
                })
            },
        })
        console.log('on Show')
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
    handleInstalmentChange = (type) => {
        switch (type) {
            case 'Y':
                this.setState({ instalment: true })
                break
            case 'N':
                this.setState({ instalment: false })
                break
            default:
                return ''
        }
    }
    handleMoneyChange = (e) => {
        const { OrderConfirmData } = this.props
        const { instalment } = this.state
        if ((instalment && OrderConfirmData.totalAmount - e.target.value < 0) || e.target.value < 0) {
            Taro.showToast({
                title: '请输入正确的首款金额',
                icon: 'none',
            })
            return
        }
        this.setState(
            {
                firstMoney: e.target.value,
                balance: OrderConfirmData.totalAmount - e.target.value,
            },
            () => {
                console.log('首款金额:', this.state.firstMoney)
            },
        )
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
        const {
            instalment,
            payType,
            selectedSource,
            recomendPeople,
            firstMoney,
            date,
            regUserInfo,
            isOneShopping,
        } = this.state
        const { goodsForms, OrderConfirmData } = this.props

        //

        if (!regUserInfo || Object.keys(regUserInfo).length === 0) {
            Taro.showToast({
                title: '请选择用户',
                icon: 'none',
            })
            return
        }
        // if ((instalment && !firstMoney) || (instalment && !date)) {
        //     Taro.showToast({
        //         title: '请输入正确的尾款金额',
        //         icon: 'none',
        //     })
        //     return
        // }

        // if (OrderConfirmData.goodsResponses && isOneShopping === 1 && !selectedSource) {
        //     Taro.showToast({
        //         title: '请填写用户来源渠道',
        //         icon: 'none',
        //     })
        //     return
        // }
        // isOneShopping
        let obj = {}
        // OrderConfirmData.goodsResponses OrderConfirmData.orderResponses
        if (OrderConfirmData.orderResponses) {
            // 帮助用户线下支付
            if (instalment) {
                // 分期
                obj = {
                    tradeId: OrderConfirmData.orderResponses[0].tradeId,
                    userId: regUserInfo.userId || regUserInfo.id, // 购买用户id
                    isInstalment: instalment ? 1 : 2, // 是否分期
                    downPayment: firstMoney, //首付款
                    finalTime: date, // 首付交付时间
                    payType: this.checkPayType(payType), // 支付方式
                    source: selectedSource, // 来源
                    referrerPhone: recomendPeople, // 推荐人手机号
                }
            } else {
                // 不分期
                obj = {
                    tradeId: OrderConfirmData.orderResponses[0].tradeId,
                    userId: regUserInfo.userId || regUserInfo.id,
                    isInstalment: instalment ? 1 : 2,
                    payType: this.checkPayType(payType),
                    source: selectedSource,
                    referrerPhone: recomendPeople,
                }
            }
        } else {
            // 帮助用户购买套餐
            if (instalment) {
                // 分期
                obj = {
                    goodsForms,
                    userId: regUserInfo.userId || regUserInfo.id, // 购买用户id
                    isInstalment: instalment ? 1 : 2, // 是否分期
                    downPayment: firstMoney, //首付款
                    finalTime: date, // 首付交付时间
                    payType: this.checkPayType(payType), // 支付方式
                    source: selectedSource, // 来源
                    referrerPhone: recomendPeople, // 推荐人手机号
                }
            } else {
                // 不分期
                obj = {
                    goodsForms,
                    userId: regUserInfo.userId || regUserInfo.id,
                    isInstalment: instalment ? 1 : 2,
                    payType: this.checkPayType(payType),
                    source: selectedSource,
                    referrerPhone: recomendPeople,
                }
            }
        }

        this.props.dispatch({
            type: 'OrderConfirm/saveUserTrade',
            params: obj,
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
                        Taro.reLaunch({ url: '/pages/Home/index' })
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
    render() {
        const {
            recomendPeople,
            firstMoney,
            username,
            instalment,
            balance,
            date,
            payType,
            sourceArray,
            selectedSource,
            regUserInfo,
            isOneShopping,
        } = this.state
        const { OrderConfirmData } = this.props

        return (
            <View className={styles.OrderConfirmMain}>
                <View className={styles.listWrapper}>
                    {OrderConfirmData.goodsResponses &&
                        OrderConfirmData.goodsResponses.map((item: any) => {
                            return (
                                <View className={styles.itemWrapper} key={item.cartId}>
                                    <View className={styles.cartItemWrapper}>
                                        <CartItem
                                            goodsId={item.goodsId}
                                            goodsName={item.goodsName}
                                            price={item.price}
                                            efficacy={item.efficacy}
                                            amount={item.goodsNumber}
                                            imgSrc={BASEURL + item.goodsImage}
                                            inventory={item.inventory}
                                            type="order"
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    {OrderConfirmData.orderResponses &&
                        OrderConfirmData.orderResponses.map((item: any) => {
                            return (
                                <View className={styles.itemWrapper} key={item.cartId}>
                                    <View className={styles.cartItemWrapper}>
                                        <CartItem
                                            goodsId={item.goodsId}
                                            goodsName={item.goodsTitle}
                                            price={item.goodsPrice}
                                            amount={item.goodsAmount}
                                            imgSrc={BASEURL + item.goodsThumb}
                                            inventory={item.inventory}
                                            type="order"
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    <View className={styles.itemsStatistic}>
                        共{this.getTotalNum()}件, 合计：
                        <Price value={OrderConfirmData.totalAmount} />
                    </View>
                </View>
                <View className={styles.blockWrapper}>
                    <View className={styles.blockItem} style={{ marginTop: 0 }}>
                        {/* <View className={styles.left}>选择用户</View>
                        <View className={styles.right} onClick={() => this.gotoUserSelect()}>
                            {!regUserInfo || Object.keys(regUserInfo).length === 0 ? (
                                <Text className={styles.placeholder}>请选择</Text>
                            ) : (
                                regUserInfo.nickName + ' ' + regUserInfo.phone
                            )}
                            <Image src={rightIcon} className={styles.arrowIcon} />
                        </View> */}
                        <View className={styles.avatarImg}>
                            {regUserInfo.avatar && <Image src={BASEURL + JSON.parse(regUserInfo.avatar).file} />}
                        </View>
                        <View className={styles.right}>
                            <View className={styles.info}>
                                <Text>{regUserInfo.nickName || regUserInfo.userName}</Text>
                                <Text>{regUserInfo.phone || regUserInfo.mobile}</Text>
                            </View>
                            <Text>
                                {regUserInfo.province} {regUserInfo.city} {regUserInfo.area}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* <View className={styles.blockTitle}>分期方式</View>
                <View className={styles.blockWrapper}>
                    <View className={styles.selectionWrapper}>
                        <View
                            className={!instalment ? styles.activeSelection : styles.selection}
                            onClick={() => this.handleInstalmentChange('N')}
                        >
                            <View>不分期</View>
                        </View>
                        <View
                            className={instalment ? styles.activeSelection : styles.selection}
                            onClick={
                                this.checkFenqi()
                                    ? () => this.handleInstalmentChange('Y')
                                    : () => {
                                          Taro.showToast({
                                              title: '非套餐商品不可分期',
                                              icon: 'none',
                                          })
                                      }
                            }
                        >
                            <Text>分两期</Text>
                        </View>
                    </View>
                    {instalment && (
                        <View>
                            <View className={styles.blockItem}>
                                <View className={styles.left}>首款金额</View>
                                <View className={styles.right}>
                                    <Input
                                        value={firstMoney}
                                        type="number"
                                        placeholder="请输入首款金额"
                                        placeholderClass={styles.placeholder}
                                        onInput={(e) => this.handleMoneyChange(e)}
                                    />
                                </View>
                            </View>
                            <View className={styles.blockItem}>
                                <View className={styles.left}>尾款金额</View>
                                <View className={styles.right}>
                                    {balance || <Text className={styles.placeholder}>--</Text>}
                                </View>
                            </View>
                            <View className={styles.blockItem}>
                                <View className={styles.left}>尾款截止时间</View>
                                <View className={styles.right}>
                                    <Picker mode="date" onChange={(e) => this.handleChange(e)} value={date}>
                                        <View className={styles.picker}>
                                            <Text>{date || <Text className={styles.placeholder}>请选择</Text>}</Text>
                                        </View>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    )}
                </View> */}
                <View className={styles.blockTitle}>选择支付方式</View>
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
                </View>

                {/* {OrderConfirmData.goodsResponses && isOneShopping === 1 && (
                    <View>
                        <View className={styles.blockTitle}>选择来源渠道</View>
                        <View className={styles.blockWrapper}>
                            <View className={styles.blockItem} style={{ marginTop: 0 }}>
                                <View className={styles.left}>来源渠道</View>
                                <View className={styles.right}>
                                    <Picker
                                        mode="selector"
                                        range={sourceArray}
                                        onChange={(e) => this.handleSourceChange(e)}
                                        value={selectedSource - 1}
                                    >
                                        <View className={styles.picker}>
                                            {sourceArray[selectedSource - 1]}
                                            <Image src={rightIcon} className={styles.arrowIcon} />
                                        </View>
                                    </Picker>
                                </View>
                            </View>
                            {selectedSource === 1 && (
                                <View className={styles.blockItem}>
                                    <View className={styles.left}>推荐人账号</View>
                                    <View className={styles.right}>
                                        <Input
                                            type="text"
                                            value={recomendPeople}
                                            onInput={(e) => this.handleRecomendPeople(e)}
                                            placeholder="请输入推荐人账号"
                                            className={styles.sourceInput}
                                            placeholderClass={styles.placeholder}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                )} */}

                <View className={styles.bottom}>
                    <View className={styles.totalprice}>
                        合计：
                        <Price value={OrderConfirmData.totalAmount} />
                    </View>
                    <View className={styles.confirm} onClick={this.gotoPay}>
                        提交订单
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
