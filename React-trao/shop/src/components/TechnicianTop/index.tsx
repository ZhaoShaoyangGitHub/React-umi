import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { TechnicianTopProps } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './index.module.less'

function TechnicianTop(props: TechnicianTopProps) {
    const { avatar, name, workNumber } = props
    return (
        <View className={styles.technicianWrapper}>
            <View className={styles.avatarWrapper}>
                {avatar && (
                    <Image
                        src={avatar.includes('https://') ? avatar : BASEURL + avatar}
                        mode="widthFix"
                        className={styles.avatarImg}
                    />
                )}
            </View>
            <View className={styles.technicianInfo}>
                <View className={styles.name}>{name}</View>
                <View className={styles.workNumber}>工号：{workNumber}</View>
            </View>
            {this.props.children}
        </View>
    )
}

export default TechnicianTop
