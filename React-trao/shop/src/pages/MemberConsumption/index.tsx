import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { MemberConsumptionProps, MemberConsumptionState } from './index.interface'
import NoSearchData from '../../components/NoSearchData'
import styles from './MemberConsumption.module.less'
import { getToday, getHoursMin } from '../../utils/function'
import { BASEURL } from '../../config/index'

@connect(({ MemberConsumption }) => ({
    ...MemberConsumption,
}))
class MemberConsumption extends Component<MemberConsumptionProps, MemberConsumptionState> {
    config: Config = {
        navigationBarTitleText: '会员消费',
        navigationBarBackgroundColor: '#B365B7',
        navigationBarTextStyle: 'white',
    }
    constructor(props: MemberConsumptionProps) {
        super(props)
        this.state = {
            current: 0,
            userId: 0,
            recordList: [],
            packageList: [],
            date: '',
            serviceInfo: {
                todayTime: 0,
                totalNumber: 0,
                totalTime: 0,
                weeksTime: 0,
            },
        }
    }

    componentDidMount() {
        const { userId } = this.$router.params
        if (userId) {
            this.setState(
                {
                    userId: +userId,
                    date: getToday(),
                },
                () => {
                    this.getConsumptionInfo()
                    this.getRecordList()
                },
            )
        }
    }

    handleClick = (value) => {
        if (this.state.current === value) return
        this.setState({
            current: value,
        })
        if (value === 1) {
            this.getPackageList()
        }
    }

    onChange = (e): void => {
        this.setState(
            {
                date: e.detail.value,
            },
            () => {
                this.getRecordList()
            },
        )
    }

    getConsumptionInfo = () => {
        const { userId } = this.state
        this.props.dispatch({
            type: 'MemberConsumption/getConsumptionInfo',
            payload: {
                userId,
            },
            cb: (data) => {
                if (data) {
                    const { todayTime, totalNumber, totalTime, weeksTime } = data
                    this.setState({
                        serviceInfo: {
                            todayTime,
                            totalNumber,
                            totalTime,
                            weeksTime,
                        },
                    })
                }
            },
        })
    }

    getRecordList = () => {
        const { userId, date } = this.state
        this.props.dispatch({
            type: 'MemberConsumption/getServiceRecord',
            payload: {
                time: new Date(date).getTime(),
                userId,
            },
            cb: (data) => {
                if (data) {
                    this.setState({
                        recordList: data,
                    })
                } else {
                    this.setState({
                        recordList: [],
                    })
                }
            },
        })
    }

    getPackageList = () => {
        const { userId } = this.state
        this.props.dispatch({
            type: 'MemberConsumption/getPackageList',
            payload: {
                userId,
            },
            cb: (data) => {
                if (data) {
                    this.setState({
                        packageList: data,
                    })
                }
            },
        })
    }

    goServiceDetails = (id) => {
        Taro.navigateTo({
            url: `/pages/MemberServicesDetails/index?id=${id}`,
        })
    }

