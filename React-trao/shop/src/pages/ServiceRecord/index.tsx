import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import moment from 'moment'
import { connect } from '@tarojs/redux'
import { ServiceRecordProps, ServiceRecordState } from './index.interface'
import styles from './ServiceRecord.module.less'
import { getToday, getHoursMin } from '../../utils/function'
import NoSearchData from '../../components/NoSearchData'
import { BASEURL } from '../../config/index'

@connect(({ ServiceRecord }) => ({
    ...ServiceRecord,
}))
class ServiceRecord extends Component<ServiceRecordProps, ServiceRecordState> {
    config: Config = {
        navigationBarTitleText: '服务记录',
    }
    constructor(props: ServiceRecordProps) {
        super(props)
        this.state = {
            recordList: [1],
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
        this.getRecordList()
    }

    onChange = (e): void => {
        this.setState(
            {
                date: e.detail.value,
            },
            () => {},
        )
    }

    getRecordList = () => {
        this.props.dispatch({
            type: 'ServiceRecord/getServiceRecord',
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

    goServiceDetails = () => {
        Taro.navigateTo({
            url: `/pages/ServiceDetails/index?id=`,
        })
    }

    render() {
        const { recordList, date, serviceInfo } = this.state
        return (
            <View className={styles.ServiceRecordMain}>
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
                                            onClick={this.goServiceDetails}
                                            key={item.id}
                                        >
                                            {item.avatar && (
                                                <View className={styles.memberAvatar}>
                                                    <Image
                                                        src={BASEURL + JSON.parse(item.avatar).file}
                                                        mode="widthFix"
                                                        className={styles.avatar}
                                                    />
                                                </View>
                                            )}
                                            <View className={styles.right}>
                                                <View className={styles.title}>
                                                    <View className={styles.name}>{item.staffUserName}</View>
                                                    <View className={styles.phone}>{item.phone}</View>
                                                </View>
                                                <View className={styles.data}>
                                                    {getToday(item.startTime) + '  '}
                                                    {moment(item.startTime).format('HH:mm')}-
                                                    {moment(item.endTime).format('HH:mm')}
                                                </View>
                                                <View className={styles.project}>
                                                    <Text>{item.packageProjectName}</Text>
                                                </View>
                                            </View>

                                            {item.status.value === 5 && <Text className={styles.status}>待确认</Text>}
                                            {item.status.value === 2 && <Text className={styles.status}>已确认</Text>}
                                        </View>
                                    )
                                })}
                            </View>
                        ) : (
                            <NoSearchData type="服务记录" />
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default ServiceRecord
