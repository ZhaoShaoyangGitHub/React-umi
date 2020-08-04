import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MemberSearchProps, MemberSearchState } from './index.interface'
import styles from './MemberSearch.module.less'
import SearchTop from '../../components/SearchTop'
import NoSearchData from '../../components/NoSearchData'
import { publicImages } from '../../assets/img/load'
import { BASEURL } from '../../config/index'

@connect(({ MemberSearch }) => ({
    ...MemberSearch,
}))
class MemberSearch extends Component<MemberSearchProps, MemberSearchState> {
    config: Config = {
        navigationBarTitleText: '会员搜索',
    }
    constructor(props: MemberSearchProps) {
        super(props)
        this.state = {
            searchText: '',
            pageInfo: {
                currentPageIndex: 1,
                totalPage: 0,
                pageSize: 0,
            },
            memberList: [],
        }
    }

    componentDidMount() {
        this.getMemberList()
    }

    searchMember = (value) => {
        this.setState(
            {
                searchText: value,
            },
            () => {
                this.getMemberList()
            },
        )
    }

    getMemberList = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { searchText, pageInfo } = this.state
        let payload = {
            keyword: '',
            pageIndex: pageInfo.currentPageIndex,
        }
        if (searchText) {
            payload = {
                keyword: searchText,
                pageIndex: pageInfo.currentPageIndex,
            }
        }
        this.props.dispatch({
            type: 'MemberSearch/getVipUser',
            payload,
            cb: (data) => {
                if (data) {
                    const { list, pageIndex, pageSize, totalPage } = data
                    this.setState({
                        memberList: list,
                        pageInfo: {
                            currentPageIndex: pageIndex,
                            pageSize,
                            totalPage,
                        },
                    })
                }
                Taro.hideLoading()
            },
        })
    }

    goMemberDetails = (userId) => {
        Taro.navigateTo({
            url: `/pages/MemberDetails/index?userId=${userId}`,
        })
    }

    render() {
        const { searchText, memberList } = this.state
        return (
            <View className={styles.MemberSearchMain}>
                <SearchTop
                    searchText={searchText}
                    placeholder={'请输入会员名'}
                    onSearchHandle={this.searchMember}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                />
                <View className={styles.memberListWrapper}>
                    <View className={styles.memberList}>
                        {memberList && memberList.length > 0 ? (
                            memberList.map((item) => {
                                const { avatar, area, city, phone, nickName, province, userId } = item
                                return (
                                    <View
                                        className={styles.memberListItem}
                                        key={item.id}
                                        onClick={() => {
                                            this.goMemberDetails(userId)
                                        }}
                                    >
                                        <View className={styles.memberAvatar}>
                                            {avatar && (
                                                <Image
                                                    src={avatar.includes('https://') ? avatar : BASEURL + avatar}
                                                    mode="widthFix"
                                                    className={styles.avatarImg}
                                                />
                                            )}
                                        </View>
                                        <View>
                                            <View className={styles.memberInfo}>
                                                <View className={styles.name}>{nickName}</View>
                                                <View className={styles.phone}>{phone}</View>
                                            </View>
                                            <View className={styles.address}>
                                                <Image
                                                    src={publicImages.addressIcon}
                                                    mode="widthFix"
                                                    className={styles.addressIcon}
                                                />
                                                <View>{city + area}</View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <NoSearchData text="搜索结果" />
                        )}
                    </View>
                </View>
            </View>
        )
    }
}

export default MemberSearch
