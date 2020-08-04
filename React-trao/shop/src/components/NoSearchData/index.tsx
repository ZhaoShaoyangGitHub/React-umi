import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { NoSearchDataProps } from './index.interface'
import { EmptyImg } from '../../assets/img/load'
import styles from './index.module.less'

function NoSearchData(props: NoSearchDataProps) {
    const [type] = useState('门店')
    return (
        <View className={styles.NoSearchDataMain}>
            <View className={styles.noData}>
                <Image className={styles.noShopBgImg} src={EmptyImg.emptyShop} />
                <View className={styles.noDataDesc}>暂无搜索{props.type ? props.type : type}</View>
            </View>
        </View>
    )
}

export default NoSearchData
