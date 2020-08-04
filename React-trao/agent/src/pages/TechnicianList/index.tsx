import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { BASEURL } from '../../config/index'
import { TechnicianListProps, TechnicianListState } from './index.interface'
import styles from './TechnicianList.module.less'
import StoreItem from '../../components/StoreItem'
import { publicImages } from '../../assets/img/load'

@connect(({ TechnicianList }) => ({
    ...TechnicianList,
}))
class TechnicianList extends Component<TechnicianListProps, TechnicianListState> {
    config: Config = {
        navigationBarTitleText: '技师管理',
    }
    constructor(props: TechnicianListProps) {
        super(props)
        this.state = {
            showList: [],
            isFetching: false,
            pageIndex: 1,
            hasMore: true,
            shopId: 0,
            storeInfo: null,
        }
    }

    componentDidShow = () => {
        // isAppointment  支付状态{1:已预约,2:未预约}
        // keyword	用户名称/手机号
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

    onReachBottom = () => {
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

    getpageList = () => {
        const { isFetching, pageIndex, shopId, showList } = this.state
        Taro.showLoading({ title: '' })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'TechnicianList/getpageList',
                params: { pageIndex, shopId },
                cb: (data) => {
                    Taro.hideLoading()
                    if (data && data.list && Array.isArray(data.list)) {
                        this.setState({ showList: pageIndex === 1 ? data.list : showList.concat(data.list) })
                    }
                    this.setState({ isFetching: false, hasMore: pageIndex < data.totalPage })
                    console.log(data)
                },
            })
        }
    }

    handleToDetail = (id: number) => {
        Taro.navigateTo({
            url: `/pages/TechnicianDetail/index?id=${id}`,
        })
    }

    handleToAdd = () => {
        const { shopId } = this.state
        Taro.navigateTo({
            url: `/pages/TechnicianOperation/index?id=${null}&shopId=${shopId}`,
        })
    }

    handleChange = (e, id) => {
        console.log(e.detail.value)
        this.props.dispatch({
            type: 'TechnicianList/changeTechnicianState',
            params: { technicianUserId: id, type: e.detail.value ? 1 : 2 },
            cb: (data) => {
                this.getpageList()
            },
        })
    }

    render() {
        const { showList, storeInfo, shopId } = this.state
        return (
            <View className={styles.TechnicianListMain}>
                {storeInfo && (
                    <StoreItem
                        storeTitle={storeInfo.name}
                        storeAddress={storeInfo.address}
                        storeImg={storeInfo.imageUrl && JSON.parse(storeInfo.imageUrl)[0].file}
                        nameStyles={{ fontSize: '32rpx' }}
                        itemStyles={{ 'box-shadow': 'none!important' }}
                        onHandleClick={() => {
                            this.goStorePage(shopId)
                        }}
                    >
                        <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                    </StoreItem>
                )}
                <View className={styles.content}>
                    {showList.map((item) => {
                        return (
                            <View className={styles.technicianItem} key={item.userId}>
                                <View className={styles.left} onClick={() => this.handleToDetail(item.userId)}>
                                    <Image src={item.avatar ? BASEURL + item.avatar : publicImages.test} />
                                    <View className={styles.del}>
                                        <Text>{item.name}</Text>
                                        <Text>工号：{item.workNumber}</Text>
                                    </View>
                                </View>
                                <Switch checked={item.enable} onChange={(e) => this.handleChange(e, item.userId)} />
                            </View>
                        )
                    })}
                    {!showList.length && (
                        <View
                            className={styles.noData}
                            style={{
                                marginTop: '300rpx',
                                textAlign: 'center',
                                fontSize: '30rpx',
                                fontWeight: 'bold',
                            }}
                        >
                            暂无数据～
                        </View>
                    )}
                </View>

                <View className={styles.button} onClick={this.handleToAdd}>
                    添加账号
                </View>
            </View>
        )
    }
}

export default TechnicianList
