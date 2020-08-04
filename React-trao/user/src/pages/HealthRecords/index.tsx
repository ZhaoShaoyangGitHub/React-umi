import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, CoverView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CalendarNormal from '../../components/CalendarNormal/index'
import { HealthRecordsProps, HealthRecordsState } from './index.interface'
import styles from './index.module.less'
import BarChart from '../../components/Echart/BarChart'
import { Icons } from '../../assets/img/load'
import moment from 'moment'

@connect(({ HealthRecords }) => ({
    ...HealthRecords,
}))
class HealthRecords extends Component<HealthRecordsProps, HealthRecordsState> {
    config: Config = {
        navigationBarTitleText: '健康档案',
    }
    barChart: any

    constructor(props: HealthRecords) {
        super(props)
        this.state = {
            chartData: {},
            weightData: [],
            menstrualRecords: [],
            symptomsList: [],
            selectDayList: [], //日期记录
        }
    }

    componentDidShow() {
        this.setState(
            {
                // weightData: [],
                // selectDayList: [], //日期记录
            },
            () => {
                this.getHealthRecords()
            },
        )
    }
    getHealthRecords = () => {
        this.props.dispatch({
            type: 'HealthRecords/getHealthRecords',
            cb: (data) => {
                const { userWeightResponses, userMenstruationResponses, userSymptomResponse } = data
                let dataX: any = []
                let dataValue: any = []
                let dataZoom: any = []
                if (userWeightResponses.length > 0) {
                    userWeightResponses.map((item) => {
                        dataX.push(moment(item.createTime).format('MM-DD'))
                        dataValue.push(+item.weight)
                    })
                    if (userWeightResponses.length > 7) {
                        dataZoom = [
                            {
                                type: 'inside',
                                start: 50,
                                end: 100,
                            },
                        ]
                    }
                }
                let selectDayList: any = []
                if (userMenstruationResponses.length > 0) {
                    userMenstruationResponses.map((item) => {
                        let dataList: any = []
                        let startTime = item.startTime
                        while (startTime <= item.endTime) {
                            dataList.push(moment(startTime).format('YYYY/M/D'))
                            startTime += 1000 * 60 * 60 * 24
                        }
                        selectDayList.push({
                            dataList,
                            status: item.status && item.status.value,
                        })
                    })
                }
                this.setState(
                    {
                        weightData: userWeightResponses,
                        menstrualRecords: userMenstruationResponses,
                        symptomsList: userSymptomResponse.symptomValues || [],
                        chartData: {
                            dataZoom,
                            dimensions: {
                                dataX,
                            },
                            measures: [
                                {
                                    name: '日期',
                                    data: dataValue,
                                    barWidth: 20, //柱图宽度,
                                },
                            ],
                        },
                        selectDayList,
                    },
                    () => {
                        if (dataX.length) {
                            this.barChart.refresh(this.state.chartData)
                        }
                    },
                )
            },
        })
    }

    refBarChart = (node) => (this.barChart = node)

    goUpdateRecords = () => {
        Taro.navigateTo({
            url: '/pages/UpdateRecords/index',
        })
    }

    goEditProfile = () => {
        Taro.navigateTo({
            url: '/pages/EditProfile/index',
        })
    }

    setDataPage = (type: number = 1) => {
        Taro.navigateTo({
            url: `/pages/HealthRecordsSetting/index?type=${type}`,
        })
    }

