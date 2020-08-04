import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSwitch } from 'taro-ui'
import { GoodsDetailsItemProps, State } from './index.interface'
import { BASEURL } from '../../config/index'
import { HomeImages } from '../../assets/img/load'
import styles from './index.module.less'
@connect(({ StockList }) => ({
    ...StockList,
}))
class GoodsDetailsItem extends Component<GoodsDetailsItemProps, State> {
    static defaultProps = {
        goodsImage: '',
        goodsTitle: '玫瑰精油',
        goodsStorage: 191,
        goodsType: 1,
        onClick: () => {},
        type: 'all',
        status: 1,
    }
    constructor(props: GoodsDetailsItemProps) {
        super(props)
        this.state = {
            showMask: false,
            isCheck: false,
            logisticsProvider: '',
            logisticsNumber: '',
        }
    }

    // 自取
    handleChangePickUp = () => {
        const { isCheck } = this.state
        this.setState({
            isCheck: !isCheck,
        })
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value,
        })
    }

    // 获取状态
    getStatus = () => {
        const { status } = this.props
        switch (status) {
            case 1:
                return '待审核'
            case 2:
                return '已确认'
            case 3:
                return '已驳回'
            default:
                return ''
        }
    }

    // 获取物品类型
    getGoodsType = () => {
        const { goodsType } = this.props
        switch (goodsType) {
            case 1:
                return '入库'
            case 2:
                return '使用'
            case 3:
                return '换出'
            case 4:
                return '换入'
            case 5:
                return '取消/退款'
            default:
                return ''
        }
    }

    // 提交物流信息
    handleSubmit = () => {
        // this.props.dispatch({
        //     type: 'StockList/getgoodsRecordList',
        //     params: {
        //       deliveryCompany:,
        //       deliveryNo:,
        //       deliveryType:,
        //       tradeId:,
        //         shopId: Taro.getStorageSync('shopId'),
        //     },
        //     cb: (data) => {
        //         Taro.hideLoading()
        //         this.setState({
        //             showList: showList.concat(data.list),
        //             hasMore: pageIndex < data.totalPage,
        //         })
        //     },
        // })
    }

    render() {
        const { goodsImage, goodsTitle, goodsStorage, onClick, type } = this.props
        const { showMask, isCheck, logisticsProvider, logisticsNumber } = this.state
        let getGoodsInfo: any = null
        if (type === 'all') {
            getGoodsInfo = (
                <View className={styles.goodsDel}>
                    <Text className={styles.goodsTitle}>{goodsTitle}</Text>
                    <Text className={styles.goodsType}>
                        <Text>类型：</Text>
                        {this.getGoodsType()}
                    </Text>
                    <Text className={styles.storage}>
                        <Text>库存数量：</Text>
                        {goodsStorage}瓶
                    </Text>
                </View>
            )
        }
        if (type === 'my') {
            getGoodsInfo = (
                <View className={`${styles.goodsDel} ${styles.my}`}>
                    <Text className={styles.goodsTitle}>{goodsTitle}</Text>
                    <View className={styles.middle}>
                        <Text className={styles.goodsType}>
                            <Text>类型：</Text>
                            {this.getGoodsType()}
                        </Text>
                        <Text className={styles.storage}>
                            <Text>库存数量：</Text>
                            {goodsStorage}瓶
                        </Text>
                    </View>
                    <View className={styles.time}>
                        <Text>时</Text>
                        <Text>2019-06-11</Text>
                    </View>
                </View>
            )
        }

        return (
            <View className={styles.container}>
                <View className={styles.info}>
                    <Image className={styles.goodsImg} src={BASEURL + goodsImage} />
                    {getGoodsInfo}
                </View>

                {type === 'all' && (
                    <View className={styles.right}>
                        <Text className={styles.status}>{this.getStatus()}</Text>
                        <Text
                            className={styles.button}
                            onClick={() => {
                                this.setState({
                                    showMask: true,
                                })
                                if (onClick) {
                                    onClick()
                                }
                            }}
                        >
                            {/* 发货 */}
                        </Text>
                    </View>
                )}

                {showMask && (
                    <View className={styles.mask}>
                        <View className={styles.maskInfoBox}>
                            <Image src={HomeImages.maskBg} className={styles.maskBgImg} />
                            <View className={styles.maskBgword}>填写物流信息</View>
                            <View className={styles.selectBox}>
                                <AtSwitch
                                    title="是否自取"
                                    checked={isCheck}
                                    onChange={this.handleChangePickUp}
                                    color="#B365B7"
                                />
                                <Input
                                    value={logisticsProvider}
                                    placeholder="请填写物流商"
                                    onInput={(e) => this.handleChange(e, 'logisticsProvider')}
                                />
                                <Input
                                    value={logisticsNumber}
                                    placeholder="请填写物流编号"
                                    onInput={(e) => this.handleChange(e, 'logisticsNumber')}
                                />
                            </View>
                            <View className={styles.buttonList}>
                                <View
                                    // className={styles.confirm}
                                    onClick={() => {
                                        this.setState({
                                            showMask: false,
                                        })
                                    }}
                                >
                                    取消
                                </View>
                                <View className={styles.confirm} onClick={this.handleSubmit}>
                                    提交
                                </View>
                            </View>
                            <Image
                                src={HomeImages.maskCloseIcon}
                                className={styles.closeBtn}
                                onClick={() => {
                                    this.setState({ showMask: false })
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default GoodsDetailsItem
