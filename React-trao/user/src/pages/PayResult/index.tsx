import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PayResultProps, PayResultState } from './index.interface'
import styles from './PayResult.module.less'
import { order } from '../../assets/img/load'

@connect(({ PayResult }) => ({
    ...PayResult,
}))
class PayResult extends Component<PayResultProps, PayResultState> {
    config: Config = {
        navigationBarTitleText: '标题',
    }
    constructor(props: PayResultProps) {
        super(props)
        this.state = {
            isPackage: false,
        }
    }

    componentDidShow = () => {
        const { type } = this.$router.params
        if (type === 'package') {
            this.setState({ isPackage: true }, () => {
                const { isPackage } = this.state
                if (isPackage) {
                    Taro.setNavigationBarTitle({
                        title: '预约成功',
                    })
                } else {
                    Taro.setNavigationBarTitle({
                        title: '支付成功',
                    })
                }
            })
        }
    }

    render() {
        const { type } = this.$router.params
        const { isPackage } = this.state
        return (
            <View className={styles.PayResultMain}>
                <Image className={styles.payresultIcon} src={order.paySuccess} />
                <View className={styles.payresultWord}>{!isPackage ? '支付成功' : '预约成功'}</View>

                {isPackage ? (
                    <View
                        className={styles.BackHome}
                        onClick={() => {
                            Taro.switchTab({
                                url: '/pages/Subscribe/index',
                            })
                        }}
                    >
                        返回预约
                    </View>
                ) : (
                    <View
                        className={styles.BackHome}
                        onClick={() => {
                            Taro.switchTab({
                                url: '/pages/Home/index',
                            })
                        }}
                    >
                        返回首页
                    </View>
                )}
                {!type && (
                    <View className={styles.warnningInfo}>
                        <View className={styles.title}>寇氏减肥一疗程保15斤，如违反以下条约，概不负责敬请谅解！</View>
                        <View className={styles.section}>1.减肥未超过标准体重的20%者</View>
                        <View className={styles.section}>2.减肥未按减肥食谱吃，私自吃错食物及时间者</View>
                        <View className={styles.section}>3.因私自吃错饮食减肥中掉重有增重者</View>
                        <View className={styles.section}>4.在减肥疗程中已达到标准体重或低于标准体重仍要求减肥者</View>
                        <View className={styles.section}>
                            5.继发性肥胖者(因自体有病而引发肥胖，如甲低、尿毒症、脑垂体异常)等
                        </View>
                        <View className={styles.section}>6.未按减肥疗程时间要求，未完成疗程者，个人原因中途停做者</View>
                        <View className={styles.section}>7.减肥期间口服药品，兴奋剂、减肥药、保健品、营养品等</View>
                        <View className={styles.section}>8.女人绝经后，男士55周岁以上代谢慢者，长期吃减肥药者</View>
                        <View className={styles.section}>9.儿童减肥好吃减肥垃圾食品者，成人喝酒者</View>
                        <View className={styles.section}>
                            10.患病期间，服药期间，出血倾向疾病，严重贫血，义务献血，流产未满一个月，低血糖，低血压，冠心病，酒精过敏，传染性皮肤病患者，经常熬夜者
                        </View>
                        <View className={styles.section}>
                            11.因体质不同，部分人拔罐后可能皮肤会出现水泡，属正常反应
                        </View>
                        <View className={styles.specTitle}>特别说明</View>
                        <View className={styles.section}>如体重超标，必须减到标准体重与疗程周期</View>
                    </View>
                )}

                {!type && <View className={styles.tip}>*以下病症者不适合拔罐减肥：心脏病、孕妇</View>}
            </View>
        )
    }
}

export default PayResult
