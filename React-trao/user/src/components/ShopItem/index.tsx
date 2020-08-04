import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ShopItemProps, ShopItemState } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './index.module.less'

class ShopItem extends Component<ShopItemProps, ShopItemState> {
    constructor(props: ShopItemProps) {
        super(props)
        this.state = {}
    }
    handleMakeCall = (e: any): any => {
        e.stopPropagation()
        const { shopPhoneNum } = this.props
        Taro.makePhoneCall({
            phoneNumber: shopPhoneNum + '',
        }).then((res) => {})
    }

    handleSelect = (e) => {
        e.stopPropagation()
        const { handleSelectShop } = this.props
        if (handleSelectShop) {
            handleSelectShop()
        }
    }

    render() {
        const {
            shopImg,
            shopTitle,
            shopAddress,
            detailAddress,
            shopPhoneNum,
            propsStyles,
            shopPrice,
            shopDistance,
            onHandleClick,
            onHandleSuitClick,
            storeId,
            efficacy,
            isSelect,
            originalPrice,
        } = this.props
        return (
            <View
                className={styles.ShopItemMain}
                style={propsStyles}
                onClick={() => {
                    onHandleClick && onHandleClick()
                    onHandleSuitClick && onHandleSuitClick(storeId)
                }}
            >
                <View className={styles.fitShop}>
                    <View className={styles.fitShopImg}>
                        {shopImg && <Image className={styles.img} src={BASEURL + shopImg} mode="widthFix" />}
                    </View>
                    <View className={styles.shopInfo}>
                        <View className={styles.shopTitle}>{shopTitle}</View>
                        {shopAddress && <View className={styles.shopAddress}>{shopAddress}</View>}
                        {efficacy && <View className={styles.efficacy}>{efficacy}</View>}
                        {detailAddress && <View className={styles.shopAddress}>{detailAddress}</View>}
                        {shopPrice && (
                            <View className={styles.shopPrice}>
                                <View className={styles.moneyIcon}>¥</View>
                                <View className={styles.money}>{shopPrice}</View>
                                {originalPrice && <View className={styles.originalPrice}>¥{originalPrice}</View>}
                            </View>
                        )}
                        {shopDistance && <View className={styles.shopDistanceWord}>{shopDistance}</View>}
                        {shopPhoneNum && (
                            <View className={styles.shopPhone} onClick={(e) => this.handleMakeCall}>
                                拨打电话
                            </View>
                        )}
                        {isSelect && (
                            <View className={styles.select} hoverStopPropagation onClick={this.handleSelect}>
                                选择
                            </View>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default ShopItem
