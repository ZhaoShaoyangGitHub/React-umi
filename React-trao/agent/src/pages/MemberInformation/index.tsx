import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MemberInformationProps, MemberInformationState } from './index.interface'
import styles from './MemberInformation.module.less'
import moment from 'moment'
import { getVipInfo } from './apis'

@connect(({ MemberInformation }) => ({
    ...MemberInformation,
}))
class MemberInformation extends Component<MemberInformationProps, MemberInformationState> {
    config: Config = {
        navigationBarTitleText: '个人资料',
    }

    constructor(props: MemberInformationProps) {
        super(props)
        this.state = {
            name: '', // 姓名
            gender: '', // 性别
            bloodType: '', // 血型
            chineseZodiac: '', // 属相
            constellation: '', // 星座
            marriageStatus: '', // 婚姻状态
            birthday: '', // 生日
            job: '', // 职业
            workingTime: '', // 工作时长
            childNumber: '', // 子女个数
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
            userConsumeAmount: 0, //消费金额
        }
    }

    componentDidMount() {
        const { userId } = this.$router.params
        if (userId) {
            this.getUserInfo(userId)
        }
    }

    getUserInfo = async (userId) => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const res = await getVipInfo({ userId })
        if (res && res.code === 'OK' && res.data) {
            const { data } = res
            this.setState({
                nickname: data.nickName, // 姓名
                gender: data.gender && data.gender.description, // 性别
                bloodType: data.bloodType, // 血型
                chineseZodiac: data.chineseZodiac, // 属相
                constellation: data.constellation, // 星座
                marriageStatus: data.marriageStatus && data.marriageStatus.description, // 婚姻状态
                birthday: data.birthday && moment(data.birthday).format('YYYY-MM-DD'), // 生日
                job: data.profession, // 职业
                workingTime: data.workTime, // 工作时长
                childNumber: data.offspringCount, // 子女个数
                height: data.stature, // 身高
                weight: data.weight, // 体重
                standardWeight: data.standardWeight, // 标准体重
                targetWeight: data.targetWeight, // 目标体重
                chest: data.chestCircumference, // 胸围
                waistline: data.waistline, // 腰围
                hipline: data.hipline, // 臀围
                highHip: data.highHip, // 上臀围
                leftLeg: data.leftLeg, // 左腿围
                rightLeg: data.rightLeg, // 右腿围
                shank: data.shank, // 小腿围
                userConsumeAmount: data.userConsumeAmount,
            })
            Taro.hideLoading()
        }
    }

    render() {
        const {
            nickname,
            gender,
            birthday,
            bloodType,
            chineseZodiac,
            constellation,
            job,
            workingTime,
            marriageStatus,
            childNumber,
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
            userConsumeAmount,
        } = this.state
        return (
            <View className={styles.MemberInformationMain}>
                <View className={styles.title}>基本信息</View>
                <View className={styles.baseInfo}>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>姓名</Text>
                        <View className={styles.info_value}>
                            <Text className={styles.info_value}>{nickname ? nickname : '保密'}</Text>
                        </View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>性别</Text>
                        <View className={styles.info_value}>{gender ? gender : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>生日</Text>
                        <View className={styles.info_value}>{birthday ? birthday : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>血型</Text>
                        <View className={styles.info_value}>{bloodType ? bloodType : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>属相</Text>
                        <View className={styles.info_value}>{chineseZodiac ? chineseZodiac : '保密'}</View>
                    </View>
                    <View className={`${styles.infoListItem} ${styles.noLine}`}>
                        <Text className={styles.info_title}>星座</Text>
                        <View className={styles.info_value}>{constellation ? constellation : '保密'}</View>
                    </View>
                    <View className={styles.whiteSpace} />
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>消费金额（元）</Text>
                        <View className={styles.info_value}>{userConsumeAmount ? userConsumeAmount : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>职业</Text>
                        <View className={styles.info_value}>{job ? job : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>工作时长</Text>
                        <View className={styles.info_value}>{workingTime ? workingTime : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>婚姻状态</Text>
                        <View className={styles.info_value}>{marriageStatus ? marriageStatus : '保密'}</View>
                    </View>
                    <View className={`${styles.infoListItem} ${styles.noLine}`}>
                        <Text className={styles.info_title}>子女个数</Text>
                        <View className={styles.info_value}>{childNumber ? childNumber : '保密'}</View>
                    </View>
                    <View className={styles.whiteSpace} />
                </View>
                <View className={styles.title}>身体信息</View>
                <View className={styles.baseInfo}>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>身高(cm)</Text>
                        <View className={styles.info_value}>{height ? height : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>体重(kg)</Text>
                        <View className={styles.info_value}>{weight ? weight : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>标准体重(kg)</Text>
                        <View className={styles.info_value}>{standardWeight ? standardWeight : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>目标体重(kg)</Text>
                        <View className={styles.info_value}>{targetWeight ? targetWeight : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>胸围(cm)</Text>
                        <View className={styles.info_value}>{chest ? chest : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>腰围(cm)</Text>
                        <View className={styles.info_value}>{waistline ? waistline : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>臀围(cm)</Text>
                        <View className={styles.info_value}>{hipline ? hipline : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>上臀围(cm)</Text>
                        <View className={styles.info_value}>{highHip ? highHip : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>左腿围(cm)</Text>
                        <View className={styles.info_value}>{leftLeg ? leftLeg : '保密'}</View>
                    </View>
                    <View className={styles.infoListItem}>
                        <Text className={styles.info_title}>右腿围(cm)</Text>
                        <View className={styles.info_value}>{rightLeg ? rightLeg : '保密'}</View>
                    </View>
                    <View className={`${styles.infoListItem} ${styles.noLine}`}>
                        <Text className={styles.info_title}>小腿围(cm)</Text>
                        <View className={styles.info_value}>{shank ? shank : '保密'}</View>
                    </View>
                </View>
                <View className={styles.whiteSpace} />
            </View>
        )
    }
}

export default MemberInformation
