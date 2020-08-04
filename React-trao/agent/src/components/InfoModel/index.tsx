import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { InfoModelProps, InfoModelState } from './index.interface'
import pos from '../../assets/img/pos.png'
import styles from './index.module.less'

class InfoModel extends Component<InfoModelProps, InfoModelState> {
    constructor(props: InfoModelProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: InfoModelProps = { title: '' }

    render() {
        const { title } = this.props
        return (
            <View className={styles.InfoModelMain}>
                <View className={styles.infoBox}>
                    <Image src={pos} className={styles.icon} />
                    <View className={styles.title}>{title}</View>
                    <View className={styles.info}>本次服务已结束</View>
                </View>
            </View>
        )
    }
}

export default InfoModel
