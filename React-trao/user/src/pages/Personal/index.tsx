/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, OpenData } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PersonalProps, PersonalState } from './index.interface'
import Point from '../../components/Point'
import Popup from '../../components/Popup'
import styles from './Personal.module.less'
import { Icons } from '../../assets/img/load'
import { BASEURL } from '../../config/index'

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
            userInfo: {},
            personalInfo: {},
            isSignIn: 0, //当日是否已经签到{1:是,2:否}
            isPopupStatus: false,
            signInDay: 1,
        }
    }

    componentDidShow() {
        try {
            var value = Taro.getStorageSync('token')
            if (value) {
                const userInfo = Taro.getStorageSync('userInfo')
                if (userInfo) {
                    this.setState({ userInfo })
                }
                this.getPersonalInfo()
            } else {
                Taro.reLaunch({ url: '/pages/UserLogin/index' })
            }
        } catch (e) {
            // Do something when catch error
        }
    }

    getPersonalInfo = () => {
        this.props.dispatch({
            type: 'Personal/fetchUserInfo',
            cb: (data) => {
                this.setState({ personalInfo: data, isSignIn: data.isTrue }, () => {
                    Taro.setStorageSync('personalInfo', JSON.stringify(data))
                })
            },
        })
    }
    handleMenuClick = (menuItem: any) => {
        Taro.navigateTo({
            url: menuItem.url,
        })
    }
    switchItem = (id) => {
        switch (id) {
            case 0:
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/MyPointsScores/index',
                })
                break
            case 2:
                Taro.navigateTo({
                    url: '/pages/HelpCenter/index',
                })
                break
            case 3:
                Taro.navigateTo({
                    url: '/pages/JoinInNotice/index',
                })
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/UserSetting/index',
                })
                break
            default:
                return
        }
    }

    handleSignIn = () => {
        if (this.state.isSignIn === 1) return
        this.props.dispatch({
            type: 'Personal/effectsSignIn',
            cb: (data) => {
                this.setState(
                    {
                        isPopupStatus: true,
                        isSignIn: 1,
                        signInDay: data ? data : 1,
                    },
                    () => {
                        this.getPersonalInfo()
                    },
                )
            },
        })
    }

    closeSignIn = () => {
        this.setState({
            isPopupStatus: false,
        })
    }

    render() {
        const middleMenuArr = [
            { id: 0, title: '我的套餐', url: '/pages/MyPackage/index' },
            { id: 1, title: '我的收藏', url: '/pages/MyCollection/index' },
            { id: 2, title: '我的订单', url: '/pages/OrderList/index' },
            { id: 3, title: '收货地址', url: '/pages/AddressManage/index' },
        ]
        const bottomMenuArr = [
            { id: 1, title: '我的积分' },
            { id: 2, title: '帮助中心' },
            { id: 3, title: '加盟须知' },
            { id: 4, title: '设置' },
        ]
        const { isSignIn, isPopupStatus, signInDay, personalInfo } = this.state
        const avatar: any =
            personalInfo.avatar && personalInfo.avatar != 'null' ? JSON.parse(personalInfo.avatar).file : null
        return (
            <View className={styles.PersonalMain}>
                <View className={styles.topUserInfo}>
                    <View
                        className={styles.avatar}
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/EditInfo/index',
                            })
                        }}
                    >
                        {avatar && (
                            <Image
                                className={styles.avatarImg}
                                src={avatar.includes('https://') ? avatar : BASEURL + avatar}
                            />
                        )}
                        {/* {personalInfo.avatar ? (
                            <Image
                                className={styles.avatarImg}
                                src={
                                    personalInfo.avatar.includes('https://')
                                        ? personalInfo.avatar
                                        : BASEURL + personalInfo.avatar
                                }
                            />
                        ) : (
                            <OpenData className={styles.avatarImg} type="userAvatarUrl" lang="zh_CN"></OpenData>
                        )} */}
                    </View>
                    <View className={styles.userInfo}>
                        <View className={styles.infoTop}>
                            <View className={styles.name}>
                                {personalInfo.name || personalInfo.nickName || personalInfo.phone}
                            </View>
                            <View className={styles.userType}>
                                <Image className={styles.userTypeImg} src={Icons.goldUser} />
                            </View>
                        </View>
                        <View className={styles.infoBottom}>
                            <View className={styles.address}>
                                <Image className={styles.userAddressIconImg} src={Icons.userAddressIcon} />
                                <View className={styles.addressWord}>
                                    {personalInfo.city + '    ' + personalInfo.area}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className={styles.userInfoTag} onClick={this.handleSignIn}>
                        <Image className={styles.userInfoTagImg} src={Icons.userInfoTagGold} />
                        <View className={styles.userInfoTagWord}>
                            {isSignIn === 1 ? Math.floor(personalInfo.point) : '签到领积分'}
                        </View>
                    </View>
                </View>

                <View className={styles.middleMenu}>
                    {middleMenuArr.map((item) => {
                        return (
                            <View
                                key={item.id}
                                className={styles.middleMenuItem}
                                onClick={() => this.handleMenuClick(item)}
                            >
                                <Image className={styles.middleMenuItemImg} src={Icons.middleMenuMy} />
                                <View className={styles.middleMenuItemTitle}>{item.title}</View>
                            </View>
                        )
                    })}
                </View>

                <View className={styles.singleMenu}>
                    {bottomMenuArr.map((item) => {
                        return (
                            <View
                                key={item.id}
                                className={styles.singleMenuItem}
                                onClick={() => {
                                    this.switchItem(item.id)
                                }}
                            >
                                <Image className={styles.middleMenuItemImg} src={Icons.middleMenuMy} />
                                <View className={styles.middleMenuItemTitle}>{item.title}</View>
                                <Image className={styles.singleItemArrowImg} src={Icons.singleItemArrow} />
                            </View>
                        )
                    })}
                </View>
                {isPopupStatus && (
                    <Popup onClick={this.closeSignIn}>
                        <View className={styles.signInWrapper}>
                            <View className={styles.imgTop}>
                                <Image src={Icons.checkinBanner} mode="widthFix" className={styles.imgTop}></Image>
                            </View>
                            <Point signInDay={signInDay} />
                        </View>
                    </Popup>
                )}
            </View>
        )
    }
}

export default Personal
