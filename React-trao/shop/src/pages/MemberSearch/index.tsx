import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { MemberSearchProps, MemberSearchState } from './index.interface'
import styles from './MemberSearch.module.less'
import SearchTop from '../../components/SearchTop'
import NoSearchData from '../../components/NoSearchData'
import { publicImages } from '../../assets/img/load'
import { BASEURL } from '../../config/index'
import moment from 'moment'

@connect(({ MemberSearch }) => ({
    ...MemberSearch,
}))
class MemberSearch extends Component<MemberSearchProps, MemberSearchState> {
    config: Config = {
        navigationBarTitleText: '我的会员',
    }
    articleCategoryList: any = [{ title: '全部' }, { title: '预约' }, { title: '冬眠' }, { title: '特定' }]
    appointmentList: any = [{ title: '全部预约' }, { title: '未赴约' }]
    hibernationList: any = [{ title: '短期' }, { title: '长期' }]
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
            current: 0, //类型{1:全部(全部时 不传type),2:预约,3:冬眠,4:待定}
            appointmentType: 0, //预约类型{1:全部预约,2:未赴约}
            hibernationType: 0, //冬眠类型{1:短期,2:长期}
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

    getOtherMemberList = () => {
        const { current, pageInfo, appointmentType, hibernationType } = this.state
        Taro.showLoading({
            title: '加载中',
        })
        this.props.dispatch({
            type: 'MemberSearch/getAppointmentRecord',
            payload: {
                type: current + 1,
                appointmentType: appointmentType + 1,
                hibernationType: hibernationType + 1,
                pageIndex: pageInfo.currentPageIndex,
            },
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

    handleClick = (value) => {
        if (value === this.state.current) return
        this.setState(
            {
                current: value,
                appointmentType: 0,
                hibernationType: 0,
                memberList: [],
                pageInfo: {
                    currentPageIndex: 1,
                    totalPage: 0,
                    pageSize: 0,
                },
            },
            () => {
                if (this.state.current === 0) {
                    this.getMemberList()
                } else {
                    this.getOtherMemberList()
                }
            },
        )
    }

    handleAppointmentClick = (value) => {
        if (value === this.state.appointmentType) return
        this.setState(
            {
                appointmentType: value,
                memberList: [],
                pageInfo: {
                    currentPageIndex: 1,
                    totalPage: 0,
                    pageSize: 0,
                },
            },
            () => {
                this.getOtherMemberList()
            },
        )
    }

    handleHibernationClick = (value) => {
        if (value === this.state.hibernationType) return
        this.setState(
            {
                hibernationType: value,
                memberList: [],
                pageInfo: {
                    currentPageIndex: 1,
                    totalPage: 0,
                    pageSize: 0,
                },
            },
            () => {
                this.getOtherMemberList()
            },
        )
    }

    handleMakeCall = (phone) => {
        Taro.makePhoneCall({
            phoneNumber: phone + '',
        }).then((res) => {})
    }

    render() {
        const { searchText, memberList, current, appointmentType, hibernationType } = this.state
        return (
            <View className={styles.MemberSearchMain}>
                <View className={styles.fixedTab}>
                    <AtTabs
                        current={current}
                        tabList={this.articleCategoryList}
                        onClick={this.handleClick.bind(this)}
                    ></AtTabs>
                </View>
                {current === 0 ? (
                    <View className={styles.memberListWrapper}>
                        <view className={styles.searchBox}>
                            <SearchTop
                                searchText={searchText}
                                placeholder={'请输入会员名'}
                                onSearchHandle={this.searchMember}
                            />
                        </view>
                        <View className={styles.memberList}>
                            {memberList && memberList.length > 0 ? (
                                memberList.map((item) => {
                                    const { avatar, area, city, phone, nickName, userId } = item
                                    return (
                                        <View
                                            className={styles.memberListItem}
                                            key={item.userId}
                                            onClick={() => {
                                                this.goMemberDetails(userId)
                                            }}
                                        >
                                            <View className={styles.memberAvatar}>
                                                {avatar && (
                                                    <Image
                                                        src={
                                                            avatar.includes('https://')
                                                                ? avatar.startsWith('http')
                                                                    ? avatar
                                                                    : JSON.parse(avatar).file
                                                                : BASEURL + JSON.parse(avatar).file
                                                        }
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
                                                        src={publicImages.locationIcon}
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
                                <NoSearchData type="搜索结果" />
                            )}
                        </View>
                    </View>
                ) : (
                    <View className={styles.otherWrapper}>
                        {current === 1 && (
                            <AtTabs
                                current={appointmentType}
                                tabList={this.appointmentList}
                                onClick={this.handleAppointmentClick.bind(this)}
                            ></AtTabs>
                        )}
                        {current === 2 && (
                            <AtTabs
                                current={hibernationType}
                                tabList={this.hibernationList}
                                onClick={this.handleHibernationClick.bind(this)}
                            ></AtTabs>
                        )}
                        {memberList && memberList.length > 0 ? (
                            <View className={styles.memberListWrapper}>
                                <View className={styles.memberList}>
                                    {memberList.map((item) => {
                                        const { avatar, nickName, phone, serviceName, serviceTime } = item
                                        return (
                                            <View className={styles.memberListItem} key={item.userId}>
                                                <View className={styles.memberAvatar}>
                                                    {avatar && (
                                                        <Image
                                                            src={
                                                                avatar.includes('https://')
                                                                    ? avatar.startsWith('http')
                                                                        ? avatar
                                                                        : JSON.parse(avatar).file
                                                                    : BASEURL + JSON.parse(avatar).file
                                                            }
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
                                                    <View className={styles.otherInfo}>
                                                        {current !== 2 && <View>服务项目：{serviceName}</View>}
                                                        <View>
                                                            服务时间：
                                                            {serviceTime &&
                                                                moment(serviceTime).format('YYYY-MM-DD HH:mm')}
                                                        </View>
                                                    </View>
                                                    {phone && (
                                                        <View
                                                            className={styles.shopPhone}
                                                            onClick={(e) => this.handleMakeCall(phone)}
                                                        >
                                                            拨打电话
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        ) : (
                            <NoSearchData type="搜索结果" />
                        )}
                    </View>
                )}
            </View>
        )
    }
}

export default MemberSearch
