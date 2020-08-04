import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Image, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { RechargeProps, RechargeState } from './index.interface'
import Titlesession from '../../components/Titlesession'
import styles from './Recharge.module.less'
import { order, publicImages } from '../../assets/img/load'
// import { } from '../../components'

@connect(({ Recharge }) => ({
    ...Recharge,
}))
class Recharge extends Component<RechargeProps, RechargeState> {
    config: Config = {
        navigationBarTitleText: '充值',
    }
    constructor(props: RechargeProps) {
        super(props)
        this.state = {
            amount: '',
            amountList: [],
            shopId: 0,
            payType: 'wechat',
        }
    }

    componentDidShow = () => {
        const { shopId } = this.$router.params
        this.setState(
            {
                shopId: Number.parseInt(shopId, 10) || 5,
            },
            () => {
                this.getBalanceList()
            },
        )
    }

    getBalanceList = () => {
        this.props.dispatch({
            type: 'Recharge/getBalanceList',
            payload: {},
            cb: (data) => {
                this.setState({
                    amountList: data,
                })
            },
        })
    }
    handleChange = (value: string, attr: string) => {
        this.setState({
            [attr]: value,
        })
    }
    handleSelectAmount = (amount) => {
        this.setState({
            amount,
        })
    }

    handleSave = () => {
        const { amount, shopId, payType } = this.state
        if (amount === 0 || amount === '') {
            Taro.showToast({ title: '请输入正确的金额', icon: 'none' })
            return
        }
        Taro.login({
            success: (codeRes) => {
                this.props.dispatch({
                    type: 'Recharge/recharge',
                    params: {
                        amount,
                        jsCode: codeRes.code,
                        payType: payType === 'wechat' ? 1 : 2,
                        shopId,
                    },
                    cb: (params) => {
                        if (payType === 'wechat') {
                            Taro.requestPayment({
                                timeStamp: params.timeStamp,
                                nonceStr: params.nonceStr,
                                package: params.packageValue,
                                signType: params.signType,
                                paySign: params.sign,
                                success() {
                                    Taro.showToast({
                                        title: '充值成功',
                                        duration: 2000,
                                    })
                                    setTimeout(() => {
                                        Taro.navigateBack()
                                    }, 2000)
                                },
                                fail() {
                                    Taro.showToast({
                                        title: '充值失败',
                                        icon: 'none',
                                        duration: 2000,
                                    })
                                },
                            })
                        } else {
                            Taro.showToast({
                                title: '充值成功',
                                duration: 2000,
                            })
                            setTimeout(() => {
                                Taro.navigateBack()
                            }, 2000)
                        }
                    },
                })
            },
        })
    }

    // 支付方式选择
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

    render() {
        const { amount, amountList, payType } = this.state
        return (
            <View className={styles.RechargeMain}>
                <View className={styles.itemWrapper}>
                    <View className={styles.label}>充值金额</View>
                    <View className={styles.inputWrapper}>
                        <Text>￥</Text>
                        <Input
                            type="number"
                            placeholder="请输入充值金额"
                            placeholderClass={styles.placeholder}
                            value={amount}
                            onInput={(e: any) => this.handleChange(e.target.value, 'amount')}
                        />
                    </View>
                </View>

                <View className={styles.amountList}>
                    {amountList.map((item) => (
                        <Text onClick={() => this.handleSelectAmount(item.rechargeAmount)}>
                            ￥{item.rechargeAmount}
                        </Text>
                    ))}
                </View>

                <View className={styles.payTypeWrapper}>
                    <View className={styles.blockTitle}>选择支付方式</View>
                    <View className={styles.payTypeItemWrapper}>
                        <View className={styles.payTypeItem} onClick={() => this.handlePayTypeChange('wechat')}>
                            <Image src={order.wechat} className={styles.payTypeIcon} />
                            <View className={styles.text}>微信支付</View>
                            <View className={styles.checkboxWrapper}>
                                {payType === 'wechat' ? (
                                    <Image src={publicImages.selectedIcon} className={styles.checkedIcon} />
                                ) : (
                                    <View className={styles.uncheckedIcon} />
                                )}
                            </View>
                        </View>
                        <View className={styles.payTypeItem} onClick={() => this.handlePayTypeChange('offline')}>
                            <Image src={order.offline} className={styles.payTypeIcon} />
                            <View className={styles.text}>线下支付</View>
                            <View className={styles.checkboxWrapper}>
                                {payType === 'offline' ? (
                                    <Image src={publicImages.selectedIcon} className={styles.checkedIcon} />
                                ) : (
                                    <View className={styles.uncheckedIcon} />
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <View className={styles.button} onClick={this.handleSave}>
                    确认
                </View>
            </View>
        )
    }
}

export default Recharge
