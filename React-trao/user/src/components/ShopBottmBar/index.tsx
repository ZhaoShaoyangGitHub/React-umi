import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopBottmBarProps, ShopBottmBarState } from './index.interface'
import styles from './index.module.less'
import { shopMall } from '../../assets/img/load'

class ShopBottmBar extends Component<ShopBottmBarProps, ShopBottmBarState> {
    constructor(props: ShopBottmBarProps) {
        super(props)
        this.state = {}
    }

    render() {
        const { addCart, goCheck, goCart } = this.props
        return (
            <View className={styles.ShopBottmBarMain}>
                <View className={styles.shopBar}>
                    <View className={styles.shopCartIcon}>
                        <Image
                            src={shopMall.shop_cart_icon}
                            className={styles.shopimg}
                            onClick={() => {
                                goCart()
                            }}
                        />
                        <View className={styles.shopname}>购物车</View>
                    </View>
                    <View className={styles.sessionRight}>
                        <View
                            className={styles.addShopCart}
                            onClick={() => {
                                addCart()
                            }}
                        >
                            加入购物车
                        </View>
                        <View
                            className={styles.goCheck}
                            onClick={() => {
                                goCheck()
                            }}
                        >
                            去结算
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ShopBottmBar
