import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { SchedulSelectUserProps, SchedulSelectUserState } from './index.interface'
import styles from './SchedulSelectUser.module.less'
import searchIcon from '../../assets/img/select-user/search-icon.png'
import { EmptyImg } from '../../assets/img/load'
import searchClose from '../../assets/img/select-user/search-close.png'
import testAvatar from '../../assets/img/select-user/test-avatar.png'
import { BASEURL } from '../../config'
// import { } from '../../components'

@connect(({ SchedulSelectUser }) => ({
    ...SchedulSelectUser,
}))
class SchedulSelectUser extends Component<SchedulSelectUserProps, SchedulSelectUserState> {
    config: Config = {
        navigationBarTitleText: '选择用户',
    }
    constructor(props: SchedulSelectUserProps) {
        super(props)
        this.state = {
            searchVal: '',
            vipUserList: [],
            pageIndex: 1,
            hasMore: true,
        }
    }

    componentDidMount() {}
    handleInputChange = (e) => {
        this.setState({ searchVal: e.target.value }, () => {
            console.log(this.state.searchVal)
        })
    }
    handleClearInputValue = () => {
        this.setState({ searchVal: '' })
    }
    handleSearch = () => {
        const { searchVal } = this.state
        console.log('开始搜索 调用接口')
        //
        Taro.navigateTo({
            url: '/pages/RegisterUser/index',
        })
    }
    handleBack = () => {
        console.log('返回上一级')
    }
    searchVip = () => {
        this.setState({ pageIndex: 1 }, () => {
            this.getUserList()
        })
    }

    getUserList = () => {
        const { searchVal, pageIndex, vipUserList } = this.state
        this.props.dispatch({
            type: 'SelectUser/searchVipUer',
            params: {
                keyword: searchVal,
                pageIndex,
            },
            cb: (data) => {
                console.log('--->>>', data)
                this.setState({
                    vipUserList: pageIndex === 1 ? data.list : vipUserList.concat(data.list),
                    hasMore: pageIndex < data.totalPage,
                })
            },
        })
    }

    onReachBottom() {
        const { pageIndex, hasMore } = this.state
        if (hasMore) {
            this.setState(
                {
                    pageIndex: pageIndex + 1,
                },
                () => {
                    this.getUserList()
                },
            )
        }
    }

    handleSchedulSelectUser = (id) => {
        console.log(id)
        Taro.navigateTo({
            url: `/pages/PackageSchedul/index?id=${id}`,
        })
    }
    render() {
        const { searchVal, vipUserList } = this.state
        return (
            <View className={styles.SchedulSelectUserMain}>
                <View className={styles.searchBar}>
                    <View className={styles.searchBox}>
                        <Image className={styles.searchIcon} src={searchIcon} />
                        <Input
                            className={styles.searchInput}
                            onInput={this.handleInputChange}
                            value={searchVal}
                            placeholder="请输入客户姓名或电话"
                            onConfirm={this.searchVip}
                        />
                        {searchVal && (
                            <Image
                                onClick={this.handleClearInputValue}
                                className={styles.searchIcon}
                                src={searchClose}
                            />
                        )}
                    </View>
                </View>
                <View className={styles.searchResult}>
                    {vipUserList.length > 0 &&
                        vipUserList.map((item, index) => {
                            return (
                                <View
                                    key={item.id}
                                    className={styles.resultItem}
                                    onClick={() => this.handleSchedulSelectUser(item.userId)}
                                >
                                    <View className={styles.userAvatar}>
                                        <Image
                                            className={styles.avatar}
                                            src={item.avatar ? BASEURL + JSON.parse(item.avatar).file : testAvatar}
                                        />
                                    </View>
                                    <View className={styles.userInfo}>
                                        <View className={styles.top}>
                                            <View className={styles.left}>{item.nickName}</View>
                                            <View className={styles.right}>{item.phone}</View>
                                        </View>
                                        <View className={styles.bottom}>
                                            <View className={styles.location}>
                                                {item.province} {item.city}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}

                    {vipUserList.length === 0 && (
                        <View className={styles.NoSearchDataMain}>
                            <View className={styles.noData}>
                                <Image className={styles.noShopBgImg} src={EmptyImg.emptySearch} />
                                <View className={styles.noDataDesc}>暂无套餐排期</View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default SchedulSelectUser
