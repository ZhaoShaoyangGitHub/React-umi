import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ModifyPasswordProps, ModifyPasswordState } from './index.interface'
import styles from './ModifyPassword.module.less'
import { isPoneAvailable } from '../../utils/function'

@connect(({ ModifyPassword }) => ({
    ...ModifyPassword,
}))
class ModifyPassword extends Component<ModifyPasswordProps, ModifyPasswordState> {
    config: Config = {
        navigationBarTitleText: '修改密码',
    }
    constructor(props: ModifyPasswordProps) {
        super(props)
        this.state = {
            phone: '',
            code: '',
            status: 0,
            isSend: false,
            seconds: 61,
            newPassword: '',
        }
    }

    componentDidMount() {}

    handleChangeInput = (val: string, key: string) => {
        this.setState({
            [key]: val,
        })
    }

    // 验证码倒计时
    checkTimeout = (time): number => {
        const date = new Date()
        const dateDiff = date.getTime() - time.getTime()
        return Number((dateDiff / 1000).toFixed(0))
    }

    sendCode = () => {
        const { phone, isSend, seconds } = this.state
        if (!phone) {
            Taro.showToast({
                title: '请输入手机号',
                icon: 'none',
                mask: true,
            })
            return
        }
        if (!isPoneAvailable(phone)) {
            Taro.showToast({
                title: '请输入有效的手机号',
                icon: 'none',
                mask: true,
            })
            return
        }
        if (!isSend) {
            const startTime = new Date()
            let time: any = setInterval(() => {
                this.setState(
                    {
                        seconds: (seconds - this.checkTimeout(startTime)) as number,
                        isSend: true,
                    },
                    () => {
                        if (seconds - this.checkTimeout(startTime) <= 0) {
                            clearInterval(time)
                            time = null
                            this.setState({
                                seconds: 61,
                                isSend: false,
                            })
                        }
                    },
                )
            }, 100)
            this.props.dispatch({
                type: 'ModifyMobileNumber/sendCode',
                params: { phone: phone },
                cb: (message) => {
                    Taro.showToast({
                        title: message || '发送成功',
                        icon: 'none',
                    })
                },
            })
        }
    }

    checkTCode = () => {
        const { phone, code } = this.state
        if (!phone) {
            Taro.showToast({
                title: '请输入手机号',
                icon: 'none',
                mask: true,
            })
            return
        }
        if (!code) {
            Taro.showToast({
                title: '请输入验证码',
                icon: 'none',
                mask: true,
            })
            return
        }
        Taro.showLoading({
            title: '',
            mask: true,
        })
        this.props.dispatch({
            type: 'ModifyMobileNumber/verifyPhone',
            params: {
                mobile: phone,
                verifyCode: code,
            },
            cb: (code, data) => {
                if (code === 'OK') {
                    this.setState({
                        isSend: false,
                        seconds: 61,
                        status: 1,
                    })
                }
                Taro.hideLoading()
            },
        })
    }

    setNewPassword = () => {
        this.props.dispatch({
            type: 'ModifyPassword/updatePassword',
            payload: {
                newPassword: this.state.newPassword,
            },
            cb: () => {
                Taro.showToast({
                    title: '修改成功',
                    mask: true,
                    success: () => {
                        let timer: any = setTimeout(() => {
                            clearInterval(timer)
                            timer = null
                            Taro.navigateBack()
                        }, 1500)
                    },
                })
            },
        })
    }

    render() {
        const { phone, code, status, isSend, seconds, newPassword } = this.state
        return (
            <View className={styles.ModifyPasswordMain}>
                {status === 0 ? (
                    <View>
                        <View className={styles.formContent}>
                            <View className={styles.inputGroup}>
                                <View className={styles.title}>手机号</View>
                                <Input
                                    type="number"
                                    value={phone}
                                    className={styles.inputBox}
                                    placeholder="请输入手机号"
                                    onInput={(e: any) => this.handleChangeInput(e.target.value, 'phone')}
                                    placeholderStyle={'color: #999999'}
                                    maxLength={11}
                                />
                            </View>
                            <View className={styles.line}></View>
                            <View className={styles.inputGroup}>
                                <View className={styles.title}>验证码</View>
                                <Input
                                    type="number"
                                    value={code}
                                    className={styles.inputBox}
                                    placeholder="请输入验证码"
                                    onInput={(e: any) => this.handleChangeInput(e.target.value, 'code')}
                                    placeholderStyle={'color: #999999'}
                                    maxLength={6}
                                />
                                {isSend ? (
                                    <View className={`${styles.sendCodeBtn} ${styles.disable}`}>
                                        已发送({seconds}s)
                                    </View>
                                ) : (
                                    <View className={styles.sendCodeBtn} onClick={this.sendCode}>
                                        获取验证码
                                    </View>
                                )}
                            </View>
                        </View>
                        <View
                            className={`${styles.confirmBtn} ${(!phone || !code) && styles.disable}`}
                            onClick={this.checkTCode}
                        >
                            下一步
                        </View>
                    </View>
                ) : (
                    <View>
                        <View className={styles.formContent}>
                            <View className={styles.inputGroup}>
                                <View className={styles.titlePassword}>请输入新密码</View>
                                <Input
                                    type="text"
                                    value={newPassword}
                                    className={styles.inputBox}
                                    placeholder="请输入新密码"
                                    onInput={(e: any) => this.handleChangeInput(e.target.value, 'newPassword')}
                                    placeholderStyle={'color: #999999'}
                                />
                            </View>
                        </View>
                        <View
                            className={`${styles.confirmBtn} ${!newPassword && styles.disable}`}
                            onClick={this.setNewPassword}
                        >
                            完成
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default ModifyPassword
