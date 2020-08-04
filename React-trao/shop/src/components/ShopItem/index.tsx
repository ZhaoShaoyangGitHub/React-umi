import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopItemProps, ShopItemState } from './index.interface'
import styles from './index.module.less'

class ShopItem extends Component<ShopItemProps, ShopItemState> {
    constructor(props: ShopItemProps) {
        super(props)
        this.state = {}
    }
    handleMakeCall = () => {
        const { shopPhoneNum } = this.props
        Taro.makePhoneCall({
            phoneNumber: shopPhoneNum + '',
        }).then(res => {})
    }
    render() {
        const {
            shopImg,
            shopTitle,
            shopAddress,
            shopPhoneNum,
            propsStyles,
            shopPrice,
            shopDistance,
            onHandleClick,
        } = this.props
        return (
            <View
                className={styles.ShopItemMain}
                style={propsStyles}
                onClick={() => {
                    onHandleClick && onHandleClick()
                }}
            >
                <View className={styles.fitShop}>
                    <Image className={styles.fitShopImg} src={shopImg} />
                    <View className={styles.shopInfo}>
                        <View className={styles.shopTitle}>{shopTitle}</View>
                        <View className={styles.shopAddress}>{shopAddress}</View>
                        {shopPrice &&
                            <View className={styles.shopPrice}>
                                <View className={styles.moneyIcon}>¥</View>
                                <View className={styles.money}>500.00</View>
                            </View>
                        }
                        {shopDistance && <View className={styles.shopDistanceWord}>{shopDistance}</View>}
                        {shopPhoneNum &&
                            <View className={styles.shopPhone} onClick={this.handleMakeCall}>
                                拨打电话
                            </View>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default ShopItem
