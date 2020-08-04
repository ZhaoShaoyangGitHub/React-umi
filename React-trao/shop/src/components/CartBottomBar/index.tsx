import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { CartBottomBarProps, CartBottomBarState } from './index.interface'
import cartIcon from '@assets/img/cart_gray.png'
import Price from '../Price/index'
import styles from './index.module.less'

class CartBottomBar extends Component<CartBottomBarProps, CartBottomBarState> {
    constructor(props: CartBottomBarProps) {
        super(props)
        this.state = {}
    }

    render() {
        const { handleToggleCartPanel, gotoPay, price, productNum } = this.props
        return (
            <View className={styles.CartBottomBarMain}>
                <View className={styles.bottom}>
                    <View className={styles.cart} onClick={() => handleToggleCartPanel()}>
                        <View className={styles.badge}>{productNum}</View>
                        <View className={styles.iconWrapper}>
                            <Image src={cartIcon} className={styles.icon} />
                        </View>
                        <View className={styles.text}>购物车</View>
                    </View>
                    <View className={styles.totalprice}>
                        <Price value={price} />
                    </View>
                    <View
                        className={productNum ? styles.confirm : styles.noConfirm}
                        onClick={() => {
                            gotoPay()
                        }}
                    >
                        去结算({productNum})
                    </View>
                </View>
            </View>
        )
    }
}

export default CartBottomBar
