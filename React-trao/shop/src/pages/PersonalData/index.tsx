import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PersonalDataProps, PersonalDataState } from './index.interface'
import styles from './PersonalData.module.less'
import { BASEURL } from '../../config/index'
import { PersonalImages } from '../../assets/img/load'
@connect(({ PersonalData }) => ({
    ...PersonalData,
}))
class PersonalData extends Component<PersonalDataProps, PersonalDataState> {
    config: Config = {
        navigationBarTitleText: '个人资料',
    }
    constructor(props: PersonalDataProps) {
        super(props)
        this.state = {
            personalInfo: {
                avatar: '',
                workNumber: null,
                name: '',
                gender: null,
                idCard: null,
            },
        }
    }

    componentDidMount() {
        let token = Taro.getStorageSync('token')
        if (!token) {
            Taro.navigateTo({
                url: '/pages/UserLogin/index',
            })
        }
        if (Taro.getStorageSync('personalInfo')) {
            let { avatar, workNumber, name, gender, idCard } = JSON.parse(Taro.getStorageSync('personalInfo'))
            this.setState({
                personalInfo: {
                    avatar,
                    workNumber,
                    name,
                    gender,
                    idCard,
                },
            })
        } else {
            this.props.dispatch({
                type: 'PersonalData/getUserInfo',
                cb: (data) => {
                    const { avatar, workNumber, name, gender, idCard } = data
                    this.setState({
                        personalInfo: {
                            avatar,
                            workNumber,
                            name,
                            gender,
                            idCard,
                        },
                    })
                    Taro.setStorage({
                        key: 'personalInfo',
                        data: JSON.stringify(data),
                    })
                },
            })
        }
    }

    changeAvatar = () => {
        Taro.showLoading({
            title: '更新中',
            mask: true,
        })
        Taro.chooseImage({
            count: 1,
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                Taro.uploadFile({
                    url: `${BASEURL}/api/ueditor`,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                    filePath: tempFilePaths[0],
                    name: 'upfile',
                    formData: {
                        action: 'uploadimage',
                        encode: 'utf-8',
                    },
                    success: (res) => {
                        const data = JSON.parse(res.data)
                        console.log(data)
                        this.props.dispatch({
                            type: 'PersonalData/updateUser',
                            payload: {
                                avatar: {
                                    file: data.url,
                                    original: data.original,
                                    size: data.size,
                                    state: data.state,
                                    title: data.title,
                                },
                            },
                            cb: () => {
                                this.props.dispatch({
                                    type: 'PersonalData/getUserInfo',
                                    cb: (data) => {
                                        Taro.setStorage({
                                            key: 'personalInfo',
                                            data: JSON.stringify(data),
                                        })
                                        this.setState(
                                            {
                                                personalInfo: {
                                                    avatar: data.avatar,
                                                },
                                            },
                                            () => {
                                                Taro.hideLoading()
                                            },
                                        )
                                    },
                                })
                            },
                        })
                    },
                })
            },
            complete: () => {
                Taro.hideLoading()
            },
        })
    }

    render() {
        const { avatar, workNumber, name, gender, idCard } = this.state.personalInfo
        return (
            <View className={styles.PersonalDataMain}>
                <View className={styles.avatarWrapper}>
                    <View className={styles.avatarUpdate} onClick={this.changeAvatar}>
                        {avatar && (
                            <Image
                                src={
                                    avatar.includes('https://')
                                        ? JSON.parse(avatar).file
                                        : BASEURL + JSON.parse(avatar).file
                                }
                                mode="widthFix"
                                className={styles.avatar}
                            />
                        )}
                        <Image src={PersonalImages.cameraIcon} className={styles.cameraIcon} mode="widthFix" />
                    </View>
                    <View>点击更换头像</View>
                </View>
                <View className={styles.PersonalDataContent}>
                    <View className={styles.infoItem}>
                        <Text className={styles.title}>工号</Text>
                        <Text>{workNumber}</Text>
                    </View>
                    <View className={styles.infoItem}>
                        <Text className={styles.title}>姓名</Text>
                        <Text>{name}</Text>
                    </View>
                    <View className={styles.infoItem}>
                        <Text className={styles.title}>性别</Text>
                        {gender === 1 ? <Text>男</Text> : <Text>女</Text>}
                    </View>
                    <View className={styles.infoItem}>
                        <Text className={styles.title}>身份证号</Text>
                        {idCard && idCard.length > 14 ? (
                            <Text>{idCard.substring(0, 3) + '***********' + idCard.substring(14)}</Text>
                        ) : (
                            <Text>{idCard}</Text>
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default PersonalData
