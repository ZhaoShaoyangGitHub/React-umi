import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PayResultProps, PayResultState } from './index.interface'
import styles from './PayResult.module.less'
import { publicImages } from '../../assets/img/load'

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
            this.setState({ isPackage: true })
        }
    }

    render() {
        return (
            <View className={styles.PayResultMain}>
                <Image className={styles.payresultIcon} src={publicImages.checked} />
                <View className={styles.payresultWord}>{'支付成功'}</View>
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
            </View>
        )
    }
}

export default PayResult
