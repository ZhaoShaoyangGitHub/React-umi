import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { PopupProps, PopupState } from './index.interface'
import styles from './index.module.less'
import { Icons } from '../../assets/img/load'

class Popup extends Component<PopupProps, PopupState> {
    constructor(props: PopupProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View className={styles.PopupMain}>
                {this.props.children}
                <Image
                    className={styles.closeIcon}
                    src={Icons.checkinClose}
                    mode="widthFix"
                    onClick={this.props.onClick && this.props.onClick}
                />
            </View>
        )
    }
}

export default Popup
