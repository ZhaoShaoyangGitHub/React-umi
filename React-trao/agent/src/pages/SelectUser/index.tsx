import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { SelectUserProps, SelectUserState } from './index.interface'
import styles from './SelectUser.module.less'
import searchIcon from '../../assets/img/select-user/search-icon.png'
import searchClose from '../../assets/img/select-user/search-close.png'
import testAvatar from '../../assets/img/select-user/test-avatar.png'
// import { } from '../../components'

@connect(({ SelectUser }) => ({
    ...SelectUser,
}))
class SelectUser extends Component<SelectUserProps, SelectUserState> {
    config: Config = {
        navigationBarTitleText: '选择用户',
    }
    constructor(props: SelectUserProps) {
        super(props)
        this.state = {
            searchVal: '',
            vipUserList: [],
        }
    }

    componentDidMount() {}
    handleInputChange = e => {
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
        const { searchVal } = this.state
        this.props.dispatch({
            type: 'SelectUser/searchVipUer',
            params: {
                keyword: searchVal,
                pageIndex: 1,
            },
            cb: data => {
                console.log('--->>>', data)
                this.setState({ vipUserList: data.list })
            },
        })
    }
    handleSelectUser = ind => {
        const { vipUserList } = this.state

        const pages = Taro.getCurrentPages()
        const prevPage = pages[pages.length - 2] //上一个页面
        prevPage.setData({
            regdata: vipUserList[ind],
        })
        Taro.navigateBack({
            delta: 1, // 返回上一级页面
        })
    }
    render() {
        const { searchVal, vipUserList } = this.state
        return (
            <View className={styles.SelectUserMain}>
                <View className={styles.searchBar}>
                    <View className={styles.searchBox}>
                        <Image className={styles.searchIcon} src={searchIcon} />
                        <Input
                            className={styles.searchInput}
                            onInput={this.handleInputChange}
                            value={searchVal}
                            placeholder='请输入要查找的会员名称'
                            onConfirm={this.searchVip}
                        />
                        {searchVal && 
                            <Image
                                onClick={this.handleClearInputValue}
                                className={styles.searchIcon}
                                src={searchClose}
                            />
                        }
                    </View>
                    <View className={styles.searchBtn} style={{ color: '#B365B7' }} onClick={this.handleSearch}>
                        注册
                    </View>
                    <View className={styles.searchBtn} style={{ color: '#B365B7' }} onClick={this.searchVip}>
                        搜索
                    </View>
                    {/* {searchVal ? (
                        <View className={styles.searchBtn} onClick={this.handleSearch}>
                            搜索
                        </View>
                    ) : (
                        <View className={styles.searchBtn} onClick={this.handleBack}>
                            取消
                        </View>
                    )} */}
                </View>
                <View className={styles.searchResult}>
                    {vipUserList.map((item, index) => {
                        return (
                            <View
                                key={item.id}
                                className={styles.resultItem}
                                onClick={this.handleSelectUser.bind(this, index)}
                            >
                                <View className={styles.userAvatar}>
                                    <Image className={styles.avatar} src={item.avatar ? item.avatar : testAvatar} />
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
                </View>
            </View>
        )
    }
}

export default SelectUser
