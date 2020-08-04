import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ShopSearchProps, ShopSearchState } from './index.interface'
import NoSearchData from '../../components/NoSearchData/index'
import ShopItem from '../../components/ShopItem/index'
import SearchTop from '../../components/SearchTop'
import { publicImages } from '../../assets/img/load'
import styles from './ShopSearch.module.less'

@connect(({ ShopSearch }) => ({
    ...ShopSearch,
}))
class ShopSearch extends Component<ShopSearchProps, ShopSearchState> {
    config: Config = {
        navigationBarTitleText: '搜索门店',
    }
    constructor(props: ShopSearchProps) {
        super(props)
        this.state = {
            searchVal: '',
            hasMore: true,
            historyList: [],
            storeList: [],
            pageInfo: {
                pageIndex: 1,
                totalPage: 1,
            },
        }
    }

    componentDidShow() {
        this.setState({
            historyList: JSON.parse(Taro.getStorageSync('historyList')) || [],
        })
    }

    onReachBottom() {
        const { hasMore, pageInfo } = this.state
        if (hasMore) {
            this.setState(
                {
                    pageInfo: {
                        pageIndex: pageInfo.pageIndex + 1,
                        totalPage: pageInfo.totalPage,
                    },
                },
                () => [this.handleSearch()],
            )
        }
    }

    searchMember = (value) => {
        if (value === this.state.searchVal) return
        this.setState(
            {
                searchVal: value,
                storeList: [],
                pageInfo: {
                    pageIndex: 1,
                    totalPage: 1,
                },
            },
            () => {
                this.handleSearch()
            },
        )
    }

    handleSearch = () => {
        Taro.showLoading({
            title: '加载中。。。',
        })
        const { searchVal, storeList, pageInfo, historyList } = this.state

        if (historyList.indexOf(searchVal) < 0 && searchVal !== '') {
            const newList = historyList
            newList.push(searchVal)
            Taro.setStorageSync('historyList', JSON.stringify(newList))
            this.setState({
                historyList: newList,
            })
        }
        this.props.dispatch({
            type: 'ShopSearch/shopSearch',
            params: { pageIndex: pageInfo.pageIndex, pageSize: 20, name: searchVal },
            cb: (data) => {
                this.setState(
                    {
                        storeList: storeList.concat(data.list),
                        pageInfo: {
                            pageIndex: data.pageIndex,
                            totalPage: data.totalPage,
                        },
                        hasMore: data.pageIndex < data.totalPage,
                    },
                    () => {
                        Taro.hideLoading()
                    },
                )
            },
        })
    }

    SwitchToStoreDetail = (id) => {
        Taro.navigateTo({
            url: '/pages/StoreDetail/index?id=' + id,
        })
    }

    // 清楚历史记录
    handleClearHistory = () => {
        this.setState({
            historyList: [],
        })
        Taro.removeStorageSync('historyList')
    }

    render() {
        const { searchVal, historyList, storeList } = this.state
        return (
            <View className={styles.ShopSearchMain}>
                <View className={styles.searchBar}>
                    <SearchTop
                        searchText={searchVal}
                        placeholder={'请输入门店名称'}
                        isShowBack={false}
                        onSearchHandle={this.searchMember}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                    />
                </View>

                {searchVal !== '' && (
                    <View className={styles.tabBarListItem}>
                        {storeList.length > 0 ? (
                            storeList.map((item) => {
                                return (
                                    <View
                                        key={item.id}
                                        onClick={() => {
                                            Taro.navigateTo({
                                                url: `/pages/GoodList/index?id=${item.id}&name=${item.name}`,
                                            })
                                        }}
                                        style={{ marginBottom: '30rpx' }}
                                    >
                                        <ShopItem
                                            shopTitle={item.name}
                                            shopAddress={item.province + item.city + item.area}
                                        />
                                    </View>
                                )
                            })
                        ) : (
                            <NoSearchData text={'结果'} />
                        )}
                    </View>
                )}
                {searchVal === '' && (
                    <View className={styles.history}>
                        <View className={styles.title}>
                            <Text>历史搜索</Text>
                            <Image
                                onClick={this.handleClearHistory}
                                src={publicImages.delete}
                                className={styles.delete}
                            />
                        </View>
                        <View className={styles.historyList}>
                            {historyList.map((item) => (
                                <Text
                                    key={item}
                                    onClick={() => {
                                        this.setState(
                                            {
                                                searchVal: item,
                                            },
                                            () => {
                                                this.handleSearch()
                                            },
                                        )
                                    }}
                                >
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default ShopSearch
