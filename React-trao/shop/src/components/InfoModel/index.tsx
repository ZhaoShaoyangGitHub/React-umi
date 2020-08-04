import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { InfoModelProps, InfoModelState } from './index.interface'
import pos from '../../assets/img/pay-success.png'
import styles from './index.module.less'

class InfoModel extends Component<InfoModelProps, InfoModelState> {
    constructor(props: InfoModelProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: InfoModelProps = { title: '', content: '本次服务已结束' }

    render() {
        const { title, content } = this.props
        return (
            <View className={styles.InfoModelMain}>
                <View className={styles.infoBox}>
                    <Image src={pos} className={styles.icon} />
                    <View className={styles.title}>{title}</View>
                    <View className={styles.info}>{content}</View>
                </View>
            </View>
        )
    }
}

export default InfoModel
