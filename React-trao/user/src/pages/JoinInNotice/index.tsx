import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Styles from './JoinInNotice.module.less'

function JoinInNotice() {
    useEffect(() => {
        Taro.setNavigationBarTitle({
            title: '加盟须知',
        })
    }, [])
    return (
        <View className={Styles.container}>
            <View className={Styles.title}>加盟优势</View>
            <View className={Styles.txt}>1、安全性-传统养生理论为基础，无创伤理疗，安全无忧</View>
            <View className={Styles.txt}>2、独特性-产品核心独家掌握，差异化优势竞争力强</View>
            <View className={Styles.txt}>3、支持多-技术、营销、软件、售后等全方位支持</View>
            <View className={Styles.txt}>4、成本低-投资少，回报快</View>
            <View className={Styles.txt}>5、效果保障-专业培训指导，科学健康无副作用</View>
            <View className={Styles.txt}>6、区域保护-严格实行区域保护政策</View>
            <View className={Styles.marginBottom}></View>
            <View className={Styles.title}>加盟优势</View>
            <View className={Styles.txt}>1、喜爱健康行业，热情专注，敬业上进</View>
            <View className={Styles.txt}>2、有一定投资实力和商业经验</View>
            <View className={Styles.txt}>3、认同荣月健康企业文化、经营理念以及市场规范</View>
            <View className={Styles.txt}>4、信誉良好，具备合法经营资质</View>
        </View>
    )
}

export default JoinInNotice
