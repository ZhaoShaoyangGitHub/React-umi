import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { NoSearchDataProps } from './index.interface'
import { EmptyImg } from '../../assets/img/load'
import styles from './index.module.less'

function NoSearchData(props: NoSearchDataProps) {
    const [text] = useState('门店')
    const [imageUrl] = useState('emptySearch')
    return (
        <View className={styles.NoSearchDataMain}>
            <View className={styles.noData} style={props.paddingStyle}>
                <Image className={styles.noShopBgImg} src={EmptyImg[props.imageUrl ? props.imageUrl : imageUrl]} />
                <View className={styles.noDataDesc}>暂无{props.text ? props.text : text}</View>
            </View>
        </View>
    )
}

export default NoSearchData
