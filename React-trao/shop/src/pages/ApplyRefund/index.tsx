import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ApplyRefundProps, ApplyRefundState } from './index.interface'
import PackItem from '../../components/PackItem'
import styles from './ApplyRefund.module.less'
import { BASEURL } from '../../config/index'

@connect(({ ApplyRefund }) => ({
    ...ApplyRefund,
}))
class ApplyRefund extends Component<ApplyRefundProps, ApplyRefundState> {
    config: Config = {
        navigationBarTitleText: '退款',
    }
    timer: any
    constructor(props: ApplyRefundProps) {
        super(props)
        this.state = {
            userId: 0,
            orderId: 0,
            code: '',
            packageInfo: {
                name: '',
                imageUrl: '',
                efficacy: '',
            },
            userInfo: {
                phone: '',
                nickName: '',
                province: '',
                city: '',
                area: '',
                avatar: '',
            },

            count: 60,
        }
        this.timer = null
    }

    componentDidShow = () => {
        const { userId, orderId } = this.$router.params
        this.setState(
            {
                userId: Number.parseInt(userId, 10) || 103,
                orderId: Number.parseInt(orderId, 10) || 0,
            },
            () => {
                this.getPackageDetail()
                this.getUserInfo()
            },
        )
    }
    // 获取用户信息
    getUserInfo = () => {
        const { userId } = this.state
        this.props.dispatch({
            type: 'PackageSchedul/getCurrentUserInfo',
            params: { userId },
            cb: (data) => {
                this.setState({ userInfo: data })
            },
        })
    }

    // 发送验证码
    handleSendCode = () => {
        const { userInfo } = this.state
        if (this.timer) {
            return
        }
        this.props.dispatch({
            type: 'RegisterUser/sendVertifyCode',
            params: { phone: userInfo.phone },
            cb: (code, message) => {
                if (code !== 'OK') {
                    Taro.showToast({
                        title: message || '发送失败',
                    })
                }
                this.timer = setInterval(() => {
                    const { count } = this.state
                    if (count <= 0) {
                        clearInterval(this.timer)
                        this.setState({
                            count: 60,
                        })
                        this.timer = null
                    } else {
                        this.setState({
                            count: count - 1,
                        })
                    }
                }, 1000)
            },
        })
    }

    getPackageDetail = () => {
        const { orderId } = this.state
        Taro.showLoading({ title: '' })
        this.props.dispatch({
            type: 'ApplyRefund/getPackageDetail',
            params: { orderId },
            cb: (data) => {
                Taro.hideLoading()
                this.setState({
                    packageInfo: {
                        imageUrl: data.goodsThumb,
                        name: data.goodsTitle,
                        efficacy: data.orderDesc,
                    },
                })
            },
        })
    }

    // 申请退款
    handleApply = () => {
        const { orderId, userInfo, code } = this.state
        this.props.dispatch({
            type: 'RegisterUser/checkCodePassport',
            params: { mobile: userInfo.phone, verifyCode: code },
            cb: (code, message) => {
                if (code !== 'OK') {
                    Taro.showToast({
                        title: message || '验证码错误',
                        icon: 'none',
                    })
                    return
                }
                this.props.dispatch({
                    type: 'ApplyRefund/applyRefund',
                    params: { orderId },
                    cb: (data) => {
                        Taro.showToast({
                            title: '申请成功',
                        })
                        setTimeout(() => {
                            Taro.navigateBack()
                        }, 2000)
                    },
                })
            },
        })
    }
    handleInput = (e: any) => {
        this.setState({
            code: e.detail.value,
        })
    }
    render() {
        const { userInfo, packageInfo, count, code } = this.state

        return (
            <View className={styles.ApplyRefundMain}>
                <View style={{ margin: '20rpx 0' }}>
                    <PackItem
                        imgSrc={packageInfo.imageUrl ? BASEURL + packageInfo.imageUrl : ''}
                        title={packageInfo.name}
                        showObj={[]}
                        orderId={0}
                        packageStatus={{ description: '' }}
                        btnList={[
                            {
                                title: '',
                                cb: () => {},
                            },
                        ]}
                        onHandleSuitClick={() => {}}
                        isShowStatus={false}
                        efficacy={packageInfo.efficacy}
                        isShowDetail
                    />
                </View>

                <View className={styles.form}>
                    <View className={styles.inputWrap}>
                        <Text className={styles.label}>会员名：</Text>
                        <Text className={styles.content}>{userInfo.nickName}</Text>
                    </View>
                    <View className={styles.inputWrap}>
                        <Text className={styles.label}>手机号：</Text>
                        <Text className={styles.content}>{userInfo.phone}</Text>
                    </View>
                    <View className={styles.inputWrap}>
                        <Text className={styles.label}>验证码：</Text>
                        <Input value={code} onInput={this.handleInput} />
                        <Text
                            className={this.timer ? `${styles.code} ${styles.active}` : styles.code}
                            onClick={this.handleSendCode}
                        >
                            {this.timer ? `已发送(${count}s)` : '获取验证码'}
                        </Text>
                    </View>
                </View>

                <View className={styles.button} onClick={this.handleApply}>
                    确认
                </View>
            </View>
        )
    }
}

export default ApplyRefund
