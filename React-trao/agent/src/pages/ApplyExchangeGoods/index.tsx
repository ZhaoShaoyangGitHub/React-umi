import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import StockItem from '../../components/StockItem'
import { ApplyExchangeGoodsProps, ApplyExchangeGoodsState } from './index.interface'
import styles from './ApplyExchangeGoods.module.less'
import TitleSession from '../../components/TitleSession/index'
import { shoppingCart } from '../../assets/img/load'

@connect(({ ApplyExchangeGoods }) => ({
    ...ApplyExchangeGoods,
}))
class ApplyExchangeGoods extends Component<ApplyExchangeGoodsProps, ApplyExchangeGoodsState> {
    config: Config = {
        navigationBarTitleText: '商品库存 ',
    }
    constructor(props: ApplyExchangeGoodsProps) {
        super(props)
        this.state = {}
    }

    // componentDidShow = () => {
    //     // isAppointment  支付状态{1:已预约,2:未预约}
    //     // keyword	用户名称/手机号
    //     // this.getpageList()
    // }

    handleDelete = () => {}

    handleAdd = () => {}

    render() {
        return (
            <View className={styles.ApplyExchangeGoodsMain}>
                <TitleSession title="退货商品" />
                <View className={styles.returnGoodsList}>
                    {[1].map((item) => {
                        return (
                            <View className={styles.returnItem}>
                                <View className={styles.goodsdInfo}>
                                    <StockItem isShowButotn={false} />
                                </View>
                                <View className={styles.bottom}>
                                    <Text>退货数量</Text>
                                    <View className={styles.operate}>
                                        <Image
                                            src={shoppingCart.cart_minus}
                                            className={styles.icon}
                                            onClick={() => this.handleDelete()}
                                        />
                                        <Text className={styles.amount}>1</Text>
                                        <Image
                                            src={shoppingCart.cart_plus}
                                            className={styles.icon}
                                            onClick={() => this.handleAdd()}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <TitleSession title="换货商品" handelAdd={() => {}} />
                <View className={styles.returnGoodsList}>
                    {[1].map((item) => {
                        return (
                            <View className={styles.returnItem}>
                                <View className={styles.goodsdInfo}>
                                    <StockItem isShowButotn={false} />
                                </View>
                                <View className={styles.bottom}>
                                    <Text>退货数量</Text>
                                    <View className={styles.operate}>
                                        <Image
                                            src={shoppingCart.cart_minus}
                                            className={styles.icon}
                                            onClick={() => this.handleDelete()}
                                        />
                                        <Text className={styles.amount}>1</Text>
                                        <Image
                                            src={shoppingCart.cart_plus}
                                            className={styles.icon}
                                            onClick={() => this.handleAdd()}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <Text className={styles.tips}>*商品购买后半年内可以换货，超出半年不予退货</Text>

                <Text className={styles.button}>确认</Text>
            </View>
        )
    }
}

export default ApplyExchangeGoods
