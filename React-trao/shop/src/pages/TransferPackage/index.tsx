import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { TransferPackageProps, TransferPackageState } from './index.interface'
import PackItem from '../../components/PackItem'
import styles from './TransferPackage.module.less'
import TitleSession from '../../components/TitleSession'
import { BASEURL } from '../../config/index'

@connect(({ TransferPackage }) => ({
    ...TransferPackage,
}))
class TransferPackage extends Component<TransferPackageProps, TransferPackageState> {
    config: Config = {
        navigationBarTitleText: '转让订单',
    }
    timer: any
    constructor(props: TransferPackageProps) {
        super(props)
        this.state = {
            oldUserId: 0,
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
            oldUserInfo: {
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
        const { oldUserId, userId, orderId } = this.$router.params
        console.log('orderId', orderId)

        this.setState(
            {
                oldUserId: Number.parseInt(oldUserId, 10) || 26,
                userId: Number.parseInt(userId, 10) || 103,
                orderId: Number.parseInt(orderId, 10) || 0,
            },
            () => {
                this.getUserInfo()
                this.getOldUserInfo()
                this.getPackageDetail()
            },
        )
    }
    // 获取转让用户信息
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
    // 获取原用户信息
    getOldUserInfo = () => {
        const { oldUserId } = this.state
        this.props.dispatch({
            type: 'PackageSchedul/getCurrentUserInfo',
            params: { userId: oldUserId },
            cb: (data) => {
                this.setState({ oldUserInfo: data })
            },
        })
    }
    // 发送验证码
    handleSendCode = () => {
        const { oldUserInfo } = this.state
        if (this.timer) {
            return
        }
        this.props.dispatch({
            type: 'RegisterUser/sendVertifyCode',
            params: { phone: oldUserInfo.phone },
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

    // 转让套餐
    handleTransfer = () => {
        const { orderId, userId, oldUserInfo, code } = this.state
        this.props.dispatch({
            type: 'RegisterUser/checkCodePassport',
            params: { mobile: oldUserInfo.phone, verifyCode: code },
            cb: (code, message) => {
                if (code !== 'OK') {
                    Taro.showToast({
                        title: message || '验证码错误',
                        icon: 'none',
                    })
                    return
                }
                this.props.dispatch({
                    type: 'TransferPackage/transferPackage',
                    params: { orderId, userId },
                    cb: (data) => {
                        Taro.showToast({
                            title: '转让成功',
                        })
                        setTimeout(() => {
                            Taro.navigateBack({
                                delta: 2,
                            })
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
        const { userInfo, packageInfo, oldUserInfo, count, code } = this.state

        return (
            <View className={styles.TransferPackageMain}>
                <TitleSession title="转让信息" />
                <View className={styles.userInfo}>
                    <Image src={BASEURL + userInfo.avatar} />
                    <View className={styles.right}>
                        <View className={styles.info}>
                            <Text>{userInfo.nickName}</Text>
                            <Text>{userInfo.phone}</Text>
                        </View>
                        <Text>
                            {userInfo.province} {userInfo.city} {userInfo.area}
                        </Text>
                    </View>
                </View>
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

                <TitleSession title="原订单信息" />
                <View className={styles.form}>
                    <View className={styles.inputWrap}>
                        <Text className={styles.label}>会员名：</Text>
                        <Text className={styles.content}>{oldUserInfo.nickName}</Text>
                    </View>
                    <View className={styles.inputWrap}>
                        <Text className={styles.label}>手机号：</Text>
                        <Text className={styles.content}>{oldUserInfo.phone}</Text>
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

                <View className={styles.button} onClick={this.handleTransfer}>
                    确认
                </View>
            </View>
        )
    }
}

export default TransferPackage
