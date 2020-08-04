import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import StockItem from '../../components/StockItem'
import GoodsDetailsList from '../../components/GoodsDetailsList'
import { StockListProps, StockListState } from './index.interface'
import styles from './StockList.module.less'

@connect(({ StockList }) => ({
    ...StockList,
}))
class StockList extends Component<StockListProps, StockListState> {
    config: Config = {
        navigationBarTitleText: '商品库存',
    }
    constructor(props: StockListProps) {
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
        const { isFetching, pageIndex, seletInd, keyword, showList } = this.state
        Taro.showLoading({ title: '加载中', mask: true })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'StockList/getpageList',
                params: { pageIndex },
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
                title: '商品库存',
                id: 1,
            },
            {
                title: '商品明细',
                id: 2,
            },
        ]
        const { seletInd, showList, keyword } = this.state
        return (
            <View className={styles.StockListMain}>
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
                                        goodsImage={item.goodsImage && JSON.parse(item.goodsImage)[0].file}
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
                {seletInd === 2 && <GoodsDetailsList />}
            </View>
        )
    }
}

export default StockList
