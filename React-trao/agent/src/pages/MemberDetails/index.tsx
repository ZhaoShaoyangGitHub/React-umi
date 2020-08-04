import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MemberDetailsProps, MemberDetailsState } from './index.interface'
import styles from './MemberDetails.module.less'
import { publicImages, memberImg, PersonalImages, HomeImages } from '../../assets/img/load'
import { BASEURL } from '../../config/index'
import { timestampToTime } from '../../utils/function'

@connect(({ MemberDetails }) => ({
    ...MemberDetails,
}))
class MemberDetails extends Component<MemberDetailsProps, MemberDetailsState> {
    config: Config = {
        navigationBarTitleText: '会员详情',
        navigationBarBackgroundColor: '#B365B7',
        navigationBarTextStyle: 'white',
    }
    constructor(props: MemberDetailsProps) {
        super(props)
        this.state = {
            userId: 0,
            avatar: '',
            nickName: '',
            phone: '',
            area: '',
            city: '',
            province: '',
            personInfo: {
                age: 0,
                stature: '',
                weight: '',
                marriageStatus: 1, // 1保密 2表示已婚 3表示未婚
                bloodType: '',
            },
            consumption: 0,
            symptomValues: [],
            weightResponses: [],
        }
    }

    componentDidMount() {
        const { userId } = this.$router.params
        if (userId) {
            this.setState(
                {
                    userId: +userId,
                },
                () => {
                    this.getMemberDetails()
                },
            )
        }
    }

    getMemberDetails = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { userId } = this.state
        this.props.dispatch({
            type: 'MemberDetails/getVipUserDetails',
            payload: {
                userId,
            },
            cb: (data) => {
                if (data) {
                    this.setState({
                        userId: data.userId,
                        avatar: data.avatar,
                        nickName: data.nickName,
                        phone: data.phone,
                        area: data.area,
                        city: data.city,
                        province: data.province,
                        personInfo: {
                            age: data.age,
                            stature: data.stature,
                            weight: data.weight,
                            marriageStatus: data.marriageStatus,
                            bloodType: data.bloodType,
                        },
                        consumption: data.consumption,
                        symptomValues: data.symptomValues,
                        weightResponses: data.weightResponses,
                    })
                }
                Taro.hideLoading()
            },
        })
    }

    goMemberConsumption = () => {
        Taro.navigateTo({
            url: `/pages/MemberConsumption/index?userId=${this.state.userId}`,
        })
    }

    goMemberInfo = () => {
        Taro.navigateTo({
            url: `/pages/MemberInformation/index?userId=${this.state.userId}`,
        })
    }

    makePhone = () => {
        const { phone } = this.state
        if (phone) {
            Taro.makePhoneCall({
                phoneNumber: this.state.phone + '',
            })
        } else {
            Taro.showToast({
                title: '该会员没有电话信息',
                mask: true,
                icon: 'none',
            })
        }
    }

    render() {
        const { avatar, nickName, city, area, personInfo, consumption, symptomValues, weightResponses } = this.state
        return (
            <View className={styles.MemberDetailsMain}>
                <View className={styles.topUserInfo}>
                    <View className={styles.avatar}>
                        {avatar && (
                            <Image
                                src={avatar.includes('https://') ? avatar : BASEURL + avatar}
                                mode="widthFix"
                                className={styles.avatarImage}
                            />
                        )}
                    </View>
                    <View>
                        <View className={styles.userInfo}>
                            <View className={styles.nickName}>{nickName}</View>
                            <Image src={memberImg.grade1} mode="widthFix" className={styles.grade} />
                        </View>
                        <View className={styles.address}>
                            <Image src={publicImages.addressIcon} mode="widthFix" className={styles.addressIcon} />
                            <Text>{city + area}</Text>
                        </View>
                    </View>
                    <View className={styles.phone} onClick={this.makePhone}>
                        拨打电话
                    </View>
                </View>
                <View className={styles.MemberDetailsContent}>
                    <View className={styles.consumption} onClick={this.goMemberConsumption}>
                        <View className={styles.left}>
                            <Image className={styles.icon} src={PersonalImages.caseIcon2} mode="widthFix" />
                            <Text>会员消费</Text>
                        </View>
                        <View className={styles.right}>
                            <Text>累计消费{consumption ? consumption : 0.0}元</Text>
                            <Image className={styles.jumpIcon} src={publicImages.jumpIcon} mode="widthFix" />
                        </View>
                    </View>
                    <View className={styles.memberBaseInfo}>
                        <View className={styles.memberBaseInfoList}>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>年龄</View>
                                <View>{personInfo.age ? personInfo.age : '保密'}</View>
                            </View>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>身高</View>
                                <View>{personInfo.stature ? personInfo.stature : '保密'}</View>
                            </View>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>标准体重</View>
                                <View>{personInfo.weight ? personInfo.weight : '保密'}</View>
                            </View>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>婚姻状况</View>
                                {personInfo.marriageStatus === 1 && <View>保密</View>}
                                {personInfo.marriageStatus === 2 && <View>已婚</View>}
                                {personInfo.marriageStatus === 3 && <View>未婚</View>}
                            </View>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>体质类型</View>
                                <View>保密</View>
                            </View>
                            <View className={styles.listItem}>
                                <View className={styles.infoTitle}>血型</View>
                                <View>{personInfo.bloodType ? personInfo.bloodType : '保密'}</View>
                            </View>
                        </View>
                        <View className={styles.more} onClick={this.goMemberInfo}>
                            查看更多
                        </View>
                    </View>
                    {weightResponses && weightResponses.length > 0 && (
                        <View className={styles.recordList}>
                            <View className={styles.recordTitle}>
                                <View className={styles.times}>次数</View>
                                <View className={styles.weight}>体重/kg</View>
                                <View className={styles.data}>记录日期</View>
                                <View className={styles.recorder}>记录人</View>
                            </View>
                            {weightResponses.map((item, index) => {
                                return (
                                    <View className={styles.recordListItem} key={item.id}>
                                        <View className={styles.times}>{index + 1}</View>
                                        <View className={styles.weight}>{item.weight}</View>
                                        <View className={styles.data}>{timestampToTime(item.createTime)}</View>
                                        <View className={styles.recorder}>{item.userName}</View>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                    {symptomValues && symptomValues.length > 0 && (
                        <View className={styles.tags}>
                            {symptomValues.map((item) => {
                                return (
                                    <View className={styles.tag} key={item}>
                                        {item.symptom}
                                    </View>
                                )
                            })}
                        </View>
                    )}
                    <View className={styles.startService}>
                        <Image src={HomeImages.selectIcon1} className={styles.icon} mode="widthFix" />
                        <View>开始服务</View>
                    </View>
                </View>
            </View>
        )
    }
}

export default MemberDetails
