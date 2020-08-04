import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopItemProps, ShopItemState } from './index.interface'
import styles from './index.module.less'
import lookViews from '../../assets/img/look-views.png'
import likeIcon from '../../assets/img/like-icon.png'

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
        const { shopImg, shopTitle, shopAddress, shopPhoneNum, propsStyles, shopPrice, onHandleClick } = this.props
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
                        <View className={styles.botItems}>
                            <View className={styles.views}>
                                <Image src={lookViews} className={styles.lookImg} />
                                <View className={styles.desc}>201</View>
                            </View>
                            <View className={styles.likes}>
                                <Image src={likeIcon} className={styles.lookImg} />
                                <View className={styles.desc}>666</View>
                            </View>
                            <View className={styles.date}>2019-08-15</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ShopItem
