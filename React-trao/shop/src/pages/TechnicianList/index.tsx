import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import testAvatar from '../../assets/img/test/test.png'
import { TechnicianListProps, TechnicianListState } from './index.interface'
import styles from './TechnicianList.module.less'
import { BASEURL } from '../../config'

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
        }
    }

    componentDidShow = () => {
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
                type: 'TechnicianList/getpageList',
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

    handleToDetail = (id: number) => {
        Taro.navigateTo({
            url: `/pages/TechnicianDetail/index?id=${id}`,
        })
    }

    handleToAdd = () => {
        Taro.navigateTo({
            url: `/pages/TechnicianOperation/index?id=${null}`,
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
        const { showList } = this.state
        return (
            <View className={styles.TechnicianListMain}>
                <View className={styles.content}>
                    {showList.map((item) => {
                        return (
                            <View className={styles.technicianItem} key={item.userId}>
                                <View className={styles.left} onClick={() => this.handleToDetail(item.userId)}>
                                    <Image src={item.avatar ? BASEURL + JSON.parse(item.avatar).file : testAvatar} />
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
