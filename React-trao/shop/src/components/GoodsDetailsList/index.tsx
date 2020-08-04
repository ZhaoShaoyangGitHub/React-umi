import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import GoodsDetailsItem from '../GoodsDetailsItem'
import { GoodsDetailsListProps, GoodsDetailsListState } from './index.interface'
import styles from './index.module.less'
// import { } from '../../components'
@connect(({ StockList }) => ({
    ...StockList,
}))
class GoodsDetailsList extends Component<GoodsDetailsListProps, GoodsDetailsListState> {
    static defaultProps: GoodsDetailsListProps = {
        type: 'all',
    }
    constructor(props: GoodsDetailsListProps) {
        super(props)
        this.state = {
            showList: [],
            pageIndex: 1,
            hasMore: true,
            goodsNameList: [],
            goodsNameId: '',
            goodsTypeId: '',
            startDate: '',
            endDate: '',
            currentFilterIndex: 0, // 当前筛选条件index
        }
    }

    componentDidMount = () => {
        // isAppointment  支付状态{1:已预约,2:未预约}
        // keyword	用户名称/手机号
        this.getGoodsNameList()
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
        Taro.showLoading({ title: '' })
        const { pageIndex, goodsNameId, goodsTypeId, startDate, endDate, showList } = this.state
        this.props.dispatch({
            type: 'StockList/getgoodsRecordList',
            params: {
                pageIndex,
                goodsId: goodsNameId,
                type: goodsTypeId,
                startTime: startDate,
                endTime: endDate,
            },
            cb: (data) => {
                Taro.hideLoading()
                this.setState({
                    showList: pageIndex === 1 ? data.list : showList.concat(data.list),
                    hasMore: pageIndex < data.totalPage,
                })
            },
        })
    }

    // 点击筛选条件
    handleClickFilter = (index: number) => {
        this.setState({
            currentFilterIndex: index,
        })
    }

    getGoodsNameList = () => {
        this.props.dispatch({
            type: 'StockList/getgoodsNameList',
            params: {},
            cb: (data) => {
                this.setState({
                    goodsNameList: data,
                })
            },
        })
    }

    // 选择商品类型
    handleSelectGoodsType = (item) => {
        const { goodsTypeId } = this.state
        this.setState(
            {
                goodsTypeId: goodsTypeId === item.id ? '' : item.id,
                currentFilterIndex: 0,
                pageIndex: 1,
            },
            () => {
                this.getpageList()
            },
        )
    }

    // 选择商品名称
    handleSelectGoodsName = (item) => {
        const { goodsNameId } = this.state
        this.setState(
            {
                goodsNameId: goodsNameId === item.goodsId ? '' : item.goodsId,
                currentFilterIndex: 0,
                pageIndex: 1,
            },
            () => {
                this.getpageList()
            },
        )
    }

    isSelectConditon = (item) => {
        const { goodsNameId, goodsTypeId, startDate, endDate } = this.state
        switch (item.id) {
            case 1: {
                if (goodsNameId !== '') {
                    return true
                }
                return false
            }
            case 2: {
                if (goodsTypeId !== '') {
                    return true
                }
                return false
            }
            case 3: {
                if (startDate !== '' || endDate !== '') {
                    return true
                }
                return false
            }
            default:
                return false
        }
    }

