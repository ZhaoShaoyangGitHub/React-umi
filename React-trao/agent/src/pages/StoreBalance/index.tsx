import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import moment from 'moment'
import { connect } from '@tarojs/redux'
import { StoreBalanceProps, StoreBalanceState } from './index.interface'
import { addComma } from '../../utils/function'
import styles from './StoreBalance.module.less'
import { publicImages, PersonalImages } from '../../assets/img/load'

@connect(({ StoreBalance }) => ({
    ...StoreBalance,
}))
class StoreBalance extends Component<StoreBalanceProps, StoreBalanceState> {
    config: Config = {
        navigationBarTitleText: '门店余额',
        navigationBarBackgroundColor: '#B365B7',
        navigationBarTextStyle: 'white',
    }
    constructor(props: StoreBalanceProps) {
        super(props)
        this.state = {
            shopId: 0,
            balance: 0,
            giveBalance: 0,
            giveInvalidTime: '',
        }
    }

    componentDidShow() {
        const { shopId } = this.$router.params
        this.setState(
            {
                shopId: Number.parseInt(shopId, 10) || 5,
            },
            () => {
                this.getShopDetails()
            },
        )
    }

    getShopDetails = () => {
        const { shopId } = this.state
        this.props.dispatch({
            type: 'Store/getShopDetails',
            payload: {
                shopId,
            },
            cb: (data) => {
                const { balanceAmount, giveInvalidTime, giveAmount } = data
                this.setState({
                    balance: balanceAmount,
                    giveBalance: giveAmount,
                    giveInvalidTime,
                })
            },
        })
    }

    goStoreBalancePage = () => {
        const { shopId } = this.state
        Taro.navigateTo({ url: `/pages/StoreBalanceDetail/index?shopId=${shopId}` })
    }

    goOtherPage = (index) => {
        const { shopId } = this.state
        switch (index) {
            case 0:
                Taro.navigateTo({
                    url: `/pages/Recharge/index?shopId=${shopId}`,
                })
                break
            default:
                break
        }
    }

    render() {
        const list = [
            {
                id: 0,
                title: '充值',
                iconUrl: PersonalImages.caseIcon1,
            },
        ]
        const { balance, giveBalance, giveInvalidTime } = this.state

        return (
            <View className={styles.StoreBalanceMain}>
                <View className={styles.balanceBlock}>
                    <Text className={styles.title}>账户余额（元）</Text>
                    <Text className={styles.balance}>{addComma(balance, 2)}</Text>
                    {giveBalance && (
                        <View className={styles.giveBalance}>
                            包含赠送余额（元） <Text>{addComma(giveBalance, 2)}</Text>
                        </View>
                    )}
                    {giveInvalidTime && (
                        <View className={styles.giveBalance}>
                            赠送余额有效期： {moment(giveInvalidTime).format('YYYY年MM月DD日')}
                        </View>
                    )}
                    <Text className={styles.detailTag} onClick={this.goStoreBalancePage}>
                        明细
                    </Text>
                </View>

                <View className={styles.personalWrapper}>
                    {list.map((item) => {
                        return (
                            <View
                                className={styles.personalBox}
                                key={item.id}
                                onClick={() => {
                                    this.goOtherPage(item.id)
                                }}
                            >
                                <View className={styles.listItem}>
                                    <View className={styles.left}>
                                        <Image src={item.iconUrl} mode="widthFix" className={styles.icon} />
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View className={styles.right}>
                                        <Image
                                            src={publicImages.jumpIcon}
                                            mode="widthFix"
                                            className={styles.jumpIcon}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default StoreBalance
