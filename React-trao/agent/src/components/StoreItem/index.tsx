import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { StoreItemProps } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './index.module.less'

function StoreItem(props: StoreItemProps) {
    const { storeImg, storeTitle, storeAddress, propsStyles, nameStyles, onHandleClick, itemStyles } = props
    return (
        <View
            className={styles.ShopItemMain}
            style={{ ...propsStyles }}
            onClick={() => {
                onHandleClick && onHandleClick()
            }}
        >
            <View className={styles.storeItem} style={{ ...itemStyles }}>
                {storeImg && (
                    <View className={styles.storeImg}>
                        <Image src={BASEURL + storeImg} mode="widthFix" className={styles.img} />
                    </View>
                )}
                <View className={styles.storeInfo}>
                    <View className={styles.title} style={{ ...nameStyles }}>
                        {storeTitle}
                    </View>
                    <View className={styles.address}>{storeAddress}</View>
                </View>
                {this.props.children}
            </View>
        </View>
    )
}

export default StoreItem
