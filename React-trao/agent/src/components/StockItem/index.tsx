import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { StockItemProps } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './index.module.less'

const StockItem = ({
    goodsImage = '',
    goodsTitle = '玫瑰精油',
    goodsStorage = 191,
    onClick = () => {},
    isShowButotn = true,
}: StockItemProps) => {
    return (
        <View className={styles.container}>
            <View className={styles.info}>
                <View className={styles.goodsImgWrapper}>
                    {goodsImage && <Image className={styles.goodsImg} src={BASEURL + goodsImage} />}
                </View>
                <View className={styles.goodsDel}>
                    <Text className={styles.goodsTitle}>{goodsTitle}</Text>
                    <Text className={styles.storage}>库存{goodsStorage || 0}瓶</Text>
                </View>
            </View>
            {/* {isShowButotn && (
                <Text className={styles.button} onClick={onClick}>
                    申请换货
                </Text>
            )} */}
        </View>
    )
}

export default StockItem
