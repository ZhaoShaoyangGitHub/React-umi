import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MyPackageProps, MyPackageState } from './index.interface'
import styles from './MyPackage.module.less'
import PackItem from '../../components/PackItem'
import { BASEURL } from '../../config/index'
import { EmptyImg } from '../../assets/img/load'

@connect(({ MyPackage }) => ({
    ...MyPackage,
}))
class MyPackage extends Component<MyPackageProps, MyPackageState> {
    config: Config = {
        navigationBarTitleText: '我的套餐',
    }
    constructor(props: MyPackageProps) {
        super(props)
        this.state = {
            current: 0,
            list: [],
        }
    }

    componentDidShow = () => {
        const { current } = this.state
        this.getList(current + 1)
    }
    getList = (status) => {
        Taro.showLoading({ title: '' })
        // status: 套餐状态{1:未预约,2:已预约,3:暂停,4:已结束}
        this.props.dispatch({
            type: 'Subscribe/getPackageList',
            params: { status, pageIndex: 1 },
            cb: (data) => {
                if (data && Array.isArray(data.list)) {
                    this.setState({ list: data.list })
                } else {
                    this.setState({ list: [] })
                }
                Taro.hideLoading()
            },
        })
    }

    handleClick = (id) => {
        this.setState({ current: id })
        switch (id) {
            case 0:
                this.getList(1)
                break
            case 1:
                this.getList(2)
                break
            case 2:
                this.getList(3)
                break
            case 3:
                this.getList(4)
                break
            default:
                return
        }
    }
    componentDidMount() {}

    render() {
        const menuArr = [
            { id: 0, title: '未开始' },
            { id: 1, title: '已预约' },
            { id: 2, title: '暂停中' },
            { id: 3, title: '已结束' },
        ]
        const { current, list } = this.state
        return (
            <View className={styles.MyPackageMain}>
                <View className={styles.topSelectBox}>
                    {menuArr.map((item) => {
                        return (
                            <View
                                key={item.id}
                                style={current === item.id ? { color: '#333', fontWeight: 'bold' } : {}}
                                className={styles.menuItem}
                                onClick={this.handleClick.bind(this, item.id)}
                            >
                                {item.title}

                                {current === item.id && <View className={styles.dots}></View>}
                            </View>
                        )
                    })}
                </View>

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
                                        btnObj={{
                                            title: this.check(item.packageStatus),
                                            cb: this.checkfn(item.packageStatus),
                                        }}
                                        onHandleSuitClick={() => this.handleSuitClick(item)}
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
    check = (packageStatus) => {
        switch (packageStatus.value) {
            case 1:
            case 2:
                return '去预约'
            default:
                return '出错'
        }
    }
    checkfn = (payStatus) => {
        switch (payStatus.value) {
            case 1:
            case 2:
                return this.handleClickbtn
            default:
                return () => {}
        }
    }
    handleClickbtn = (orderId) => {
        Taro.navigateTo({
            url: `/pages/PackageSelect/index?orderId=${orderId}`,
        })
    }
    handleSuitClick = (info: any) => {
        Taro.setStorageSync('currentPackageInfo', info)
        Taro.navigateTo({
            url: '/pages/MyPackageDetail/index',
        })
    }
}

export default MyPackage
