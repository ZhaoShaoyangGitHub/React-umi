import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtModal } from 'taro-ui'
import { SelectUserProps, SelectUserState } from './index.interface'
import NoSearchData from '../../components/NoSearchData/index'
import InfoModel from '../../components/InfoModel'
import styles from './SelectUser.module.less'
import searchIcon from '../../assets/img/select-user/search-icon.png'
import searchClose from '../../assets/img/select-user/search-close.png'
import testAvatar from '../../assets/img/select-user/test-avatar.png'
import { BASEURL } from '../../config'

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
            mobile: '',
            searchVal: '',
            vipUserList: [],
            type: 'placeOrder', // suspendPackage 暂停套餐    placeOrder 帮助用户下单   refundOrder 订单退款   transferPackage 套餐转让
            isShowRegisterModal: false,
            isCompleted: false,
            oldUserId: 0,
        }
    }

    componentDidShow() {
        const { type, oldUserId } = this.$router.params
        this.setState({
            type,
            oldUserId: Number.parseInt(oldUserId, 10) || 0,
        })
    }
    handleInputChange = (e) => {
        this.setState({ searchVal: e.target.value }, () => {
            console.log(this.state.searchVal)
        })
    }
    handleClearInputValue = () => {
        this.setState({ searchVal: '' })
    }
    handleSearch = () => {
        this.setState({
            isShowRegisterModal: true,
        })
        // const { searchVal } = this.state
        // console.log('开始搜索 调用接口')
        // //
        // Taro.navigateTo({
        //     url: '/pages/RegisterUser/index',
        // })
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
            cb: (data) => {
                console.log('--->>>', data)
                if (data) {
                    this.setState({ vipUserList: data.list })
                } else {
                    this.setState({ vipUserList: [] })
                }
            },
        })
    }
    handleSelectUser = (ind) => {
        const { vipUserList } = this.state
        this.goToPage(vipUserList[ind].userId)
    }
    // 选择用户后跳转
    goToPage = (userId) => {
        const { type, oldUserId } = this.state
        const { orderId } = this.$router.params
        console.log(orderId)

        switch (type) {
            case 'suspendPackage': {
                Taro.navigateTo({
                    url: `/pages/SelectPackage/index?type=suspendPackage&userId=${userId}`,
                })
            }
            case 'placeOrder': {
                // 帮助用户搭配下单
                Taro.navigateTo({
                    url: `/pages/GoodList/index?userId=${userId}`,
                })
            }
            case 'refundOrder': {
                Taro.navigateTo({
                    url: `/pages/SelectPackage/index?type=refundOrder&userId=${userId}`,
                })
            }
            case 'transferPackage': {
                // 套餐转让
                Taro.navigateTo({
                    url: `/pages/TransferPackage/index?userId=${userId}&oldUserId=${oldUserId}&orderId=${orderId}`,
                })
            }
            default: {
                break
            }
        }
    }
    hideModal = () => {
        this.setState({
            isShowRegisterModal: false,
        })
    }
    // 注册
    handleRegister = () => {
        const { mobile } = this.state
        this.props.dispatch({
            type: 'SelectUser/register',
            params: {
                mobile: mobile,
            },
            cb: (data) => {
                this.setState(
                    {
                        isCompleted: true,
                        isShowRegisterModal: false,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                isCompleted: false,
                            })
                            this.goToPage(data.userId)
                        }, 2000)
                    },
                )
            },
        })
    }
    // 获取注册成功弹窗文案
    getRegisterModalText = () => {
        const { type } = this.state
        switch (type) {
            case 'suspendPackage': {
                return '选择套餐'
            }
            case 'placeOrder': {
                // 帮助用户搭配下单
                return '开始下单'
            }
            case 'refundOrder': {
                // 订单退款
                return '选择套餐'
            }
            case 'transferPackage': {
                // 订单退款
                return '开始转让'
            }
            default: {
                break
            }
        }
    }

    render() {
        const { searchVal, vipUserList, mobile, isCompleted, isShowRegisterModal } = this.state
        return (
            <View className={styles.SelectUserMain}>
                <View className={styles.searchBar}>
                    <View className={styles.searchBox}>
                        <Image className={styles.searchIcon} src={searchIcon} />
                        <Input
                            className={styles.searchInput}
                            onInput={this.handleInputChange}
                            value={searchVal}
                            placeholder="请输入要查找的会员名称"
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
                    <View className={styles.searchBtn} style={{ color: '#B365B7' }} onClick={this.handleSearch}>
                        注册
                    </View>
                    {/* <View className={styles.searchBtn} style={{ color: '#B365B7' }} onClick={this.searchVip}>
                        搜索
                    </View> */}
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
                {vipUserList.length > 0 ? (
                    <View className={styles.searchResult}>
                        {vipUserList.map((item, index) => {
                            return (
                                <View
                                    key={item.id}
                                    className={styles.resultItem}
                                    onClick={this.handleSelectUser.bind(this, index)}
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
                    </View>
                ) : (
                    <NoSearchData type={'用户'} />
                )}

                <AtModal isOpened={isShowRegisterModal} onClose={this.hideModal} className={styles.modal}>
                    <View className={styles.header}>注册</View>
                    <View className={styles.inputBlock}>
                        <Text>手机号</Text>
                        <Input
                            type="number"
                            value={mobile}
                            onInput={(e) => {
                                this.setState({
                                    mobile: e.detail.value,
                                })
                            }}
                        />
                    </View>
                    <View className={styles.button} onClick={this.handleRegister}>
                        确认
                    </View>
                </AtModal>
                {isCompleted && <InfoModel title="注册成功" content={this.getRegisterModalText()} />}
            </View>
        )
    }
}

export default SelectUser
