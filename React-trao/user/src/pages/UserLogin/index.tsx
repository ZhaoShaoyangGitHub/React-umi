import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Button, Image, Checkbox, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UserLoginProps, UserLoginState } from './index.interface'
import { isPoneAvailable } from '../../utils/function'
import styles from './UserLogin.module.less'
import { Icons } from '../../assets/img/load'
import { getWechatKey, getWechatPhone } from './apis'

@connect(({ UserLogin }) => ({
    ...UserLogin,
}))
class UserLogin extends Component<UserLoginProps, UserLoginState> {
    config: Config = {
        navigationBarTitleText: '登录',
    }
    public startTime
    public time
    public inputList = [1, 2, 3, 4, 5, 6]
    constructor(props: UserLoginProps) {
        super(props)
        this.state = {
            accountName: '',
            password: '',
            isAccFocus: true,
            isPwdFocus: false,
            count: 60,
            sendedMsgCode: false,
            sessionKey: '',
            isCodeOpened: false,
            isAgree: false,
        }
    }

    componentDidShow() {
        this.wxLogin()
    }

    componentDidHide() {
        clearInterval(this.time)
        this.time = null
    }

    wxLogin = () => {
        Taro.login({
            timeout: 2000,
            success: (res) => {
                if (res.code) {
                    getWechatKey({
                        jsCode: res.code,
                    }).then((res) => {
                        if (res.code === 'OK') {
                            this.setState({
                                sessionKey: res.data.session_key,
                            })
                            Taro.setStorage({
                                key: 'sessionKey',
                                data: res.data.session_key,
                            })
                        }
                    })
                } else {
                    Taro.showToast({
                        title: '登录失败！',
                        mask: true,
                        icon: 'none',
                    })
                }
            },
            fail: () => {
                Taro.showToast({
                    title: '登录失败！',
                    mask: true,
                    icon: 'none',
                })
            },
        })
    }

    getPhoneNumber = (e) => {
        const { errMsg, iv, encryptedData } = e.detail
        Taro.checkSession({
            success: () => {
                if (errMsg === 'getPhoneNumber:fail user deny') {
                } else {
                    getWechatPhone({
                        encryptedData,
                        iv,
                        sessionKey: this.state.sessionKey,
                    }).then((res) => {
                        console.log(res)
                        if (res.code === 'OK') {
                            if (res.data) {
                                Taro.setStorageSync('token', 'Bearer ' + res.data)
                                Taro.showToast({
                                    title: '登录成功！',
                                    mask: true,
                                    success: () => {
                                        Taro.switchTab({
                                            url: '/pages/Home/index',
                                        })
                                        const personalInfo = Taro.getStorageSync('personalInfo')
                                        if (!personalInfo) {
                                            this.props.dispatch({
                                                type: 'Personal/fetchUserInfo',
                                                cb: (data) => {
                                                    Taro.setStorageSync('personalInfo', JSON.stringify(data))
                                                },
                                            })
                                        }
                                    },
                                })
                            }
                        }
                    })
                }
            },
            fail: () => {
                this.wxLogin()
            },
        })
    }

    handleChangeAccount = (e) => {
        this.setState({ accountName: e.target.value })
    }

    handleSendCode = async () => {
        const { count, accountName, sendedMsgCode } = this.state
        if (!accountName) {
            Taro.showToast({
                title: '请输入手机号',
                icon: 'none',
            })
            return
        }
        if (!isPoneAvailable(accountName)) {
            Taro.showToast({
                title: '请输入有效手机号',
                icon: 'none',
            })
            return
        }
        if (!sendedMsgCode) {
            this.props.dispatch({ type: 'UserLogin/sendCode', payload: { phone: accountName } })
            this.startTime = new Date()
            this.time = setInterval(() => {
                this.setState(
                    { count: (count - this.checkTimeout(this.startTime)) as number, sendedMsgCode: true },
                    () => {
                        if (count - this.checkTimeout(this.startTime) <= 0) {
                            clearInterval(this.time)
                            this.time = null
                            this.setState({
                                count: 60,
                                sendedMsgCode: false,
                            })
                        }
                    },
                )
            }, 1000)
        }
    }

    RyUserLogin = () => {
        const { accountName, password, isAgree } = this.state
        if (!accountName) {
            Taro.showToast({
                title: '请输入手机号',
                icon: 'none',
            })
            return
        }
        if (!password) {
            Taro.showToast({
                title: '请输入手机验证码',
                icon: 'none',
            })
            return
        }
        if (!isPoneAvailable(accountName)) {
            Taro.showToast({
                title: '请输入有效手机号',
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
            type: 'UserLogin/userLog',
            payload: { mobile: accountName, verifyCode: password },
            cb: (token) => {
                Taro.setStorageSync('token', 'Bearer ' + token)
                Taro.switchTab({
                    url: '/pages/Home/index',
                })
                const personalInfo = Taro.getStorageSync('personalInfo')
                if (!personalInfo) {
                    this.props.dispatch({
                        type: 'Personal/fetchUserInfo',
                        cb: (data) => {
                            Taro.setStorageSync('personalInfo', JSON.stringify(data))
                        },
                    })
                }
            },
        })
    }

    checkTimeout = (time): number => {
        const date = new Date()
        const dateDiff = date.getTime() - time.getTime()
        return Number((dateDiff / 1000).toFixed(0))
    }

    handleChangePwd = (e) => {
        this.setState({ password: e.target.value })
    }

    checkClassName = (): string => {
        const { accountName } = this.state
        return this.time || !accountName ? styles.inputBtnGray : styles.inputBtn
    }

    changeAgreeStatues = () => {
        this.setState({
            isAgree: !this.state.isAgree,
        })
    }

    render() {
        const { accountName, password, isAccFocus, isPwdFocus, count, isAgree } = this.state
        return (
            <View className={styles.UserLoginMain}>
                <View className={styles.RYLogo}>
                    <Image src={Icons.logo} className={styles.logo} mode="widthFix" />
                </View>
                <View className={styles.RYTitle}>亦如康健康服务</View>
                <View className={isAccFocus ? styles.inputBoxItemActivated : styles.inputBoxItem}>
                    <View className={styles.left}>手机号</View>
                    <Input
                        className={styles.right}
                        type="number"
                        placeholder="请输入手机号"
                        maxLength={11}
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
                <View className={isPwdFocus ? styles.inputBoxItemActivated : styles.inputBoxItem}>
                    <View className={styles.left}>验证码</View>
                    <Input
                        className={styles.right}
                        type="number"
                        placeholder="请输入验证码"
                        onInput={this.handleChangePwd}
                        maxLength={6}
                        value={password}
                        onFocus={() => {
                            this.setState({ isPwdFocus: true })
                        }}
                        onBlur={() => {
                            this.setState({ isPwdFocus: false })
                        }}
                        focus={isPwdFocus}
                    />
                    <View className={this.checkClassName()} onClick={this.handleSendCode}>
                        {this.time ? '已发送(' + count + 's)' : '获取验证码'}
                    </View>
                </View>

                <View
                    className={styles.LoginAgreement}
                    onClick={() => {
                        this.changeAgreeStatues()
                    }}
                >
                    {isAgree ? (
                        <View className={styles.selected}>
                            <Image className={styles.selectedIcon} src={Icons.selected} mode="widthFix" />
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
                        this.RyUserLogin()
                    }}
                >
                    登录
                </View>
                <Button open-type="getPhoneNumber" className={styles.PhoneBtn} onGetPhoneNumber={this.getPhoneNumber}>
                    微信一键登录
                </Button>
            </View>
        )
    }
}
export default UserLogin
