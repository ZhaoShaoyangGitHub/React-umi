import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import moment, { months } from 'moment'
import { StoreBalanceDetailProps, StoreBalanceDetailState } from './index.interface'
import styles from './StoreBalanceDetail.module.less'
// import { } from '../../components'

@connect(({ StoreBalanceDetail }) => ({
    ...StoreBalanceDetail,
}))
class StoreBalanceDetail extends Component<StoreBalanceDetailProps, StoreBalanceDetailState> {
    config: Config = {
        navigationBarTitleText: '明细',
    }
    constructor(props: StoreBalanceDetailProps) {
        super(props)
        this.state = {
            date: moment().format('YYYY-MM'),
            shopId: 0,
            detailList: [],
            pageIndex: 1,
            hasMore: true,
        }
    }

    componentDidShow = () => {
        const { shopId } = this.$router.params
        this.setState(
            {
                shopId: Number.parseInt(shopId, 10) || 5,
            },
            () => {
                this.getpageList()
            },
        )
    }

    getpageList = () => {
        const { shopId, date, pageIndex, detailList } = this.state
        Taro.showLoading({ title: '' })
        this.props.dispatch({
            type: 'StoreBalanceDetail/getpageList',
            params: { shopId, startTime: date, pageIndex },
            cb: (data) => {
                Taro.hideLoading()
                this.setState({
                    detailList: pageIndex === 1 ? data.list : detailList.concat(data.list),
                    hasMore: data.totalPage > pageIndex,
                })
            },
        })
    }

    handleSelectDate = (e) => {
        this.setState(
            {
                date: e.detail.value,
                pageIndex: 1,
            },
            () => {
                this.getpageList()
            },
        )
    }

    handleRefresh = () => {
        const { pageIndex, hasMore } = this.state
        if (hasMore) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getpageList()
                },
            )
        }
    }

    render() {
        const { detailList, date } = this.state
        return (
            <View className={styles.StoreBalanceDetailMain}>
                <Picker mode="date" onChange={this.handleSelectDate} value={date} fields="month">
                    <View className={styles.picker}>
                        <Text>{date}▼</Text>
                    </View>
                </Picker>
                {detailList.length > 0 ? (
                    <ScrollView className={styles.list} onScrollToLower={this.handleRefresh} lowerThreshold={100}>
                        {detailList.map((item) => (
                            <View className={styles.item} key={item.id}>
                                <View className={styles.left}>
                                    <Text className={styles.desc}>{item.title}</Text>
                                    <Text className={styles.time}>
                                        {moment(item.createTime).format('MM月DD日 HH:mm')}
                                    </Text>
                                </View>

                                <Text className={item.status.value === 1 ? styles.light : ''}>
                                    {item.status.value === 2 ? '-' : '+'}
                                    {item.amount.toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View className={styles.emptyWrapper}>
                        <View className={styles.emptyWord}>暂无数据</View>
                    </View>
                )}
            </View>
        )
    }
}

export default StoreBalanceDetail
