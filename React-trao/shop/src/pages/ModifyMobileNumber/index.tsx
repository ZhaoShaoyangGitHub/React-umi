import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ModifyMobileNumberProps, ModifyMobileNumberState } from './index.interface'
import styles from './FixPhoneNumber.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ ModifyMobileNumber }) => ({
    ...ModifyMobileNumber,
}))
class ModifyMobileNumber extends Component<ModifyMobileNumberProps, ModifyMobileNumberState> {
    config: Config = {
        navigationBarTitleText: '修改手机号',
    }
    public startTime
    public time
    public time2
    constructor(props: ModifyMobileNumberProps) {
        super(props)
        this.state = {
            verificationCode: '',
            verificationCodeNewPhone: '',
            count: 61,
            isOld: true,
            userPhone: null,
            personalInfo: {},
            isSended: false,
        }
    }

    componentDidMount() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
            return
        }
        const personalInfo = Taro.getStorageSync('personalInfo')
        if (personalInfo) {
            this.setState({ personalInfo: JSON.parse(personalInfo) })
        } else {
            this.props.dispatch({
                type: 'Personal/getUserInfo',
                cb: (data) => {
                    this.setState({
                        personalInfo: data,
                    })
                    Taro.setStorage({
                        key: 'personalInfo',
                        data: JSON.stringify(data),
                    })
                },
            })
        }
    }

    // 发送旧手机号的验证码
    handleSendCode = async () => {
        const { isSended, count, personalInfo } = this.state
        if (!isSended) {
            this.startTime = new Date()
            this.time = setInterval(() => {
                this.setState({ count: (count - this.checkTimeout(this.startTime)) as number, isSended: true }, () => {
                    if (count - this.checkTimeout(this.startTime) <= 0) {
                        clearInterval(this.time)
                        this.time = null
                        this.setState({
                            count: 61,
                            isSended: false,
                        })
                    }
                })
            }, 100)
            this.props.dispatch({
                type: 'ModifyMobileNumber/sendCode',
                params: { phone: personalInfo.phone },
                cb: (message) => {
                    Taro.showToast({
                        title: message || '发送成功',
                        icon: 'none',
                    })
                },
            })
        }
    }

    handleSendCodeByFix = async () => {
        const { count, isSended, userPhone } = this.state
        if (!isSended) {
            this.props.dispatch({
                type: 'ModifyMobileNumber/sendCode',
                params: { phone: userPhone },
                cb: (message) => {
                    Taro.showToast({
                        title: message || '验证码已发送！',
                        icon: 'none',
                    })
                    this.startTime = new Date()
                    this.time2 = setInterval(() => {
                        this.setState(
                            { count: (count - this.checkTimeout(this.startTime)) as number, isSended: true },
                            () => {
                                if (count - this.checkTimeout(this.startTime) <= 0) {
                                    clearInterval(this.time2)
                                    this.time2 = null
                                    this.setState({
                                        count: 61,
                                        isSended: false,
                                    })
                                }
                            },
                        )
                    }, 1000)
                },
            })
        }
    }

    // 验证码倒计时
    checkTimeout = (time): number => {
        const date = new Date()
        const dateDiff = date.getTime() - time.getTime()
        return Number((dateDiff / 1000).toFixed(0))
    }

    handleInputVal = (e) => {
        const value = e.detail.value
        this.setState({ verificationCode: value })
    }

    handlePhoneChange = (e) => {
        this.setState({ userPhone: e.target.value })
    }
    handleVerificationCodeNewPhoneChange = (e) => {
        this.setState({ verificationCodeNewPhone: e.target.value })
    }

    // 旧手机号验证码是否正确 666666
    bindNewPhoneNumber = () => {
        const { personalInfo, verificationCode } = this.state
        this.props.dispatch({
            type: 'ModifyMobileNumber/verifyPhone',
            params: { mobile: personalInfo.phone, verifyCode: verificationCode },
            cb: (code, data) => {
                if (code === 'OK') {
                    this.setState({ isOld: false, isSended: false, count: 61 })
                    clearInterval(this.time)
                    this.time = null
                    Taro.setNavigationBarTitle({
                        title: '绑定新手机号',
                    })
                } else {
                    Taro.showToast({
                        title: data || '验证码不对',
                        icon: 'none',
                    })
                }
            },
        })
    }

    //确认更改手机号
    bindNew = () => {
        const { verificationCode, userPhone } = this.state
        this.props.dispatch({
            type: 'ModifyMobileNumber/verifyPhone',
            params: { mobile: userPhone, verifyCode: verificationCode },
            cb: (code, data) => {
                if (code === 'OK') {
                    this.setState({ isOld: false, isSended: false, count: 61 })
                    clearInterval(this.time)
                    this.time = null
                    this.props.dispatch({
                        type: 'ModifyMobileNumber/updateMobile',
                        params: { mobile: userPhone, verifyCode: verificationCode },
                        cb: (message) => {
                            Taro.showToast({
                                title: message || '验证码已发送！',
                                icon: 'none',
                                duration: 1500,
                            }).then(() => {
                                Taro.redirectTo({
                                    url: '/pages/UserSetting/index',
                                })
                            })
                        },
                    })
                } else {
                    Taro.showToast({
                        title: data || '验证码不对',
                        icon: 'none',
                    })
                }
            },
        })
    }
    render() {
        const {
            verificationCode,
            count,
            isOld,
            isSended,
            userPhone,
            verificationCodeNewPhone,
            personalInfo,
        } = this.state
        return (
            <View className={styles.FixPhoneNumberMain}>
                {isOld ? (
                    <View className={styles.fixOldPhone}>
                        <Image className={styles.fixPhoneImg} src={publicImages.modifyPhone} />
                        <View className={styles.title}>修改手机号需要验证</View>
                        {personalInfo.phone && (
                            <View className={styles.info}>
                                你的手机号码：
                                {personalInfo.phone.substring(0, 3) +
                                    '****' +
                                    personalInfo.phone.substring(7, personalInfo.phone.length)}
                            </View>
                        )}
                        <View className={styles.inputArea}>
                            <View className={styles.inputTitle}>验证码</View>
                            <Input
                                // type="number"
                                value={verificationCode}
                                onInput={(e) => {
                                    this.handleInputVal(e)
                                }}
                                placeholder="请输入验证码"
                                placeholderClass={styles.placeholder}
                                className={styles.input}
                            />
                            <View className={this.checkClassName(1)} onClick={this.handleSendCode}>
                                {this.time ? '已发送(' + count + 's)' : '获取验证码'}
                            </View>
                        </View>
                        {verificationCode && isSended ? (
                            <View className={styles.finalBtnClick} onClick={this.bindNewPhoneNumber}>
                                验证后绑定新手机
                            </View>
                        ) : (
                            <View className={styles.finalBtn}>验证后绑定新手机</View>
                        )}
                    </View>
                ) : (
                    <View className={styles.fixOldPhone}>
                        <View className={styles.inputArea}>
                            <View className={styles.inputTitle}>手机号</View>
                            <Input
                                type="number"
                                placeholder="请填写新手机号码"
                                placeholderClass={styles.placeholder}
                                className={styles.input}
                                onInput={this.handlePhoneChange}
                                value={userPhone}
                            />
                        </View>
                        <View className={styles.inputArea}>
                            <View className={styles.inputTitle}>验证码</View>
                            <Input
                                type="number"
                                placeholder="请填写验证码"
                                placeholderClass={styles.placeholder}
                                className={styles.input}
                                onInput={this.handleVerificationCodeNewPhoneChange}
                                value={verificationCodeNewPhone}
                            />
                            <View className={this.checkClassName(2)} onClick={this.handleSendCodeByFix}>
                                {this.time2 ? '已发送(' + count + 's)' : '获取验证码'}
                            </View>
                        </View>
                        {verificationCodeNewPhone && userPhone && isSended ? (
                            <View className={styles.finalBtnClick} onClick={this.bindNew}>
                                确认
                            </View>
                        ) : (
                            <View className={styles.finalBtn}>确认</View>
                        )}
                    </View>
                )}
            </View>
        )
    }
    checkClassName = (type): string => {
        switch (type) {
            case 1:
                return this.time ? styles.inputBtnGray : styles.inputBtn
            case 2:
                return this.time2 ? styles.inputBtnGray : styles.inputBtn
            default:
                return this.time ? styles.inputBtnGray : styles.inputBtn
        }
    }
}

export default ModifyMobileNumber
