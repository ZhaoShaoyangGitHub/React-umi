import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import styles from './HelpCenterDetail.module.less'
import { buyImages } from '../../assets/img/load'
const titleList: any = ['如何购买']

function HelpCenterDetail() {
    const { params } = useRouter()
    const [title, setTitle] = useState(titleList[params.id])
    useEffect(() => {
        Taro.setNavigationBarTitle({
            title,
        })
        return
    }, [title])
    return (
        <View className={styles.container}>
            <View className={styles.content}>
                <View className={styles.title}>{title}</View>
                <View className={styles.detail}>
                    {params.id === '0' && (
                        <View className={styles.howBuy}>
                            <View className={styles.buyTitle}>1、进入商城，点击需要购买的套餐/商品</View>
                            <Image src={buyImages.img1} className={styles.addIcon} mode="widthFix" />
                            <View className={styles.buyTitle}>2、以套餐为例，进入套餐详情，选择服务门店</View>
                            <Image src={buyImages.img2} className={styles.addIcon} mode="widthFix" />
                            <View className={styles.buyTitle}>
                                3、点击去结算或加入购物车有信息弹窗，确认购买信息无误后进入下一步。
                            </View>
                            <Image src={buyImages.img3} className={styles.addIcon} mode="widthFix" />
                            <View className={styles.buyTitle}>4、可选择微信支付或线下支付。</View>
                            <Image src={buyImages.img4} className={styles.addIcon} mode="widthFix" />
                            <View className={styles.buyTitle}>
                                5、选择线下支付的需于相关门店联系，并通过线下支付订单后才能进行下一步
                            </View>
                            <Image src={buyImages.img5} className={styles.addIcon} mode="widthFix" />
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}
export default HelpCenterDetail
