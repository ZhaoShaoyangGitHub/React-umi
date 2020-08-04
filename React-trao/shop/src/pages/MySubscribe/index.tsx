import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MySubscribeProps, MySubscribeState } from './index.interface'
import styles from './MySubscribe.module.less'
import SearchTop from '../../components/SearchTop'
import NoSearchData from '../../components/NoSearchData'
import { BASEURL } from '../../config/index'

@connect(({ MySubscribe }) => ({
    ...MySubscribe,
}))
class MySubscribe extends Component<MySubscribeProps, MySubscribeState> {
    config: Config = {
        navigationBarTitleText: '开始服务',
    }
    constructor(props: MySubscribeProps) {
        super(props)
        this.state = {
            showList: [],
            isFetching: false,
            keyword: '',
            pageIndex: 1,
            hasMore: true,
        }
    }

    componentDidShow = () => {
        this.getPageList()
    }

    onReachBottom = () => {
        const { pageIndex, hasMore } = this.state
        if (hasMore) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getPageList()
                },
            )
        }
    }

    searchMember = (value) => {
        if (this.state.keyword === value) return
        this.setState(
            {
                keyword: value,
                pageIndex: 1,
            },
            () => {
                this.getPageList()
            },
        )
    }

    getPageList = () => {
        const { isFetching, pageIndex, keyword, showList } = this.state
        Taro.showLoading({ title: '加载中', mask: true })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'MySubscribe/getPageList',
                params: { pageIndex, isAppointment: 1, keyword, status: 1 },
                cb: (data) => {
                    Taro.hideLoading()
                    if (data && data.list && Array.isArray(data.list)) {
                        this.setState({ showList: pageIndex === 1 ? data.list : showList.concat(data.list) })
                    }
                    if (data) {
                        this.setState({ hasMore: pageIndex < data.totalPage })
                    }
                    this.setState({ isFetching: false })
                    console.log(data)
                },
            })
        }
    }
    render() {
        const { showList, keyword } = this.state
        return (
            <View className={styles.MySubscribeMain}>
                <View className={styles.topBox}>
                    <SearchTop
                        searchText={keyword}
                        placeholder={'请输入会员账号'}
                        onSearchHandle={this.searchMember}
                        isShowBack={false}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                    />
                </View>

                <View className={styles.content}>
                    {showList.map((item) => {
                        return (
                            <View
                                key={item.id}
                                className={styles.contentItem}
                                onClick={() => this.handleSwitchToDetail(item.id)}
                            >
                                <View className={styles.leftAvatar}>
                                    {item.avatar && (
                                        <Image
                                            src={
                                                item.avatar.includes('https://')
                                                    ? item.avatar.startsWith('http')
                                                        ? item.avatar
                                                        : JSON.parse(item.avatar).file
                                                    : BASEURL + JSON.parse(item.avatar).file
                                            }
                                            className={styles.avatarImage}
                                        />
                                    )}
                                </View>
                                <View className={styles.rightInfo}>
                                    <View className={styles.titleItem}>
                                        <View className={styles.left}>{item.userName}</View>
                                        <View className={styles.right}>{item.userPhone}</View>
                                    </View>
                                    {item.isAppointment.value === 1 && (
                                        <View className={styles.infoItem}>
                                            <View className={styles.key}>预约时间：</View>
                                            {item.schedulingTime && (
                                                <View className={styles.val}>
                                                    {moment(item.schedulingTime).format('YYYY-MM-DD HH:mm')}
                                                </View>
                                            )}
                                        </View>
                                    )}

                                    <View className={styles.infoItem}>
                                        <View className={styles.key}>服务项目：</View>
                                        <View className={styles.val}>
                                            {item.projectSchedulingResponses[0]
                                                ? item.projectSchedulingResponses[0].packageProjectName
                                                : null}
                                        </View>
                                    </View>

                                    <View className={styles.infoItem}>
                                        <View className={styles.key}>备注：</View>
                                        <View className={styles.val}>{item.remake || '-'}</View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                {!showList.length && <NoSearchData type="数据" />}
            </View>
        )
    }
    handleSelect = () => {
        this.setState({ pageIndex: 1 }, () => {
            this.getPageList()
        })
    }
    handleSwitchToDetail = (id: number) => {
        console.log(id)
        Taro.navigateTo({
            url: `/pages/DateDetail/index?id=${id}`,
        })
    }
}

export default MySubscribe
