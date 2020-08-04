import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, OpenData, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PersonalProps, PersonalState } from './index.interface'
import styles from './Personal.module.less'
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
        this.state = {}
    }

    componentDidMount() {
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
                    url: '/pages/MyPackage/index',
                })
                break
            case 1:
                break
            case 2:
                Taro.navigateTo({
                    url: '/pages/MyStore/index',
                })
                break
            case 3:
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/MyCollection/index',
                })
                break
            case 5:
                Taro.navigateTo({
                    url: '/pages/ModifyPassword/index',
                })
                break
        }
    }

    signOut = () => {
        Taro.showModal({
            title: '确定要退出吗？',
            success: (res) => {
                if (res.confirm) {
                    Taro.clearStorage({
                        success: () => {
                            Taro.reLaunch({
                                url: '/pages/UserLogin/index',
                            })
                        },
                    })
                }
            },
        })
    }

    render() {
        const list = [
            {
                id: 0,
                title: '我的套餐',
                iconUrl: PersonalImages.caseIcon1,
            },
            // {
            //     id: 1,
            //     title: '我的商品',
            //     iconUrl: PersonalImages.caseIcon1,
            // },
            {
                id: 2,
                title: '我的仓库',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 3,
                title: '我的钱包',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 4,
                title: '我的收藏',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 5,
                title: '修改密码',
                iconUrl: PersonalImages.caseIcon1,
            },
            // {
            //     id: 6,
            //     title: '我的发票',
            //     iconUrl: PersonalImages.caseIcon1,
            // },
        ]
        return (
            <View className={styles.PersonalMain}>
                <View className={styles.personalWrapper}>
                    {list.map((item) => {
                        return (
                            <View
                                className={styles.personalBox}
                                key={item.id}
                                onClick={() => {
                                    this.goOtherPage(item.id)
                                }}
                            >
                                <View className={styles.listItem}>
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
                                <View
                                    className={
                                        item.id == 1 || item.id == 3 || item.id == 5 ? styles.marginBottom : styles.line
                                    }
                                ></View>
                            </View>
                        )
                    })}
                </View>
                <View className={styles.SignOut} onClick={this.signOut}>
                    退出登录
                </View>
            </View>
        )
    }
}

export default Personal
