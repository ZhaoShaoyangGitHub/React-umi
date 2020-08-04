import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { SelectPackageProps, SelectPackageState } from './index.interface'
import styles from './SelectPackage.module.less'
import PackItem from '../../components/PackItem'
import { BASEURL } from '../../config/index'
import { EmptyImg } from '../../assets/img/load'

@connect(({ SelectPackage }) => ({
    ...SelectPackage,
}))
class SelectPackage extends Component<SelectPackageProps, SelectPackageState> {
    config: Config = {
        navigationBarTitleText: '选择套餐',
    }
    constructor(props: SelectPackageProps) {
        super(props)
        this.state = {
            userId: 0,
            list: [],
            pageIndex: 1,
            hasMore: true,
            type: 'suspendPackage', // suspendPackage 暂停套餐   refundOrder 订单退款
        }
    }

    componentDidShow = () => {
        const { type, userId } = this.$router.params
        this.setState(
            {
                userId: Number.parseInt(userId, 10) || 26,
                type: type || 'suspendPackage',
            },
            () => {
                this.getList()
                if (type === 'suspendPackage') {
                    Taro.setNavigationBarTitle({
                        title: '选择套餐',
                    })
                } else {
                    Taro.setNavigationBarTitle({
                        title: '选择订单',
                    })
                }
            },
        )
    }
    getList = () => {
        const { userId, type, pageIndex, list } = this.state
        Taro.showLoading({ title: '' })
        if (type === 'suspendPackage') {
            this.props.dispatch({
                type: 'PackageSchedul/getPackageList',
                params: { userId },
                cb: (data) => {
                    Taro.hideLoading()
                    this.setState({ list: data || [] })
                },
            })
        } else {
            this.props.dispatch({
                type: 'SelectPackage/getRefundList',
                params: { userId, pageIndex },
                cb: (data) => {
                    Taro.hideLoading()
                    const newList = data.list.map((item) => ({
                        ...item,
                        packageImage: item.goodsThumb,
                        packageName: item.goodsTitle,
                        orderId: item.id,
                        efficacy: item.orderDesc,
                    }))
                    this.setState({
                        list: pageIndex === 1 ? newList : list.concat(newList),
                        hasMore: pageIndex >= data.totalPage,
                    })
                },
            })
        }
    }

    onReachBottom() {
        const { type, hasMore, pageIndex } = this.state
        if (type === 'refundOrder') {
            if (hasMore) {
                this.setState(
                    {
                        pageIndex: pageIndex + 1,
                    },
                    () => {
                        this.getList()
                    },
                )
            }
        }
    }

    // 暂停套餐
    handleStop = (id) => {
        this.props.dispatch({
            type: 'SelectPackage/stopPackage',
            params: { id },
            cb: (data) => {
                Taro.showToast({
                    title: '暂停成功',
                })
                setTimeout(() => {
                    this.getList()
                }, 2000)
            },
        })
    }

    // 恢复套餐
    handleStart = (orderId, projectId) => {
        const { userId } = this.state
        Taro.navigateTo({
            url: `/pages/StartPackage/index?orderId=${orderId}&projectId=${projectId}&userId=${userId}`,
        })
    }

    render() {
        const { list } = this.state
        return (
            <View className={styles.SelectPackageMain}>
                {list.length ? (
                    <View>
                        {list.map((item) => {
                            return (
                                <View key={item.tradeId} style={{ margin: '20rpx 0' }}>
                                    <PackItem
                                        imgSrc={item.packageImage ? BASEURL + item.packageImage : ''}
                                        title={item.packageName}
                                        showObj={item.packageOrderProjectRecordResponseList}
                                        orderId={item.orderId}
                                        packageStatus={item.packageStatus}
                                        btnList={this.getButtonList(item)}
                                        onHandleSuitClick={() => {}}
                                        isShowStatus={false}
                                        efficacy={item.efficacy}
                                        isShowDetail
                                    />
                                </View>
                            )
                        })}
                    </View>
                ) : (
                    <View>
                        <Image src={EmptyImg.emptyPackage} className={styles.noDataImg} />
                        <View className={styles.word}>暂时没有套餐呦～</View>
                    </View>
                )}
            </View>
        )
    }
    getButtonList = (item) => {
        let buttonList: any = []
        const { type, userId } = this.state
        if (type === 'suspendPackage') {
            switch (item.packageStatus.value) {
                case 2:
                    buttonList.push({
                        title: '暂停套餐',
                        cb: () => this.handleStop(item.orderId),
                    })
                    break
                case 3:
                    buttonList.push({
                        title: '恢复套餐',
                        cb: () => this.handleStart(item.orderId, item.projectId),
                    })
                    break
                default:
                    break
            }
        } else {
            if ((item.refundStatus !== null && item.refundStatus.value !== -2) || item.sourceId !== null) {
                buttonList = []
            } else {
                buttonList.push({
                    title: '退款',
                    cb: () => {
                        Taro.navigateTo({
                            url: `/pages/ApplyRefund/index?orderId=${item.orderId}&userId=${userId}`,
                        })
                    },
                })
                buttonList.push({
                    title: '转让',
                    cb: () => {
                        Taro.navigateTo({
                            url: `/pages/SelectUser/index?type=transferPackage&oldUserId=${userId}&orderId=${item.orderId}`,
                        })
                    },
                })
            }
        }
        return buttonList
    }

    // handleSuitClick = (info: any) => {
    //     Taro.setStorageSync('currentPackageInfo', info)
    //     Taro.navigateTo({
    //         url: '/pages/SelectPackageDetail/index',
    //     })
    // }
}

export default SelectPackage
