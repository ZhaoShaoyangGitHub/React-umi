import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UserLoginProps, UserLoginState } from './index.interface'
import styles from './UserLogin.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ UserLogin }) => ({
    ...UserLogin,
}))
class UserLogin extends Component<UserLoginProps, UserLoginState> {
    config: Config = {
        navigationBarTitleText: '登录',
    }
    constructor(props: UserLoginProps) {
        super(props)
        this.state = {
            accountName: '',
            password: '',
            isAccFocus: true,
            isPwdFocus: false,
            isAuthorization: false,
            isAgree: false,
        }
    }
    changeAgreeStatues = () => {
        this.setState({
            isAgree: !this.state.isAgree,
        })
    }
    componentDidMount() {
        // 用户是否授权
        Taro.getSetting().then((res) => {
            if (res.authSetting['scope.userInfo']) {
                this.setState(
                    {
                        isAuthorization: true,
                    },
                    () => {
                        Taro.getUserInfo().then((res) => {
                            Taro.setStorage({
                                key: 'userInfo',
                                data: res.userInfo,
                            })
                        })
                    },
                )

                return
            } else {
            }
        })
    }
    handleChangeAccount = (e) => {
        this.setState({ accountName: e.target.value })
    }
    handleChangePwd = (e) => {
        this.setState({ password: e.target.value })
    }
    handleLogin = () => {
        const { accountName, password, isAgree } = this.state
        if (!accountName) {
            Taro.showToast({
                title: '请输入账号',
                icon: 'none',
            })
            return
        }
        if (!password) {
            Taro.showToast({
                title: '请输入密码',
                icon: 'none',
            })
            return
        }
        if (!isAgree) {
            Taro.showToast({
                title: '请阅读并同意协议',
                icon: 'none',
            })
            return
        }
        this.props.dispatch({
            type: 'UserLogin/userSignIn',
            params: { userName: accountName, password: password },
            cb: (data, msg) => {
                Taro.showToast({
                    title: msg,
                    duration: 2000,
                })
                Taro.setStorageSync('token', data)
                this.props.dispatch({
                    type: 'Personal/getUserInfo',
                    cb: (data) => {
                        Taro.setStorage({
                            key: 'personalInfo',
                            data: JSON.stringify(data),
                        })
                    },
                })
                Taro.switchTab({
                    url: '/pages/Home/index',
                })
            },
        })
    }
    render() {
        const { accountName, password, isAccFocus, isPwdFocus, isAgree } = this.state
        return (
            <View className={styles.UserLoginMain}>
                <View className={styles.RYLogo}>
                    <Image src={publicImages.logo} className={styles.logo} mode="widthFix" />
                </View>
                <View className={styles.RYTitle}>亦如康·门店端</View>
                <View className={isAccFocus ? styles.inputBoxItemActived : styles.inputBoxItem}>
                    <View className={styles.left}>账号</View>
                    <Input
                        className={styles.right}
                        type="number"
                        placeholder="请输入账号"
                        value={accountName}
                        onInput={this.handleChangeAccount}
                        onFocus={() => {
                            this.setState({ isAccFocus: true })
                        }}
                        onBlur={() => {
                            this.setState({ isAccFocus: false })
                        }}
                        focus={isAccFocus}
                    />
                </View>
                <View className={isPwdFocus ? styles.inputBoxItemActived : styles.inputBoxItem}>
                    <View className={styles.left}>密码</View>
                    <Input
                        className={styles.right}
                        type="text"
                        password
                        placeholder="请输入密码"
                        onInput={this.handleChangePwd}
                        value={password}
                        onFocus={() => {
                            this.setState({ isPwdFocus: true })
                        }}
                        onBlur={() => {
                            this.setState({ isPwdFocus: false })
                        }}
                        focus={isPwdFocus}
                    />
                </View>
                <View
                    className={styles.LoginAgreement}
                    onClick={() => {
                        this.changeAgreeStatues()
                    }}
                >
                    {isAgree ? (
                        <View className={styles.selected}>
                            <Image className={styles.selectedIcon} src={publicImages.selectedIcon} mode="widthFix" />
                        </View>
                    ) : (
                        <View className={styles.select}></View>
                    )}
                    <View className={styles.selectWarn}>
                        我已阅读并接受
                        <View
                            className={styles.agreementLink}
                            onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/LoginAgreement/index',
                                })
                            }}
                        >
                            《服务协议》
                        </View>
                        的所有条款
                    </View>
                </View>
                <View
                    className={styles.LoginBtn}
                    onClick={() => {
                        this.handleLogin()
                    }}
                >
                    登录
                </View>
            </View>
        )
    }
}

export default UserLogin
