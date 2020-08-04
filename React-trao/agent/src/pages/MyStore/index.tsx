import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import StockItem from '../../components/StockItem'
import GoodsDetailsList from '../../components/GoodsDetailsList'
import { MyStoreProps, MyStoreState } from './index.interface'
import styles from './MyStore.module.less'

@connect(({ MyStore }) => ({
    ...MyStore,
}))
class MyStore extends Component<MyStoreProps, MyStoreState> {
    config: Config = {
        navigationBarTitleText: '我的仓库',
    }
    constructor(props: MyStoreProps) {
        super(props)
        this.state = {
            seletInd: 1,
            showList: [],
            isFetching: false,
            keyword: ' ',
            pageIndex: 1,
            hasMore: true,
        }
    }

    componentDidShow = () => {
        // isAppointment  支付状态{1:已预约,2:未预约}
        // keyword	用户名称/手机号
        this.getpageList()
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
        const { isFetching, pageIndex, showList } = this.state
        Taro.showLoading({ title: '' })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'StockList/getpageList',
                params: { pageIndex, shopId: '' },
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

    handleSelect = (ind) => {
        this.setState({ seletInd: ind, pageIndex: 1 }, () => {
            // this.getpageList()
        })
    }
    handleSwitchToDetail = (id: number) => {
        console.log(id)
        Taro.navigateTo({
            url: `/pages/DateDetail/index?id=${id}`,
        })
    }
    render() {
        const btnArr = [
            {
                title: '库存数量',
                id: 1,
            },
            {
                title: '商品明细',
                id: 2,
            },
        ]
        const { seletInd, showList, keyword } = this.state
        return (
            <View className={styles.MyStoreMain}>
                <View className={styles.topBox}>
                    <View className={styles.selectBox}>
                        {btnArr.map((item, index) => {
                            return (
                                <View
                                    key={item.id}
                                    style={seletInd === item.id ? { fontWeight: 'bold', color: '#000' } : {}}
                                    className={styles.btnItem}
                                    onClick={this.handleSelect.bind(this, item.id)}
                                >
                                    {item.title}
                                    {seletInd === item.id && <View className={styles.line}></View>}
                                </View>
                            )
                        })}
                    </View>
                </View>
                {seletInd === 1 && (
                    <View className={styles.content}>
                        {showList.map((item) => {
                            return (
                                <View className={styles.stockItem} key={item.id}>
                                    <StockItem
                                        isShowButotn={false}
                                        goodsImage={item.goodsImage}
                                        goodsTitle={item.name}
                                        goodsStorage={item.number}
                                        onClick={() => {
                                            Taro.navigateTo({
                                                url: '/pages/ApplyExchangeGoods/index',
                                            })
                                        }}
                                    />
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
                )}
                {seletInd === 2 && <GoodsDetailsList type="my" />}
            </View>
        )
    }
}

export default MyStore
