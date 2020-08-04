import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MemberServicesDetailsProps, MemberServicesDetailsState } from './index.interface'
import styles from './MemberServicesDetails.module.less'
import { getToday, getHoursMin, getTime } from '../../utils/function'

@connect(({ MemberServicesDetails }) => ({
    ...MemberServicesDetails,
}))
class MemberServicesDetails extends Component<MemberServicesDetailsProps, MemberServicesDetailsState> {
    config: Config = {
        navigationBarTitleText: '服务详情',
        navigationBarBackgroundColor: '#B365B7',
        navigationBarTextStyle: 'white',
    }
    constructor(props: MemberServicesDetailsProps) {
        super(props)
        this.state = {
            id: 0,
            MemberServicesDetails: {},
        }
    }

    componentDidMount() {
        const { id } = this.$router.params
        if (id) {
            this.setState(
                {
                    id: +id,
                },
                () => {
                    this.getServiceDetails()
                },
            )
        }
    }

    getServiceDetails = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { id } = this.state
        this.props.dispatch({
            type: 'MemberServicesDetails/getServiceDetails',
            payload: {
                id,
            },
            cb: (data) => {
                this.setState({
                    MemberServicesDetails: data ? data : {},
                })
                Taro.hideLoading()
            },
        })
    }

    render() {
        const { MemberServicesDetails } = this.state
        return (
            <View className={styles.MemberServicesDetailsMain}>
                <View className={styles.comTitle}>服务信息</View>
                <View className={styles.serviceInfo}>
                    <View className={styles.serviceInfoTop}>
                        <View className={styles.avatar}></View>
                        <View>
                            <View className={styles.name}>{MemberServicesDetails.packageName}</View>
                            <View className={styles.data}>
                                {getToday(MemberServicesDetails.startTime) +
                                    ' ' +
                                    getTime(MemberServicesDetails.startTime)}
                            </View>
                        </View>
                    </View>
                    <View className={styles.serviceInfoMain}>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>服务项目</View>
                            <View className={styles.txt}>{MemberServicesDetails.packageProjectName}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>服务时间</View>
                            <View className={styles.txt}>
                                {getToday(MemberServicesDetails.startTime) + '  '}
                                {getHoursMin(MemberServicesDetails.startTime)}-
                                {getHoursMin(MemberServicesDetails.endTime)}
                            </View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>本次体重</View>
                            <View className={styles.txt}>{MemberServicesDetails.weight}kg</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>昨日早餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.yesterdayBreakfast}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>昨日午餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.yesterdayLunch}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>昨日晚餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.yesterdaySupper}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>今日早餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.nowBreakfast}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>今日午餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.nowLunch}</View>
                        </View>
                        <View className={styles.infoListItem}>
                            <View className={styles.title}>今日晚餐</View>
                            <View className={styles.txt}>{MemberServicesDetails.nowSupper}</View>
                        </View>
                    </View>
                </View>
                {/* <View className={styles.comTitle}>服务评价</View>
                <View className={styles.serviceEvaluation}>
                    <View className={styles.memberInfo}>
                        <View className={styles.memberAvatar}></View>
                        <View>
                            <View className={styles.title}>
                                <View className={styles.name}>王小敏</View>
                                <View className={styles.phone}>13956781234</View>
                            </View>
                            <View className={styles.evaluation}>
                                <View className={styles.stars}>
                                    <View className={styles.star}></View>
                                    <View className={styles.star}></View>
                                    <View className={styles.star}></View>
                                    <View className={styles.star}></View>
                                    <View className={styles.star}></View>
                                </View>
                                <View>好</View>
                            </View>
                        </View>
                    </View>
                    <View className={styles.content}>非常满意</View>
                </View> */}
            </View>
        )
    }
}

export default MemberServicesDetails
