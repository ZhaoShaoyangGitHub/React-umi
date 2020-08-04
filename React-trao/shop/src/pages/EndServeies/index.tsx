import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input, Text } from '@tarojs/components'
import moment from 'moment'
import { connect } from '@tarojs/redux'
import { EndServeiesProps, EndServeiesState } from './index.interface'
import styles from './EndServeies.module.less'
import { publicImages } from '../../assets/img/load'
import testAvatar from '../../assets/img/test/test.png'
import { BASEURL } from '../../config'

@connect(({ EndServeies, MySubscribe }) => ({
    ...EndServeies,
    ...MySubscribe,
}))
class EndServeies extends Component<EndServeiesProps, EndServeiesState> {
    config: Config = {
        navigationBarTitleText: '结束服务',
    }
    constructor(props: EndServeiesProps) {
        super(props)
        this.state = {
            isFetching: false,
            pageIndex: 1,
            hasMore: true,
            keyword: '',
            showList: [],
        }
    }

    componentDidMount() {
        this.getpageList()
    }

    getpageList = () => {
        const { isFetching, pageIndex, showList, keyword } = this.state
        Taro.showLoading({ title: '' })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'MySubscribe/getPageList',
                params: { pageIndex, isAppointment: 1, keyword, status: 4 },
                cb: (data) => {
                    Taro.hideLoading()
                    if (data && data.list && Array.isArray(data.list)) {
                        this.setState({
                            showList: pageIndex === 1 ? data.list : showList.concat(data.list),
                            hasMore: pageIndex < data.totalPage,
                        })
                    }
                    this.setState({ isFetching: false })
                },
            })
        }
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

    handleInput = (e) => {
        this.setState({
            keyword: e.target.value,
        })
    }
    // 搜索
    handleSearch = () => {
        this.setState(
            {
                pageIndex: 1,
            },
            () => {
                this.getpageList()
            },
        )
    }
    handleSwitchToDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/WriteOff/index?id=${id}`,
        })
    }
    render() {
        const { showList, keyword } = this.state
        return (
            <View className={styles.EndServeiesMain}>
                <View className={styles.topBox}>
                    <View className={styles.searchBox}>
                        <Image src={publicImages.search} className={styles.leftimg} />
                        <View className={styles.rightinput}>
                            <Input
                                type="text"
                                value={keyword}
                                onInput={(e) => this.handleInput(e)}
                                placeholder="请输入会员账号"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                                onConfirm={this.handleSearch}
                            />
                        </View>
                    </View>
                </View>

                <View className={styles.content}>
                    {showList.map((item) => {
                        return (
                            <View className={styles.item} key={item.id}>
                                <View
                                    key={item.id}
                                    className={styles.contentItem}
                                    onClick={() => this.handleSwitchToDetail(item.id)}
                                >
                                    <Image
                                        src={item.avatar ? BASEURL + JSON.parse(item.avatar).file : testAvatar}
                                        className={styles.leftAvatar}
                                    />
                                    <View className={styles.rightInfo}>
                                        <View className={styles.titleItem}>
                                            <View className={styles.left}>{item.userName}</View>
                                            <View className={styles.right}>{item.userPhone}</View>
                                        </View>

                                        <View className={styles.infoItem}>
                                            <View className={styles.key}>开始时间：</View>
                                            <View className={styles.val}>
                                                {item.schedulingTime
                                                    ? moment(item.schedulingTime).format('YYYY-MM-DD HH:mm')
                                                    : ''}
                                            </View>
                                        </View>

                                        <View className={styles.infoItem}>
                                            <View className={styles.key}>套餐：</View>
                                            <View className={styles.val}>
                                                {item.projectSchedulingResponses[0].packageName}
                                            </View>
                                        </View>

                                        <View className={styles.infoItem}>
                                            <View className={styles.key}>项目：</View>
                                            <View className={styles.val}>
                                                {item.projectSchedulingResponses.map((pack) => (
                                                    <Text key={pack.id}>{pack.packageProjectName + ' '}</Text>
                                                ))}
                                            </View>
                                        </View>
                                        {/*
                                    <View className={styles.infoItem}>
                                        <View className={styles.key}>备注：</View>
                                        <View className={styles.val}>喜欢喝养生茶</View>
                                    </View> */}
                                    </View>
                                </View>
                                <View className={styles.btnsBox}>
                                    {/* <View className={styles.btn}>取消服务</View> */}
                                    <View className={styles.btn}>结束服务</View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default EndServeies
