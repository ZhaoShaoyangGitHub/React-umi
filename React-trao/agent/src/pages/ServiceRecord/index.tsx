import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ServiceRecordProps, ServiceRecordState } from './index.interface'
import styles from './ServiceRecord.module.less'
import SearchTop from '../../components/SearchTop'
import NoSearchData from '../../components/NoSearchData'
import { getToday, getTime } from '../../utils/function'
import StoreItem from '../../components/StoreItem'
import { publicImages } from '../../assets/img/load'

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
            searchText: '',
            recordList: [],
            storeInfo: null,
            shopId: 0,
        }
    }

    componentDidMount() {
        this.getServiceRecord()
        const { shopId } = this.$router.params
        if (shopId) {
            this.setState({
                shopId: +shopId,
            })
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

    searchRecord = (value) => {
        this.setState(
            {
                searchText: value,
            },
            () => {
                this.getServiceRecord()
            },
        )
    }

    getServiceRecord = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { searchText } = this.state
        this.props.dispatch({
            type: 'ServiceRecord/getServiceRecord',
            payload: {
                keyword: searchText,
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
                Taro.hideLoading()
            },
        })
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }
    render() {
        const { searchText, recordList, storeInfo, shopId } = this.state
        return (
            <View className={styles.ServiceRecordMain}>
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
                <SearchTop searchText={searchText} placeholder={'请输入技师名'} onSearchHandle={this.searchRecord} />
                <View className={styles.recordListWrapper}>
                    <View className={styles.recordList}>
                        {recordList && recordList.length > 0 ? (
                            recordList.map((item) => {
                                return (
                                    <View className={styles.recordListItem} key={item.id}>
                                        <View className={styles.recordInfo}>
                                            <View className={styles.recordInfoTitle}>开始时间：</View>
                                            <View>{getToday(item.startTime) + '  ' + getTime(item.startTime)}</View>
                                        </View>
                                        <View className={styles.recordInfo}>
                                            <View className={styles.recordInfoTitle}>结束时间：</View>
                                            <View>{getToday(item.endTime) + '  ' + getTime(item.endTime)}</View>
                                        </View>
                                        <View className={styles.recordInfo}>
                                            <View className={styles.recordInfoTitle}>服务技师：</View>
                                            <View>{item.staffUserName}</View>
                                        </View>
                                        <View className={styles.recordInfo}>
                                            <View className={styles.recordInfoTitle}>消费者：</View>
                                            <View>{item.userName}</View>
                                        </View>
                                        <View className={styles.recordInfo}>
                                            <View className={styles.recordInfoTitle}>服务套餐：</View>
                                            <View>{item.packageName}</View>
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <NoSearchData text="服务记录" imageUrl="emptyCollection" />
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default ServiceRecord
