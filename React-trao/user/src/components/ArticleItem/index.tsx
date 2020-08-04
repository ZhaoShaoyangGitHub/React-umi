import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { ArticleItemProps } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './index.module.less'
import { getToday } from '../../utils/function'
import { Icons } from '../../assets/img/load'

function ArticleItem(props: ArticleItemProps) {
    const { articleImg, articleTitle, numberWatch, thumbUpNumber, data, propsStyles, onHandleClick } = props
    return (
        <View
            className={styles.ShopItemMain}
            style={propsStyles}
            onClick={() => {
                onHandleClick && onHandleClick()
            }}
        >
            <View className={styles.fitShop}>
                <Image className={styles.fitShopImg} src={BASEURL + articleImg} />
                <View className={styles.shopInfo}>
                    <View className={styles.shopTitle}>{articleTitle}</View>
                    <View className={styles.botItems}>
                        <View className={styles.views}>
                            <Image src={Icons.lookViews} className={styles.lookImg} />
                            <View className={styles.desc}>{numberWatch}</View>
                        </View>
                        <View className={styles.likes}>
                            <Image src={Icons.likeIcon} className={styles.lookImg} />
                            <View className={styles.desc}>{thumbUpNumber}</View>
                        </View>
                        <View className={styles.data}>{getToday(data)}</View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ArticleItem
