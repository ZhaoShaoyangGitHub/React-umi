import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UserSettingProps, UserSettingState } from './index.interface'
import styles from './UserSetting.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ UserSetting }) => ({
    ...UserSetting,
}))
class UserSetting extends Component<UserSettingProps, UserSettingState> {
    config: Config = {
        navigationBarTitleText: '设置',
    }
    constructor(props: UserSettingProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
        }
    }
    goPersonalDataPage = () => {
        Taro.navigateTo({
            url: '/pages/PersonalData/index',
        })
    }
    ModifyMobileNumber = () => {
        Taro.navigateTo({
            url: '/pages/ModifyMobileNumber/index',
        })
    }
    ModifyPassword = () => {
        Taro.navigateTo({
            url: '/pages/ModifyPassword/index',
        })
    }
    handleLogout = () => {
        Taro.showModal({
            title: '提示',
            content: '确认退出登录吗',
            success: function (res) {
                if (res.confirm) {
                    Taro.removeStorageSync('token')
                    Taro.removeStorageSync('personalInfo')
                    Taro.reLaunch({ url: '/pages/UserLogin/index' })
                } else if (res.cancel) {
                }
            },
        })
    }
    render() {
        return (
            <View className={styles.UserSettingMain}>
                <View className={styles.userSelectArea}>
                    <View className={styles.setItem} onClick={this.goPersonalDataPage}>
                        <View className={styles.setTitle}>个人资料</View>
                        <Image className={styles.setImg} src={publicImages.jumpIcon} />
                    </View>
                    <View className={styles.setItem} onClick={this.ModifyMobileNumber}>
                        <View className={styles.setTitle}>修改手机号</View>
                        <Image className={styles.setImg} src={publicImages.jumpIcon} />
                    </View>
                    <View className={styles.setItem} onClick={this.ModifyPassword}>
                        <View className={styles.setTitle}>修改密码</View>
                        <Image className={styles.setImg} src={publicImages.jumpIcon} />
                    </View>
                </View>

                <View className={styles.userLogout} onClick={this.handleLogout}>
                    退出登录
                </View>
            </View>
        )
    }
}

export default UserSetting