    render() {
        const tabList = [{ title: '服务记录' }, { title: '会员套餐' }]
        const { current, recordList, date, serviceInfo, packageList } = this.state
        return (
            <View className={styles.MemberConsumptionMain}>
                <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={current} index={0}>
                        <View className={styles.serviceRecordWrapper}>
                            <View className={styles.serviceTop}>
                                <View className={styles.totalService}>
                                    <View className={styles.title}>累计服务(小时)</View>
                                    <View className={styles.number}>{serviceInfo.totalTime}</View>
                                </View>
                                <View className={styles.totalTimes}>
                                    <View className={styles.title}>累计次数(次)</View>
                                    <View className={styles.number}>{serviceInfo.totalNumber}</View>
                                </View>
                                <View className={styles.weekService}>
                                    <View className={styles.title}>本周服务(小时)</View>
                                    <View className={styles.number}>{serviceInfo.weeksTime}</View>
                                </View>
                                <View className={styles.dayService}>
                                    <View className={styles.title}>今日服务(小时)</View>
                                    <View className={styles.number}>{serviceInfo.todayTime}</View>
                                </View>
                            </View>
                            <View className={styles.recordMain}>
                                <Picker
                                    mode="date"
                                    end={getToday()}
                                    onChange={(e) => this.onChange(e)}
                                    value={date}
                                    start="1920-01-01"
                                >
                                    <View className={styles.picker}>
                                        <Text>{date || '请选择'}</Text>
                                    </View>
                                </Picker>
                                <View className={styles.recordData}></View>
                                {recordList && recordList.length > 0 ? (
                                    <View className={styles.recodeList}>
                                        {recordList.map((item) => {
                                            return (
                                                <View
                                                    className={styles.recodeListItem}
                                                    onClick={() => this.goServiceDetails(item.id)}
                                                    key={item.id}
                                                >
                                                    {item.avatar && (
                                                        <View className={styles.memberAvatar}>
                                                            <Image
                                                                src={
                                                                    item.avatar.includes('file')
                                                                        ? item.avatar.includes('https://')
                                                                            ? JSON.parse(item.avatar).file
                                                                            : BASEURL + JSON.parse(item.avatar).file
                                                                        : BASEURL + item.avatar
                                                                }
                                                                mode="widthFix"
                                                                className={styles.avatar}
                                                            />
                                                        </View>
                                                    )}
                                                    <View>
                                                        <View className={styles.title}>
                                                            <View className={styles.name}>{item.staffUserName}</View>
                                                            {/* <View className={styles.phone}>{item.phone}</View> */}
                                                        </View>
                                                        <View className={styles.data}>
                                                            {getToday(item.startTime) + '  '}
                                                            {getHoursMin(item.startTime)}-{getHoursMin(item.endTime)}
                                                        </View>
                                                        <View className={styles.project}>
                                                            <Text className={styles.subTitle}>服务项目：</Text>
                                                            <Text>{item.packageProjectName}</Text>
                                                        </View>
                                                        <View className={styles.project}>
                                                            <Text className={styles.subTitle}>饮食记录：</Text>
                                                            <Text>
                                                                昨日早餐{item.yesterdayBreakfast}，昨日午餐
                                                                {item.yesterdayLunch}昨日晚餐{item.yesterdaySupper}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                ) : (
                                    <NoSearchData type="服务记录" />
                                )}
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        <View className={styles.memberPackage}>
                            {packageList.length > 0 ? (
                                <View className={styles.memberPackageList}>
                                    {packageList.map((items) => {
                                        const { packageOrderProjectRecordResponseList } = items
                                        let name: string = ''
                                        let times: string = ''
                                        if (
                                            packageOrderProjectRecordResponseList &&
                                            packageOrderProjectRecordResponseList.length > 0
                                        ) {
                                            packageOrderProjectRecordResponseList.map((item, index) => {
                                                name += (index === 0 ? '' : '+') + item.projectName
                                                times +=
                                                    (index === 0 ? '' : '+') +
                                                    item.validNumber +
                                                    '次' +
                                                    item.projectName
                                            })
                                        }
                                        return (
                                            <View className={styles.packageListItem} key={items.id}>
                                                <View className={styles.packageImage}>
                                                    <Image
                                                        className={styles.image}
                                                        src={BASEURL + items.packageImage}
                                                        mode="widthFix"
                                                    />
                                                </View>
                                                <View className={styles.packageInfo}>
                                                    <View className={styles.title}>{items.packageName}</View>
                                                    <View className={styles.project}>服务项目:{name}</View>
                                                    <View className={styles.project}>剩余次数:{times}</View>
                                                    <View
                                                        className={styles.changeBtn}
                                                        onClick={() => {
                                                            Taro.navigateTo({
                                                                url: '/pages/SchedulSelectUser/index',
                                                            })
                                                        }}
                                                    >
                                                        排期
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            ) : (
                                <NoSearchData type="套餐记录" />
                            )}
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }
}

export default MemberConsumption
