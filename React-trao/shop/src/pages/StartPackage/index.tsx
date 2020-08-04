import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StartPackageProps, StartPackageState } from './index.interface'
import PackItem from '../../components/PackItem'
import styles from './StartPackage.module.less'
import TitleSession from '../../components/TitleSession'
import { BASEURL } from '../../config/index'

@connect(({ StartPackage }) => ({
    ...StartPackage,
}))
class StartPackage extends Component<StartPackageProps, StartPackageState> {
    config: Config = {
        navigationBarTitleText: '恢复套餐',
    }
    constructor(props: StartPackageProps) {
        super(props)
        this.state = {
            orderId: 0,
            projectId: 0,
            userId: 0,
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
        }
    }

    componentDidShow = () => {
        const { orderId, projectId, userId } = this.$router.params
        this.setState(
            {
                orderId: Number.parseInt(orderId, 10) || 81,
                projectId: Number.parseInt(projectId, 10) || 16,
                userId: Number.parseInt(userId, 10) || 0,
            },
            () => {
                this.getPackageDetail()
                this.getUserInfo()
            },
        )
    }
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
    getPackageDetail = () => {
        const { projectId } = this.state
        Taro.showLoading({ title: '' })
        this.props.dispatch({
            type: 'StartPackage/getPackageDetail',
            params: { packageId: projectId },
            cb: (data) => {
                Taro.hideLoading()
                this.setState({
                    packageInfo: {
                        name: data.name,
                        imageUrl: data.imageUrl,
                        efficacy: data.efficacy,
                    },
                })
            },
        })
    }

    // 恢复套餐
    handleStart = () => {
        const { orderId } = this.state
        this.props.dispatch({
            type: 'StartPackage/startPackage',
            params: { id: orderId },
            cb: (data) => {
                Taro.showToast({
                    title: '恢复成功',
                })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 2000)
            },
        })
    }

    render() {
        const { userInfo, packageInfo } = this.state
        return (
            <View className={styles.StartPackageMain}>
                <TitleSession title="消费者信息" />
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

                <TitleSession title="恢复时间" />
                <View className={styles.item}>
                    <Text>恢复时间</Text>
                    <Text>自动算法</Text>
                </View>

                <View className={styles.button} onClick={this.handleStart}>
                    确认
                </View>
            </View>
        )
    }
}

export default StartPackage