    render() {
        const { weightData, menstrualRecords, symptomsList, selectDayList } = this.state
        return (
            <View className={styles.container}>
                <CoverView className={styles.title}>
                    <CoverView>体重数据</CoverView>
                </CoverView>
                {weightData.length > 0 && (
                    <CoverView className={styles.weightData}>
                        <BarChart ref={this.refBarChart} />
                    </CoverView>
                )}
                <CoverView className={styles.title}>月经记录</CoverView>
                {menstrualRecords.length ? (
                    <View>
                        <View className={styles.menstrualRecords}>
                            <View className={styles.status}>
                                <View className={styles.normal}>正常</View>
                                <View className={styles.abnormal}>不正常</View>
                            </View>
                            <View className={styles.addWrapper} onClick={() => this.setDataPage(2)}>
                                <Image src={Icons.addIcon} className={styles.addIcon} mode="widthFix" />
                                <View>添加记录</View>
                            </View>
                        </View>
                        <View className={styles.calendarBox}>
                            <CalendarNormal
                                // 年月标题样式
                                titleOpt={{
                                    template: 'AYear BMonth',
                                    style: {
                                        color: 'rgba(51, 51, 51, 1)',
                                        fontSize: '28rpx',
                                        textAlign: 'center',
                                        fontFamily: 'PingFangSC-Medium',
                                    },
                                }}
                                // 周末标题配置
                                weekOpt={{
                                    // 周末标题文字和样式
                                    data: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
                                    style: {
                                        color: 'rgba(153, 153, 153, 1)',
                                        fontSize: '28rpx',
                                        fontFamily: 'DINAlternate-Bold',
                                    },
                                }}
                                // 天的样式主题配置
                                dayOpt={{
                                    // 天的默认样式
                                    defaultStyle: {
                                        color: '#999',
                                        fontSize: '28rpx',
                                        fontFamily: 'PingFang-SC-Medium',
                                    },
                                    // 今天的样式
                                    todayStyle: {
                                        width: '54rpx',
                                        height: '54rpx',
                                        lineHeight: '54rpx',
                                        textAlign: 'center',
                                        borderRadius: '27rpx',
                                        color: '#B365B7',
                                        backgroundColor: '#fff',
                                        fontSize: '28rpx',
                                        fontFamily: 'PingFang-SC-Medium',
                                    },
                                    // 天的当前月样式
                                    currentMonthStyle: {
                                        color: 'rgba(51, 51, 51, 1)',
                                        fontSize: '28rpx',
                                        fontFamily: 'PingFang-SC-Medium',
                                        fontWeight: 'bold',
                                        marginLeft: '10rpx',
                                    },
                                    // 天的点击样式（正常）
                                    clickedStyle: {
                                        width: '54rpx',
                                        height: '54rpx',
                                        borderRadius: '27rpx',
                                        backgroundColor: 'rgba(179, 101, 183, 1)',
                                        color: '#fff',
                                        fontSize: '28rpx',
                                    },
                                    // 天的点击样式（不正常）
                                    abnormalClickedStyle: {
                                        width: '54rpx',
                                        height: '54rpx',
                                        borderRadius: '27rpx',
                                        backgroundColor: '#ff7f7f',
                                        color: '#fff',
                                        fontSize: '28rpx',
                                    },
                                }}
                                isClick={false}
                                selectDayList={selectDayList}
                            />
                        </View>
                    </View>
                ) : (
                    <View className={styles.addWrapper} onClick={() => this.setDataPage(2)}>
                        <Image src={Icons.addIcon} className={styles.addIcon} mode="widthFix" />
                        <View>添加记录</View>
                    </View>
                )}
                <View className={styles.title}>
                    <Text>不适症状</Text>
                    {symptomsList.length > 0 && (
                        <View
                            className={styles.records}
                            onClick={() => {
                                this.goUpdateRecords()
                            }}
                        >
                            <Text>更新记录</Text>
                            <Image src={Icons.findMore} className={styles.icon}></Image>
                        </View>
                    )}
                </View>
                {symptomsList.length > 0 ? (
                    <View>
                        <View className={styles.symptomsList}>
                            {symptomsList &&
                                symptomsList.length > 0 &&
                                symptomsList.map((item: any) => {
                                    return (
                                        <View className={styles.list_item} key={item.symptom}>
                                            {item.symptom}
                                        </View>
                                    )
                                })}
                        </View>
                        <View
                            className={styles.buttonWrapper}
                            onClick={() => {
                                this.goEditProfile()
                            }}
                        >
                            <View className={styles.button}>编辑症状</View>
                        </View>
                    </View>
                ) : (
                    <View
                        className={styles.addWrapper}
                        onClick={() => {
                            this.goEditProfile()
                        }}
                    >
                        <Image src={Icons.addIcon} className={styles.addIcon} mode="widthFix" />
                        <View>添加症状</View>
                    </View>
                )}
            </View>
        )
    }
}

export default HealthRecords
