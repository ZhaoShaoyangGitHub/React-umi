import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, OpenData, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PersonalProps, PersonalState } from './index.interface'
import styles from './Personal.module.less'
import { BASEURL } from '../../config/index'
import { publicImages, PersonalImages } from '../../assets/img/load'

@connect(({ Personal }) => ({
    ...Personal,
}))
class Personal extends Component<PersonalProps, PersonalState> {
    config: Config = {
        navigationBarTitleText: '我的',
    }
    constructor(props: PersonalProps) {
        super(props)
        this.state = {
            personalInfo: {},
        }
    }

    componentDidShow() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
        }
        if (Taro.getStorageSync('personalInfo')) {
            this.setState({
                personalInfo: JSON.parse(Taro.getStorageSync('personalInfo')),
            })
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

    goOtherPage = (index) => {
        switch (index) {
            case 0:
                Taro.navigateTo({
                    url: '/pages/MyAchievement/index',
                })
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/ServiceRecord/index',
                })
                break
            case 2:
                Taro.navigateTo({
                    url: '/pages/MyCollection/index',
                })
                break
            case 3:
                Taro.navigateTo({
                    url: '/pages/UserSetting/index',
                })
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/AttendanceTime/index',
                })
                break
        }
    }

    render() {
        const { personalInfo } = this.state
        const list = [
            {
                id: 0,
                title: '我的收藏',
                iconUrl: PersonalImages.likeIcon,
            },
            {
                id: 1,
                title: '设置',
                iconUrl: PersonalImages.settingIcon,
            },
            {
                id: 2,
                title: '考勤打卡',
                iconUrl: PersonalImages.workTimeIcon,
            },
        ]
        return (
            <View className={styles.PersonalMain}>
                <View className={styles.topUserInfo}>
                    <View
                        className={styles.avatar}
                        onClick={() => {
                            Taro.navigateTo({
                                // url: '/pages/EditInfo/index',
                                url: '/pages/UserSetting/index',
                            })
                        }}
                    >
                        {personalInfo.avatar && (
                            <Image
                                src={
                                    personalInfo.avatar.includes('https://')
                                        ? JSON.parse(personalInfo.avatar).file
                                        : BASEURL + JSON.parse(personalInfo.avatar).file
                                }
                                mode="widthFix"
                                className={styles.avatarImg}
                            />
                        )}
                        {/* <OpenData className={styles.avatarImg} type="userAvatarUrl" lang="zh_CN"></OpenData> */}
                    </View>
                    <View className={styles.userInfo}>
                        <View className={styles.nickName}>{personalInfo.nickName}</View>
                        <View className={styles.workNumber}>工号：{personalInfo.workNumber}</View>
                    </View>
                    <View className={styles.address}>
                        <Image src={publicImages.locationIcon} mode="widthFix" className={styles.icon} />
                        <Text>{personalInfo.city}</Text>
                        <Text>{personalInfo.area}</Text>
                    </View>
                </View>
                <View className={styles.personalWrapper}>
                    <View className={styles.personalBox}>
                        <View className={styles.personalDate}>
                            <View
                                className={styles.listItem}
                                onClick={() => {
                                    this.goOtherPage(0)
                                }}
                            >
                                <View className={styles.left}>
                                    <Image
                                        src={PersonalImages.performanceIcon}
                                        mode="widthFix"
                                        className={styles.icon}
                                    />
                                    <Text>我的业绩</Text>
                                </View>
                                <View className={styles.right}>
                                    {personalInfo.performanceAmount && <Text>￥{personalInfo.performanceAmount}</Text>}
                                    <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                                </View>
                            </View>
                            <View
                                className={styles.listItem}
                                onClick={() => {
                                    this.goOtherPage(1)
                                }}
                            >
                                <View className={styles.left}>
                                    <Image src={PersonalImages.serviceIcon} mode="widthFix" className={styles.icon} />
                                    <Text>服务记录</Text>
                                </View>
                                <View className={styles.right}>
                                    {personalInfo.serviceDuration && <Text>{personalInfo.serviceDuration}</Text>}
                                    <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                                </View>
                            </View>
                        </View>
                    </View>
                    {list.map((item) => {
                        return (
                            <View className={styles.personalBox} key={item.id}>
                                <View
                                    className={styles.listItem}
                                    onClick={() => {
                                        this.goOtherPage(item.id + 2)
                                    }}
                                >
                                    <View className={styles.left}>
                                        <Image src={item.iconUrl} mode="widthFix" className={styles.icon} />
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View className={styles.right}>
                                        <Image
                                            src={publicImages.jumpIcon}
                                            mode="widthFix"
                                            className={styles.jumpIcon}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default Personal
