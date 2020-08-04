import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { ShopSearchProps, ShopSearchState } from './index.interface'
import NoSearchData from '../../components/NoSearchData/index'
import ShopItem from '../../components/ShopItem/index'
import ArticleItem from '../../components/ArticleItem'
import { Icons } from '../../assets/img/load'
import styles from './ShopSearch.module.less'

@connect(({ ShopSearch }) => ({
    ...ShopSearch,
}))
class ShopSearch extends Component<ShopSearchProps, ShopSearchState> {
    config: Config = {
        navigationBarTitleText: '搜索',
        onReachBottomDistance: 10,
    }
    constructor(props: ShopSearchProps) {
        super(props)
        this.state = {
            current: 0,
            searchVal: '',
            shopList: [],
            packageList: [],
            goodsList: [],
            articleList: [],
            pageInfo: {
                pageIndex: 1,
                totalPage: 0,
                pageSize: 20,
            },
            userId: 0, //用户默认id，未登录默认是0
        }
    }

    componentDidMount() {
        let { id } = this.$router.params
        if (id) {
            this.handleClick(Number.parseInt(id, 10))
        } else {
            this.handleSearch()
        }
        try {
            var personInfo = Taro.getStorageSync('personalInfo')
            if (personInfo) {
                this.setState({
                    userId: JSON.parse(personInfo).userId,
                })
            }
        } catch (e) {
            // Do something when catch error
        }
    }
    onReachBottom() {
        const { pageInfo } = this.state
        if (pageInfo.pageIndex < pageInfo.totalPage) {
            pageInfo.pageIndex++
            this.handleSearch()
        }
    }
    handleInputChange = (e) => {
        this.setState({
            searchVal: e.target.value,
        })
    }
    handleClearInputValue = () => {
        this.setState({ searchVal: '' })
    }
    handleSearch = () => {
        Taro.showLoading({
            title: '加载中',
        })
        const { searchVal, current, pageInfo, shopList, packageList, goodsList, articleList } = this.state
        switch (current) {
            case 0:
                this.props.dispatch({
                    type: 'ShopSearch/shopSearch',
                    params: { pageIndex: pageInfo.pageIndex, pageSize: pageInfo.pageSize, keyword: searchVal },
                    cb: (data) => {
                        const { list, pageIndex, totalPage, pageSize } = data
                        this.setState(
                            {
                                shopList: list && list.length > 0 ? shopList.concat(list) : shopList,
                                pageInfo: {
                                    pageIndex: pageIndex,
                                    totalPage,
                                    pageSize,
                                },
                            },
                            () => {
                                Taro.hideLoading()
                            },
                        )
                    },
                })
                break
            case 1:
                this.props.dispatch({
                    type: 'ShopSearch/packageSearch',
                    params: { pageIndex: pageInfo.pageIndex, pageSize: pageInfo.pageSize, keyword: searchVal },
                    cb: (data) => {
                        const { list, pageIndex, totalPage, pageSize } = data
                        this.setState(
                            {
                                packageList: list && list.length > 0 ? packageList.concat(list) : packageList,
                                pageInfo: {
                                    pageIndex: pageIndex,
                                    totalPage,
                                    pageSize,
                                },
                            },
                            () => {
                                Taro.hideLoading()
                            },
                        )
                    },
                })
                break
            case 2:
                this.props.dispatch({
                    type: 'ShopSearch/goodsSearch',
                    params: { pageIndex: pageInfo.pageIndex, pageSize: pageInfo.pageSize, keyword: searchVal },
                    cb: (data) => {
                        const { list, pageIndex, totalPage, pageSize } = data
                        this.setState(
                            {
                                goodsList: list && list.length > 0 ? goodsList.concat(list) : goodsList,
                                pageInfo: {
                                    pageIndex: pageIndex,
                                    totalPage,
                                    pageSize,
                                },
                            },
                            () => {
                                Taro.hideLoading()
                            },
                        )
                    },
                })
                break
            case 3:
                this.props.dispatch({
                    type: 'ShopSearch/articleSearch',
                    params: { title: searchVal, pageIndex: pageInfo.pageIndex },
                    cb: (data) => {
                        const { list, pageIndex, totalPage } = data
                        this.setState(
                            {
                                articleList: list && list.length > 0 ? articleList.concat(list) : articleList,
                                pageInfo: {
                                    pageIndex,
                                    totalPage,
                                    pageSize: pageInfo.pageSize,
                                },
                            },
                            () => {
                                Taro.hideLoading()
                            },
                        )
                    },
                })
                break
        }
    }
    handleClick(value) {
        this.setState(
            {
                current: value,
                shopList: [],
                packageList: [],
                goodsList: [],
                articleList: [],
                pageInfo: {
                    pageIndex: 1,
                    totalPage: 0,
                    pageSize: 20,
                },
            },
            () => {
                this.handleSearch()
            },
        )
    }
    searchInput = () => {
        this.setState(
            {
                shopList: [],
                packageList: [],
                goodsList: [],
                articleList: [],
                pageInfo: {
                    pageIndex: 1,
                    totalPage: 0,
                    pageSize: 20,
                },
            },
            () => {
                this.handleSearch()
            },
        )
    }
    SwitchToStoreDetail = (id) => {
        const { userId } = this.state
        if (!userId) {
            Taro.showToast({
                title: '请登录',
                icon: 'none',
                duration: 500,
                mask: true,
                success: () => {
                    const timer = setTimeout(() => {
                        clearInterval(timer)
                        Taro.reLaunch({ url: '/pages/UserLogin/index' })
                    }, 500)
                },
            })
            return
        }
        Taro.navigateTo({
            url: `/pages/StoreDetail/index?id=${id}`,
        })
    }
    handleSwitch = (id, type) => {
        const { userId } = this.state
        switch (type) {
            case 'pack':
                Taro.navigateTo({
                    url: `/pages/PackageDetail/index?id=${id}&userId=${userId}`,
                })
                break
            case 'goods':
                Taro.navigateTo({
                    url: `/pages/GoodsDetail/index?id=${id}&userId=${userId}`,
                })
                break
            default:
                return
        }
    }
    render() {
        const { searchVal, current, shopList, packageList, goodsList, articleList, pageInfo, userId } = this.state
        const tabList = [{ title: '门店' }, { title: '套餐' }, { title: '商品' }, { title: '文章' }]
        return (
            <View className={styles.ShopSearchMain}>
                <View className={styles.searchBar}>
                    <View className={styles.searchBox}>
                        <Image className={styles.searchIcon} src={Icons.searchIcon} />
                        <Input
                            className={styles.searchInput}
                            value={searchVal}
                            onInput={this.handleInputChange.bind(this)}
                            placeholder="请输入商品/门店/文章关键词"
                        />
                        {searchVal && (
                            <Image
                                onClick={this.handleClearInputValue}
                                className={styles.searchIcon}
                                src={Icons.closeIcon}
                            />
                        )}
                    </View>
                    <View className={styles.searchBtn} onClick={this.searchInput}>
                        搜索
                    </View>
                </View>
                <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={current} index={0}>
                        {shopList && shopList.length > 0 ? (
                            <View className={styles.tabBarListItem}>
                                {shopList.map((item) => {
                                    return (
                                        <View key={item.id} onClick={this.SwitchToStoreDetail.bind(this, item.id)}>
                                            <ShopItem
                                                shopImg={JSON.parse(item.imageUrl)[0].file}
                                                shopTitle={item.name}
                                                shopAddress={item.province + item.city + item.area}
                                                shopPhoneNum={item.phone}
                                                propsStyles={{ marginBottom: '30rpx' }}
                                            />
                                        </View>
                                    )
                                })}
                                <View className={styles.loadText}>
                                    {pageInfo.pageIndex <= pageInfo.totalPage ? '没有更多数据了~' : '加载中···'}
                                </View>
                            </View>
                        ) : (
                            <NoSearchData type={'门店'} />
                        )}
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                        {packageList && packageList.length > 0 ? (
                            <View className={styles.tabBarListItem}>
                                {packageList.map((item) => {
                                    return (
                                        <ShopItem
                                            key={item.id}
                                            onHandleClick={this.handleSwitch.bind(this, item.id, 'pack')}
                                            shopImg={item.imageUrl}
                                            shopTitle={item.name}
                                            shopAddress={''}
                                            shopPrice={item.marketPrice}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                            efficacy={item.efficacy}
                                        />
                                    )
                                })}
                                <View className={styles.loadText}>
                                    {pageInfo.pageIndex <= pageInfo.totalPage ? '没有更多数据了~' : '加载中···'}
                                </View>
                            </View>
                        ) : (
                            <NoSearchData type={'套餐'} />
                        )}
                    </AtTabsPane>
                    <AtTabsPane current={current} index={2}>
                        {goodsList && goodsList.length > 0 ? (
                            <View className={styles.tabBarListItem}>
                                {goodsList.map((item) => {
                                    return (
                                        <ShopItem
                                            key={item.id}
                                            onHandleClick={this.handleSwitch.bind(this, item.id, 'goods')}
                                            shopImg={item.image}
                                            shopTitle={item.name}
                                            shopAddress={''}
                                            shopPrice={item.marketPrice}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                            efficacy={item.efficacy}
                                        />
                                    )
                                })}
                                <View className={styles.loadText}>
                                    {pageInfo.pageIndex <= pageInfo.totalPage ? '没有更多数据了~' : '加载中···'}
                                </View>
                            </View>
                        ) : (
                            <NoSearchData type={'商品'} />
                        )}
                    </AtTabsPane>
                    <AtTabsPane current={current} index={3}>
                        {articleList && articleList.length > 0 ? (
                            <View className={styles.articleList}>
                                {articleList.map((item) => {
                                    return (
                                        <ArticleItem
                                            onHandleClick={() => {
                                                Taro.navigateTo({
                                                    url: `/pages/ArticleDetails/index?id=${item.id}&userId=${userId}`,
                                                })
                                            }}
                                            key={item.id}
                                            articleImg={JSON.parse(item.image).file}
                                            articleTitle={item.title}
                                            numberWatch={item.numberWatch}
                                            thumbUpNumber={item.thumbUpNumber}
                                            data={item.createTime}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                        />
                                    )
                                })}
                                <View className={styles.loadText}>
                                    {pageInfo.pageIndex <= pageInfo.totalPage ? '没有更多数据了~' : '加载中···'}
                                </View>
                            </View>
                        ) : (
                            <NoSearchData type={'文章'} />
                        )}
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }
}

export default ShopSearch
