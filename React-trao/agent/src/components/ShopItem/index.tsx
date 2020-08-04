import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopItemProps, ShopItemState } from './index.interface'
import styles from './index.module.less'

class ShopItem extends Component<ShopItemProps, ShopItemState> {
    constructor(props: ShopItemProps) {
        super(props)
        this.state = {}
    }

    render() {
        const { shopTitle, shopAddress, onHandleClick } = this.props
        return (
            <View
                className={styles.ShopItemMain}
                onClick={() => {
                    onHandleClick && onHandleClick()
                }}
            >
                <View className={styles.fitShop}>
                    <View className={styles.shopTitle}>{shopTitle}</View>
                    <View className={styles.shopAddress}>{shopAddress}</View>
                </View>
            </View>
        )
    }
}

export default ShopItem
