import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UserSettingProps, UserSettingState } from './index.interface'
import styles from './UserSetting.module.less'
import { Icons } from '../../assets/img/load'

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

    componentDidMount() {}
    FixPhoneNumber = () => {
        try {
            var value = Taro.getStorageSync('personalInfo')
            if (value) {
                Taro.navigateTo({
                    url: '/pages/FixPhoneNumber/index',
                })
            } else {
                Taro.showToast({
                    title: '未登录',
                    icon: 'none',
                    success: function () {
                        Taro.navigateTo({
                            url: '/pages/UserLogin/index',
                        })
                    },
                })
            }
        } catch (e) {}
    }
    handleLogout = () => {
        Taro.showModal({
            title: '提示',
            content: '确认退出登录吗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    Taro.removeStorageSync('token')
                    Taro.removeStorageSync('personalInfo')
                    Taro.reLaunch({ url: '/pages/UserLogin/index' })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
        })
    }
    render() {
        return (
            <View className={styles.UserSettingMain}>
                <View className={styles.userSelectArea}>
                    <View className={styles.setItem} onClick={this.FixPhoneNumber}>
                        <View className={styles.setTitle}>修改手机号</View>
                        <Image className={styles.setImg} src={Icons.findMore} />
                    </View>
                    <View className={styles.setItem}>
                        <View className={styles.setTitle}>意见反馈</View>
                        <Image className={styles.setImg} src={Icons.findMore} />
                        <Button className={styles.feedback} open-type="feedback"></Button>
                    </View>
                    <View
                        className={styles.setItem}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/AboutUs/index',
                            })
                        }}
                    >
                        <View className={styles.setTitle}>关于我们</View>
                        <Image className={styles.setImg} src={Icons.findMore} />
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
