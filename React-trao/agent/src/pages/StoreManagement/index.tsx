import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StoreManagementProps, StoreManagementState } from './index.interface'
import styles from './StoreManagement.module.less'
import StoreItem from '../../components/StoreItem'
import NoSearchData from '../../components/NoSearchData'

@connect(({ StoreManagement, ChooseStore }) => ({
    ...StoreManagement,
    ...ChooseStore,
}))
class StoreManagement extends Component<StoreManagementProps, StoreManagementState> {
    config: Config = {
        navigationBarTitleText: '门店管理',
    }
    constructor(props: StoreManagementProps) {
        super(props)
        this.state = {
            pageInfo: {
                currentPageIndex: 1,
                totalPage: 0,
                pageSize: 0,
            },
            storeList: [],
        }
    }

    componentDidShow() {
        this.getStoreList()
    }

    getStoreList = () => {
        const { pageInfo } = this.state
        this.props.dispatch({
            type: 'ChooseStore/getStoreList',
            payload: {
                name: '',
                pageIndex: pageInfo.currentPageIndex,
            },
            cb: (data) => {
                const { list, pageIndex, pageSize, totalPage } = data
                this.setState({
                    storeList: list,
                    pageInfo: {
                        currentPageIndex: pageIndex,
                        pageSize,
                        totalPage,
                    },
                })
            },
        })
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/Store/index?shopId=${shopId}` })
    }

    render() {
        const { storeList } = this.state

        return (
            <View className={styles.StoreManagementMain}>
                <View className={styles.StoreManagementWrapper}>
                    {storeList && storeList.length > 0 ? (
                        storeList.map((item) => {
                            return (
                                <StoreItem
                                    key={item.id}
                                    storeTitle={item.name}
                                    storeAddress={
                                        (item.province === item.city ? '' : item.province) +
                                        item.city +
                                        item.area +
                                        item.address
                                    }
                                    storeImg={JSON.parse(item.imageUrl)[0].file}
                                    nameStyles={{ fontSize: '32rpx' }}
                                    onHandleClick={() => {
                                        this.goStorePage(item.id)
                                    }}
                                />
                            )
                        })
                    ) : (
                        <NoSearchData text="门店" imageUrl="emptyShop" />
                    )}
                </View>
                {/* <View className={styles.NewStoresBtn}>新开门店</View> */}
            </View>
        )
    }
}

export default StoreManagement
