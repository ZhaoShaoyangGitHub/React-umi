import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { RegisterUserProps, RegisterUserState } from './index.interface'
import styles from './RegisterUser.module.less'
// import { } from '../../components'

@connect(({ RegisterUser }) => ({
    ...RegisterUser,
}))
class RegisterUser extends Component<RegisterUserProps, RegisterUserState> {
    config: Config = {
        navigationBarTitleText: '注册',
    }
    public startTime
    public time
    constructor(props: RegisterUserProps) {
        super(props)
        this.state = {
            userCode: '',
            userName: '',
            userPhone: '',
            isAccFocus: true,
            isPwdFocus: false,
            isCodeFocus: false,
            count: 61,
        }
    }

    componentDidMount() {}
    handleChangeAccount = e => {
        this.setState({ userName: e.target.value }, () => {
            console.log('姓名', this.state.userName)
        })
    }
    handleChangePwd = e => {
        this.setState({ userPhone: e.target.value }, () => {
            console.log('手机号', this.state.userPhone)
        })
    }
    handleChangeCode = e => {
        this.setState({ userCode: e.target.value }, () => {
            console.log('验证码', this.state.userCode)
        })
    }
    handleLogin = () => {
        const { userName, userPhone, userCode } = this.state
        console.log('做饭')
        this.props.dispatch({
            type: 'RegisterUser/checkCodePassport',
            params: { mobile: userPhone, verifyCode: userCode },
            cb: (code, message) => {
                if (code !== 'OK') {
                    Taro.showToast({
                        title: message || '验证码错误',
                        icon: 'none',
                    })
                    return
                }
                this.props.dispatch({
                    type: 'RegisterUser/createUserReg',
                    params: { name: userName, phone: userPhone },
                    cb: data => {
                        Taro.showToast({
                            title: '创建用户成功',
                        })
                        // this.props.dispatch({ type: 'OrderConfirm/saveRegisterUser', payload: data })
                        const pages = Taro.getCurrentPages()
                        const prevPage = pages[pages.length - 3] //上上一个页面
                        prevPage.setData({
                            regdata: data,
                        })
                        Taro.navigateBack({
                            delta: 2, // 返回上上一级页面
                        })
                    },
                })
            },
        })
    }
    checkClassName = (): string => {
        return this.time ? styles.inputBtnGray : styles.inputBtn
    }
    handleSendCode = async () => {
        const { count, userName, userPhone } = this.state
        if (!userName || !userPhone) {
            Taro.showToast({
                title: '请输入姓名和手机号',
                icon: 'none',
            })
        } else {
            this.props.dispatch({
                type: 'RegisterUser/sendVertifyCode',
                params: { phone: userPhone },
                cb: (code, message) => {
                    if (code !== 'OK') {
                        Taro.showToast({
                            title: message || '验证码错误',
                        })
                    }
                },
            })
            this.startTime = new Date()
            this.time = setInterval(() => {
                this.setState({ count: (count - this.checkTimeout(this.startTime)) as number }, () => {
                    if (count - this.checkTimeout(this.startTime) <= 0) {
                        clearInterval(this.time)
                        this.time = null
                        this.setState({
                            count: 61,
                        })
                    }
                })
            }, 1000)
        }
    }
    checkTimeout = (time): number => {
        const date = new Date()
        const dateDiff = date.getTime() - time.getTime()
        return Number((dateDiff / 1000).toFixed(0))
    }
    render() {
        const { userName, userPhone, userCode, isAccFocus, isPwdFocus, isCodeFocus, count } = this.state

        return (
            <View className={styles.RegisterUserMain}>
                <View className={styles.RYLogo} />
                <View className={styles.RYTitle}>荣月健康</View>
                <View className={isAccFocus ? styles.inputBoxItemActived : styles.inputBoxItem}>
                    <View className={styles.left}>姓 名</View>
                    <Input
                        className={styles.right}
                        type="text"
                        placeholder="请输入姓名"
                        value={userName}
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
                    <View className={styles.left}>手机号</View>
                    <Input
                        className={styles.right}
                        type="text"
                        placeholder="请输入手机号"
                        onInput={this.handleChangePwd}
                        value={userPhone}
                        onFocus={() => {
                            this.setState({ isPwdFocus: true })
                        }}
                        onBlur={() => {
                            this.setState({ isPwdFocus: false })
                        }}
                        focus={isPwdFocus}
                    />
                </View>
                <View className={isCodeFocus ? styles.inputBoxItemActived : styles.inputBoxItem}>
                    <View className={styles.left}>验证码</View>
                    <Input
                        className={styles.right}
                        type="text"
                        placeholder="请输入验证码"
                        onInput={this.handleChangeCode}
                        value={userCode}
                        onFocus={() => {
                            this.setState({ isCodeFocus: true })
                        }}
                        onBlur={() => {
                            this.setState({ isCodeFocus: false })
                        }}
                        focus={isCodeFocus}
                    />
                    <View className={this.checkClassName()} onClick={this.handleSendCode}>
                        {this.time ? '已发送(' + count + 's)' : '获取验证码'}
                    </View>
                </View>
                <View className={styles.LoginBtn} onClick={this.handleLogin}>
                    注册
                </View>
            </View>
        )
    }
}

export default RegisterUser
