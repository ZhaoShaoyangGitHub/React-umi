import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MyPointsScoresProps, MyPointsScoresState } from './index.interface'
import styles from './MyPointsScores.module.less'
import { Icons } from '../../assets/img/load'
import { getToday } from '../../utils/function'
import Point from '../../components/Point'
import Popup from '../../components/Popup'

@connect(({ MyPointsScores }) => ({
    ...MyPointsScores,
}))
class MyPointsScores extends Component<MyPointsScoresProps, MyPointsScoresState> {
    config: Config = {
        navigationBarTitleText: '我的积分',
    }
    constructor(props: MyPointsScoresProps) {
        super(props)
        this.state = {
            integral: 0,
            integralRecordResponses: [],
            signDays: 0,
            signIntegral: 0,
            isPopupStatus: false,
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'MyPointsScores/effectsGetIntegral',
            cb: (data) => {
                const { integral, integralRecordResponses, signDays, signIntegral } = data
                this.setState({
                    integral,
                    integralRecordResponses,
                    signDays,
                    signIntegral,
                })
            },
        })
    }

    onShowRule = () => {
        this.setState({
            isPopupStatus: true,
        })
    }

    closeSignIn = () => {
        this.setState({
            isPopupStatus: false,
        })
    }

    render() {
        const { integral, integralRecordResponses, signDays, signIntegral, isPopupStatus } = this.state
        return (
            <View className={styles.MyPointsScoresMain}>
                <Image src={Icons.pointBg} mode="widthFix" className={styles.banner} />
                <View className={styles.rule} onClick={this.onShowRule}></View>
                <View className={styles.allPoint}>
                    当前积分:<Text>{integral}</Text>
                </View>
                <View className={styles.content}>
                    <Point signInDay={signDays}>
                        <View className={styles.warning}>连续签到7天可获得5积分</View>
                    </Point>
                    <View className={styles.signIntegral}>
                        已获得<Text>{signIntegral}分</Text>
                    </View>
                </View>
                <View className={styles.pointsDetails}>
                    <View className={styles.title}>
                        <Image src={Icons.checkinTitleLeft} mode="widthFix" className={styles.icon} />
                        <Text>积分明细</Text>
                        <Image src={Icons.checkinTitleRight} mode="widthFix" className={styles.icon} />
                    </View>
                    <View className={styles.pointsList}>
                        {integralRecordResponses &&
                            integralRecordResponses.length > 0 &&
                            integralRecordResponses.map((item) => {
                                return (
                                    <View className={styles.listItem} key={item.id}>
                                        <View>
                                            <View className={styles.listTitle}>{item.title}</View>
                                            <View className={styles.listTime}>{getToday(item.createTime)}</View>
                                        </View>
                                        <View className={styles.number}>
                                            <Text>+{item.integral}</Text>
                                            <Image src={Icons.checkinOn} mode="widthFix" className={styles.icon} />
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                </View>
                {isPopupStatus && (
                    <Popup onClick={this.closeSignIn}>
                        <View className={styles.ruleWrapper}>
                            <View className={styles.ruleTitle}>积分规则</View>
                            <View className={styles.ruleListItem}>
                                <Text>消费积分：</Text>1元积一分
                            </View>
                            <View className={styles.ruleListItem}>
                                <Text>签到积分：</Text>
                                每日签到积一分，连续七日签到额外获得5分，连续30天签到额外获得10分，满30天重新计分。
                            </View>
                            <View className={styles.ruleListItem}>
                                <Text>分享积分：</Text>
                                分享文章积一分，每日上限5分，分享小程序积1分，通过分享进入小程序1分/人，每日上限20分。
                            </View>
                            <View className={styles.ruleListItem}>
                                <Text>拼单积分：</Text>拼单成功一次积5分，每日上限10分。
                            </View>
                        </View>
                    </Popup>
                )}
            </View>
        )
    }
}

export default MyPointsScores
