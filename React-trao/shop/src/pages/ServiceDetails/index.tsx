import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ServiceDetailsProps, ServiceDetailsState } from './index.interface'
import { getToday, getHoursMin, getTime } from '../../utils/function'
import styles from './ServiceDetails.module.less'

@connect(({ ServiceDetails }) => ({
    ...ServiceDetails,
}))
class ServiceDetails extends Component<ServiceDetailsProps, ServiceDetailsState> {
    config: Config = {
        navigationBarTitleText: '服务详情',
    }
    constructor(props: ServiceDetailsProps) {
        super(props)
        this.state = {
            MemberServicesDetails: {},
        }
    }

    componentDidMount() {}

    render() {
        const { MemberServicesDetails } = this.state
        return (
            <View className={styles.ServiceDetailsMain}>
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
                            <View className={styles.title}>减重斤数</View>
                            <View className={styles.txt}>{MemberServicesDetails.weight}kg</View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ServiceDetails
