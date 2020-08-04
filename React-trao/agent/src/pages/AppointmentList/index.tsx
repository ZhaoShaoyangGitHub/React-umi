import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import moment from 'moment'
import { AppointmentListProps, AppointmentListState } from './index.interface'
import styles from './AppointmentList.module.less'
import StoreItem from '../../components/StoreItem'
import { publicImages } from '../../assets/img/load'

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
            shopId: 0,
            nameList: [],
            dateList: [],
            storeInfo: null,
        }
    }

    componentDidShow = () => {
        const { shopId } = this.$router.params
        if (shopId) {
            this.setState(
                {
                    shopId: +shopId,
                },
                () => {
                    this.getpageList()
                },
            )
        }
        try {
            var value = Taro.getStorageSync('storeInfo')
            if (value) {
                this.setState({
                    storeInfo: JSON.parse(value),
                })
            } else {
                if (shopId) {
                    this.setState(
                        {
                            shopId: +shopId,
                        },
                        () => {
                            this.getShopDetails()
                        },
                    )
                }
            }
        } catch (e) {
            if (shopId) {
                this.setState(
                    {
                        shopId: +shopId,
                    },
                    () => {
                        this.getShopDetails()
                    },
                )
            }
        }
    }

    getShopDetails = () => {
        const { shopId } = this.state
        this.props.dispatch({
            type: 'Store/getShopDetails',
            payload: {
                shopId,
            },
            cb: (data) => {
                const { name, imageUrl, address } = data
                this.setState({
                    storeInfo: {
                        name,
                        imageUrl,
                        address,
                    },
                })
                Taro.setStorage({
                    key: 'storeInfo',
                    data: JSON.stringify({
                        name,
                        imageUrl,
                        address,
                    }),
                })
            },
        })
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }

    getpageList = () => {
        const { shopId, date } = this.state
        Taro.showLoading({ title: '' })
        this.props.dispatch({
            type: 'AppointmentList/getpageList',
            params: { shopId, time: date },
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
        const { nameList, dateList, date, storeInfo, shopId } = this.state
        return (
            <View className={styles.AppointmentListMain}>
                {storeInfo && (
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
                )}
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
