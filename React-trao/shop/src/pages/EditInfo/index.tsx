import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { EditInfoProps, EditInfoState } from './index.interface'
import { getUserInfo, updateUserInfo } from './apis'
import styles from './EditInfo.module.less'
import moreIcon from '../../assets/img/set-img.png'

@connect(({ EditInfo }) => ({
    ...EditInfo,
}))
class EditInfo extends Component<EditInfoProps, EditInfoState> {
    config: Config = {
        navigationBarTitleText: '个人资料',
    }

    constructor(props: EditInfoProps) {
        super(props)
        this.state = {
            height: '', // 身高
            weight: '', // 体重
            standardWeight: '', // 标准体重
            targetWeight: '', // 目标体重
            chest: '', // 胸围
            waistline: '', // 腰围
            hipline: '', // 臀围
            highHip: '', // 上臀围
            leftLeg: '', // 左腿围
            rightLeg: '', // 右腿围
            shank: '', // 小腿围
            userId: 0,
        }
    }
    componentDidShow() {
        const { id } = this.$router.params
        this.setState(
            {
                userId: Number.parseInt(id, 10) || 0,
            },
            () => {
                this.getUserInfo()
            },
        )
    }
    getUserInfo = async () => {
        const { userId } = this.state
        const res = await getUserInfo({ userId })
        if (res && res.code === 'OK' && res.data) {
            const { data } = res
            this.setState({
                height: data && data.stature, // 身高
                weight: data && data.weight, // 体重
                standardWeight: data && data.standardWeight, // 标准体重
                targetWeight: data && data.targetWeight, // 目标体重
                chest: data && data.chestCircumference, // 胸围
                waistline: data && data.waistline, // 腰围
                hipline: data && data.hipline, // 臀围
                highHip: data && data.highHip, // 上臀围
                leftLeg: data && data.leftLeg, // 左腿围
                rightLeg: data && data.rightLeg, // 右腿围
                shank: data && data.shank, // 小腿围
            })
        }
    }

    handleChange = (val, key): void => {
        this.setState({
            [key]: val,
        })
    }

    onChange = (e, key): void => {
        this.setState(
            {
                [key]: e.detail.value,
            },
            () => {
                this.handleSave()
            },
        )
    }

    handleSave = (): void => {
        const {
            height,
            weight,
            standardWeight,
            targetWeight,
            chest,
            waistline,
            hipline,
            highHip,
            leftLeg,
            rightLeg,
            shank,
        } = this.state

        const obj = {
            userBodyInfoForm: {
                stature: height,
                weight,
                standardWeight,
                targetWeight,
                chestCircumference: chest,
                waistline,
                hipline,
                highHip,
                leftLeg,
                rightLeg,
                shank,
            },
        }
        this.updateUserInfo(obj)
    }
    updateUserInfo = async (data) => {
        const res = await updateUserInfo(data)
        if (res && res.code === 'OK') {
            Taro.showToast({
                title: '修改成功',
            })
        }
    }
    goSetUserInfoPage = (attr: string, attrName: string, attrValue: any) => {
        const { userId } = this.state
        Taro.navigateTo({
            url: `/pages/SetUserInfo/index?id=${userId}&attr=${attr}&attrName=${attrName}&attrValue=${
                attrValue ? attrValue : ''
            }`,
        })
    }
    render() {
        const {
            height,
            weight,
            standardWeight,
            targetWeight,
            chest,
            waistline,
            hipline,
            highHip,
            leftLeg,
            rightLeg,
            shank,
        } = this.state
        return (
            <View className={styles.container}>
                <View className={styles.bodyInfo}>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('height', '身高(cm)', height)
                        }}
                    >
                        <Text className={styles.info_title}>身高(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${height ? '' : styles.please_select}`}>
                                {height || '请输入身高'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('weight', '体重(kg)', weight)
                        }}
                    >
                        <Text className={styles.info_title}>体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${weight ? '' : styles.please_select}`}>
                                {weight || '请输入体重'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('standardWeight', '标准体重(kg)', standardWeight)
                        }}
                    >
                        <Text className={styles.info_title}>标准体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${standardWeight ? '' : styles.please_select}`}>
                                {standardWeight || '请输入标准体重'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('targetWeight', '目标体重(kg)', targetWeight)
                        }}
                    >
                        <Text className={styles.info_title}>目标体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${targetWeight ? '' : styles.please_select}`}>
                                {targetWeight || '请输入目标体重'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('chest', '胸围(cm)', chest)
                        }}
                    >
                        <Text className={styles.info_title}>胸围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${chest ? '' : styles.please_select}`}>
                                {chest || '请输入胸围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('waistline', '腰围(cm)', waistline)
                        }}
                    >
                        <Text className={styles.info_title}>腰围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${waistline ? '' : styles.please_select}`}>
                                {waistline || '请输入腰围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('hipline', '臀围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>臀围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${hipline ? '' : styles.please_select}`}>
                                {hipline || '请输入臀围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('highHip', '上臀围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>上臀围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${highHip ? '' : styles.please_select}`}>
                                {highHip || '请输入上臀围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('leftLeg', '左腿围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>左腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${leftLeg ? '' : styles.please_select}`}>
                                {leftLeg || '请输入左腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('rightLeg', '右腿围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>右腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${rightLeg ? '' : styles.please_select}`}>
                                {rightLeg || '请输入右腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('shank', '小腿围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>小腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${shank ? '' : styles.please_select}`}>
                                {shank || '请输入小腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={moreIcon} />
                        </View>
                    </View>
                </View>
                <View className={styles.whiteSpace} />
            </View>
        )
    }
}

export default EditInfo