    render() {
        const { currentFilterIndex, startDate, endDate, goodsNameList, goodsTypeId, goodsNameId, showList } = this.state
        const { type } = this.props
        const filterList = [
            {
                title: '商品名称 ▼',
                id: 1,
            },
            {
                title: '类型 ▼',
                id: 2,
            },
            {
                title: '日期 ▼',
                id: 3,
            },
        ]
        const goodsTypeList = [
            {
                title: '入库',
                id: 1,
            },
            {
                title: '使用',
                id: 2,
            },
            {
                title: '换出',
                id: 3,
            },
            {
                title: '换入',
                id: 4,
            },
            {
                title: '取消/退换',
                id: 5,
            },
        ]
        return (
            <View className={styles.GoodsDetailsListMain}>
                <View className={styles.filter}>
                    {filterList.map((item) => (
                        <View
                            key={item.id}
                            className={
                                currentFilterIndex === item.id || this.isSelectConditon(item)
                                    ? `${styles.filterItem} ${styles.blod}`
                                    : styles.filterItem
                            }
                            onClick={() => {
                                this.handleClickFilter(item.id)
                            }}
                        >
                            {item.title}
                        </View>
                    ))}
                </View>
                {currentFilterIndex !== 0 && (
                    <View className={styles.conditionDetail}>
                        {currentFilterIndex === 1 && (
                            <View className={styles.conditionMain}>
                                {goodsNameList.map((item) => (
                                    <View
                                        className={styles.conditionItem}
                                        key={item.goodsId}
                                        onClick={() => this.handleSelectGoodsName(item)}
                                    >
                                        <Text className={goodsNameId === item.goodsId ? styles.active : ''}>
                                            {item.goodsName}
                                        </Text>
                                        {goodsNameId === item.goodsId && <Image src="" />}
                                    </View>
                                ))}
                            </View>
                        )}
                        {currentFilterIndex === 2 && (
                            <View className={styles.conditionMain}>
                                {goodsTypeList.map((item) => (
                                    <View
                                        className={styles.conditionItem}
                                        key={item.id}
                                        onClick={() => this.handleSelectGoodsType(item)}
                                    >
                                        <Text className={goodsTypeId === item.id ? styles.active : ''}>
                                            {item.title}
                                        </Text>
                                        {goodsTypeId === item.id && <Image src="" />}
                                    </View>
                                ))}
                            </View>
                        )}

                        {currentFilterIndex === 3 && (
                            <View className={styles.conditionMain}>
                                <View className={styles.datePickerBlock}>
                                    <Picker
                                        mode="date"
                                        value={startDate}
                                        onChange={(e: any) => {
                                            this.setState(
                                                {
                                                    startDate: e.target.value,
                                                    pageIndex: 1,
                                                },
                                                () => {
                                                    this.getpageList()
                                                },
                                            )
                                        }}
                                    >
                                        <View
                                            className={
                                                startDate !== '' ? `${styles.date} ${styles.activeDate}` : styles.date
                                            }
                                        >
                                            {startDate}
                                        </View>
                                    </Picker>
                                    至
                                    <Picker
                                        mode="date"
                                        value={endDate}
                                        onChange={(e: any) => {
                                            this.setState(
                                                {
                                                    endDate: e.target.value,
                                                    pageIndex: 1,
                                                },
                                                () => {
                                                    this.getpageList()
                                                },
                                            )
                                        }}
                                    >
                                        <View
                                            className={
                                                endDate !== '' ? `${styles.date} ${styles.activeDate}` : styles.date
                                            }
                                        >
                                            {endDate}
                                        </View>
                                    </Picker>
                                </View>
                            </View>
                        )}

                        <View
                            className={styles.back}
                            onClick={() => {
                                this.setState({ currentFilterIndex: 0 })
                            }}
                        ></View>
                    </View>
                )}

                <View className={styles.content}>
                    {showList.map((item) => {
                        return (
                            <View className={styles.stockItem} key={item.id}>
                                <GoodsDetailsItem
                                    type={type}
                                    goodsImage={item.goodsImage}
                                    goodsTitle={item.goodsName}
                                    goodsStorage={item.number}
                                    goodsType={item.type.value}
                                    status={item.status.value}
                                />
                            </View>
                        )
                    })}
                </View>
                {!showList.length && (
                    <View
                        className={styles.noData}
                        style={{ marginTop: '300rpx', textAlign: 'center', fontSize: '30rpx', fontWeight: 'bold' }}
                    >
                        暂无数据～
                    </View>
                )}
            </View>
        )
    }
}

export default GoodsDetailsList
