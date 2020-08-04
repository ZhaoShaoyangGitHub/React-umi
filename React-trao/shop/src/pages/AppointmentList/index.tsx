import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import moment from 'moment'
import { AppointmentListProps, AppointmentListState } from './index.interface'
import styles from './AppointmentList.module.less'
// import StoreItem from '../../components/StoreItem'
// import { publicImages } from '../../assets/img/load'

@connect(({ AppointmentList }) => ({
    ...AppointmentList,
}))
class AppointmentList extends Component<AppointmentListProps, AppointmentListState> {
    config: Config = {
        navigationBarTitleText: '预约列表',
    }
    constructor(props: AppointmentListProps) {
        super(props)
        this.state = {
            isFetching: false,
            date: moment().format('YYYY-MM-DD'),
            nameList: [],
            dateList: [],
        }
    }

    componentDidShow = () => {
        this.getpageList()
    }

    getpageList = () => {
        const { date } = this.state
        Taro.showLoading({ title: '' })
        this.props.dispatch({
            type: 'AppointmentList/getpageList',
            params: { time: date },
            cb: (data) => {
                Taro.hideLoading()

                this.setState({
                    nameList: data.technicianInfoResponses || [],
                    dateList: data.technicianWorkingResponses || [],
                })
            },
        })
    }

    handleSelectDate = (e) => {
        this.setState(
            {
                date: e.detail.value,
            },
            () => {
                this.getpageList()
            },
        )
    }

    render() {
        const { nameList, dateList, date } = this.state
        return (
            <View className={styles.AppointmentListMain}>
                {/* {storeInfo && (
                    <StoreItem
                        storeTitle={storeInfo.name}
                        storeAddress={storeInfo.address}
                        storeImg={storeInfo.imageUrl && JSON.parse(storeInfo.imageUrl)[0].file}
                        nameStyles={{ fontSize: '32rpx' }}
                        propsStyles={{ marginBottom: 0 }}
                        itemStyles={{ 'box-shadow': 'none!important' }}
                        onHandleClick={() => {
                            this.goStorePage(shopId)
                        }}
                    >
                        <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                    </StoreItem>
                )} */}
                <Picker mode="date" onChange={this.handleSelectDate} value={date}>
                    <View className={styles.picker}>
                        <Text>{date}▼</Text>
                    </View>
                </Picker>

                <View className={styles.list}>
                    {nameList.length > 0 && (
                        <View className={styles.row}>
                            <Text className={styles.date}></Text>
                            {nameList.map((name) => (
                                <Text className={styles.item}>{name.name}</Text>
                            ))}
                        </View>
                    )}
                    {dateList.map((dateItem) => (
                        <View className={styles.row}>
                            <Text className={styles.date}>
                                {moment(dateItem.businessHoursStart).format('HH:mm')}-
                                {moment(dateItem.businessHoursEnd).format('HH:mm')}
                            </Text>
                            {dateItem.technicianInfoResponses.map((name) => (
                                <Text
                                    className={
                                        name.isTrue.value === 1 ? `${styles.item} ${styles.active}` : styles.item
                                    }
                                >
                                    {name.isTrue.value === 1 ? '已预约' : ''}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}

export default AppointmentList
