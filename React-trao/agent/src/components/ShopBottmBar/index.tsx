import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopBottmBarProps, ShopBottmBarState } from './index.interface'
import styles from './index.module.less'
import shopCartIcon from '@assets/img/shop_cart_icon.png'

class ShopBottmBar extends Component<ShopBottmBarProps, ShopBottmBarState> {
    constructor(props: ShopBottmBarProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: ShopBottmBarProps = {}

    render() {
        return (
            <View className={styles.ShopBottmBarMain}>
                <View className={styles.shopBar}>
                    <View className={styles.shopCartIcon}>
                        <Image src={shopCartIcon} className={styles.shopimg} />
                        <View className={styles.shopname}>购物车</View>
                    </View>
                    <View className={styles.sessionRight}>
                        <View className={styles.addShopCart}>加入购物车</View>
                        <View className={styles.goCheck}>去结算</View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ShopBottmBar
