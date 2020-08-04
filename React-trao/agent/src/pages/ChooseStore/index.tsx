import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ChooseStoreProps, ChooseStoreState } from './index.interface'
import styles from './ChooseStore.module.less'
import SearchTop from '../../components/SearchTop'
import NoSearchData from '../../components/NoSearchData'
import StoreItem from '../../components/StoreItem'

@connect(({ ChooseStore }) => ({
    ...ChooseStore,
}))
class ChooseStore extends Component<ChooseStoreProps, ChooseStoreState> {
    config: Config = {
        navigationBarTitleText: '选择门店',
    }
    constructor(props: ChooseStoreProps) {
        super(props)
        this.state = {
            searchText: '',
            pageInfo: {
                currentPageIndex: 1,
                totalPage: 0,
                pageSize: 0,
            },
            storeList: [],
        }
    }

    componentDidMount() {
        this.getStoreList()
    }

    searchStore = (value) => {
        this.setState(
            {
                searchText: value,
            },
            () => {
                if (!value) {
                    Taro.showToast({
                        title: '请输入搜索内容',
                        icon: 'none',
                    })
                    return
                }
                this.getStoreList()
            },
        )
    }

    getStoreList = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { searchText, pageInfo } = this.state
        let payload = {
            name: '',
            pageIndex: pageInfo.currentPageIndex,
        }
        if (searchText) {
            payload = {
                name: searchText,
                pageIndex: pageInfo.currentPageIndex,
            }
        }
        this.props.dispatch({
            type: 'ChooseStore/getStoreList',
            payload,
            cb: (data) => {
                if (data) {
                    const { list, pageIndex, pageSize, totalPage } = data
                    this.setState({
                        storeList: list,
                        pageInfo: {
                            currentPageIndex: pageIndex,
                            pageSize,
                            totalPage,
                        },
                    })
                }
                Taro.hideLoading()
            },
        })
    }

    changeStore = (shopId) => {
        Taro.setStorageSync('shopId', shopId)
        Taro.reLaunch({ url: `/pages/Home/index?shopId=${shopId}` })
    }

    render() {
        const { searchText, storeList } = this.state
        return (
            <View className={styles.ChooseStoreMain}>
                <SearchTop
                    searchText={searchText}
                    placeholder={'请输入门店名称'}
                    isShowBack={false}
                    onSearchHandle={this.searchStore}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                />
                <View className={styles.storeListWrapper}>
                    <View className={styles.storeList}>
                        {storeList && storeList.length > 0 ? (
                            storeList.map((item) => {
                                return (
                                    <StoreItem
                                        key={item.id}
                                        storeTitle={item.name}
                                        storeAddress={item.address}
                                        onHandleClick={() => {
                                            this.changeStore(item.id)
                                        }}
                                    />
                                )
                            })
                        ) : (
                            <NoSearchData text="搜索门店" imageUrl="emptyShop" />
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default ChooseStore
