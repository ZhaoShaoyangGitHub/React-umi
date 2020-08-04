import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image, Input, Switch, Text } from '@tarojs/components'
import { AtModal, AtModalHeader } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { DateDetailProps, DateDetailState } from './index.interface'
import styles from './DateDetail.module.less'
import testAvatar from '../../assets/img/test/test.png'
import upIcon from '../../assets/img/up.png'
import findMore from '../../assets/img/find-more.png'
import { BASEURL } from '../../config'

@connect(({ DateDetail }) => ({
    ...DateDetail,
}))
class DateDetail extends Component<DateDetailProps, DateDetailState> {
    config: Config = {
        navigationBarTitleText: '排期详情',
    }
    constructor(props: DateDetailProps) {
        super(props)
        this.state = {
            selector: ['美国', '中国', '巴西', '日本'],
            isOneShopping: true,
            schedulingRecordId: 0,
            selectorChecked: '',
            isAnimation: false,
            tagList: [],
            tagInputVal: '', // 标签
            tagModal: false,
            isFootSoak: false, // 是否泡脚
            eatInfo: {
                nowBreakfast: '', // 今日早餐
                nowLunch: '', // 今日午餐
                nowSupper: '', // 今日晚餐
                yesterdayBreakfast: '', // 昨日早餐
                yesterdayLunch: '', // 昨日午餐
                yesterdaySupper: '', // 昨日晚餐
                weight: '',
            },
            itemInfo: {
                orderProjectRecordResponses: [
                    {
                        serviceRecordResponses: [],
                    },
                ],
            },
        }
    }

    componentDidShow() {
        const { id } = this.$router.params
        this.setState({
            schedulingRecordId: Number.parseInt(id, 10) || 0,
        })
        this.props.dispatch({
            type: 'DateDetail/getSchedulingDetail',
            params: { id },
            callback: (data) => {
                this.setState(
                    {
                        itemInfo: data,
                    },
                    () => {
                        this.isNewUser(data.userId)
                    },
                )
            },
        })
    }

    // 是否为新用户
    isNewUser = (userId) => {
        this.props.dispatch({
            type: 'OrderConfirm/userJudgeOneTrade',
            params: { userId },
            cb: (code, data, message) => {
                if (code === 'OK') {
                    this.setState({ isOneShopping: data.isOneShopping === 1 })
                }
            },
        })
    }

    handleTagInput = (e) => {
        this.setState({
            tagInputVal: e.target.value,
        })
    }

    handleInfoInput = (e, key) => {
        const { eatInfo } = this.state
        this.setState({
            eatInfo: {
                ...eatInfo,
                [key]: e.target.value,
            },
        })
    }

    handleTransAnimation = () => {
        this.setState({ isAnimation: !this.state.isAnimation })
    }

    // 跳转身体信息编辑页面
    handleToBodyInfo = () => {
        const { itemInfo } = this.state
        Taro.navigateTo({
            url: `/pages/EditInfo/index?id=${itemInfo.userId}`,
        })
    }

    // 健康档案
    handleToProfileInfo = () => {
        Taro.navigateTo({
            url: '/pages/EditProfile/index',
        })
    }
    // 添加标签
    handleAddTag = (val: string) => {
        const { tagList } = this.state
        if (val === '') {
            Taro.showToast({
                title: '请输入标签内容！',
                icon: 'none',
            })
            return
        }
        let newList = tagList
        for (let i = 0; i < newList.length; i++) {
            if (val === newList[i]) return
        }

        newList.push(val)
        this.setState({
            tagList: newList,
            tagInputVal: '',
            tagModal: false,
        })
    }

    // 删除标签
    handleDeleteTag = (val: string) => {
        const { tagList } = this.state
        let newList = tagList
        let tagIndex = 0
        newList.forEach((item, index) => {
            if (item === val) {
                tagIndex = index
            }
        })
        newList.splice(tagIndex, 1)
        this.setState({
            tagList: newList,
        })
    }

    render() {
        const { tagInputVal, isOneShopping, isAnimation, tagModal, tagList, isFootSoak, itemInfo } = this.state
        return (
            <View className={styles.DateDetailMain}>
                <View className={styles.top}>
                    <View className={styles.userInfo}>
                        <Image
                            src={itemInfo.avatar ? BASEURL + JSON.parse(itemInfo.avatar).file : testAvatar}
                            className={styles.leftAvatar}
                        />
                        <View className={styles.rightInfo}>
                            <View className={styles.titleItem}>
                                <View className={styles.left}>{itemInfo.userName}</View>
                                <View className={styles.right}>{itemInfo.userPhone}</View>
                            </View>
                            {itemInfo.weight && (
                                <View className={styles.infoItem}>
                                    <View className={styles.key}>上次体重：</View>
                                    <View className={styles.val}>{itemInfo.weight}kg</View>
                                </View>
                            )}
                        </View>
                    </View>

                    {isOneShopping && (
                        <View className={styles.pickerBox} onClick={this.handleToBodyInfo}>
                            <View className={styles.title}>个人档案</View>
                            <Image src={findMore} className={styles.pickBtn} />
                        </View>
                    )}
                    {isOneShopping && (
                        <View className={styles.pickerBox} onClick={this.handleToProfileInfo}>
                            <View className={styles.title}>健康档案</View>
                            <Image src={findMore} className={styles.pickBtn} />
                        </View>
                    )}
                </View>
                <View className={styles.titlebar}>
                    <View className={styles.leftline} />
                    <View className={styles.title}>当前套餐</View>
                </View>

                <View className={styles.packageInfo} onClick={this.handleTransAnimation}>
                    {/* <View className={styles.packageImg}>
                        <Image
                            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3753571868,2154753959&fm=26&gp=0.jpg"
                            className={styles.packageimg}
                        />
                    </View> */}
                    <View className={styles.rightBox}>
                        <View className={styles.title}>{itemInfo.orderProjectRecordResponses[0].projectName}</View>
                        <View className={styles.detail}>
                            {itemInfo.orderProjectRecordResponses[0].appointmentTime &&
                                moment(itemInfo.orderProjectRecordResponses[0].appointmentTime).format(
                                    'YYYY-MM-DD HH:mm',
                                )}{' '}
                            第{itemInfo.orderProjectRecordResponses[0].usedNumber}次服务
                        </View>
                    </View>
                    <Image
                        src={upIcon}
                        style={isAnimation ? { transform: 'rotate(180deg)' } : {}}
                        className={styles.icon}
                    />
                </View>
                <View className={styles.detailBox} style={isAnimation ? { height: '0rpx' } : {}}>
                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>本次体重</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'weight')}
                                placeholder="请填写本次体重"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                        <View className={styles.right}>kg</View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>昨日早餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'yesterdayBreakfast')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>昨日午餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'yesterdayLunch')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>昨日晚餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'yesterdaySupper')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>今日早餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'nowBreakfast')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>今日午餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'nowLunch')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.keyvalBox}>
                        <View className={styles.title}>今日晚餐</View>
                        <View className={styles.middle}>
                            <Input
                                type="text"
                                value=""
                                onInput={(e) => this.handleInfoInput(e, 'nowSupper')}
                                placeholder="请填写昨日饮食"
                                className={styles.sourceInput}
                                placeholderClass={styles.placeholder}
                            />
                        </View>
                    </View>

                    <View className={styles.singleCelectBox}>
                        <View className={styles.title}>是否泡脚</View>
                        <View className={styles.right}>
                            <View className={styles.value}>{isFootSoak ? '是' : '否'}</View>
                            <View className={styles.switch}>
                                <Switch checked={isFootSoak} onChange={(e) => this.handleChange(e)} />
                            </View>
                        </View>
                    </View>

                    <View className={styles.whiteline} />

                    <View className={styles.whiteline} />
                    {itemInfo.orderProjectRecordResponses[0].serviceRecordResponses.length > 0 && (
                        <View className={styles.table}>
                            <View className={styles.thead}>
                                <View className={styles.title}>次数</View>
                                <View className={styles.title}>体重/kg</View>
                                <View style={{ flex: '1' }} className={`${styles.title} ${styles.long}`}>
                                    记录日期
                                </View>
                                <View className={styles.title}>记录人</View>
                            </View>

                            {itemInfo.orderProjectRecordResponses[0].serviceRecordResponses.map((item, index) => (
                                <View className={styles.tbody}>
                                    <View className={styles.title}>
                                        {itemInfo.orderProjectRecordResponses[0].serviceRecordResponses.length - index}
                                    </View>
                                    <View className={styles.title}>{item.weight}</View>
                                    <View style={{ flex: '1' }} className={`${styles.title} ${styles.long}`}>
                                        {moment(item.startTime).format('YYYY-MM-DD HH:mm')}
                                    </View>
                                    <View className={styles.title}>{item.staffUserName}</View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* -------------------------------------------------------------------------------------------------------------------- */}
                {/* <View className={styles.packageInfo} style={{ marginTop: '40rpx' }}>
                    <Image
                        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3753571868,2154753959&fm=26&gp=0.jpg"
                        className={styles.packageimg}
                    />
                    <View className={styles.rightBox}>
                        <View className={styles.title}>针灸减肥</View>
                        <View className={styles.detail}>2019-04-20 14:00 第二次服务</View>
                    </View>
                    <Image src={upIcon} className={styles.icon} />
                </View> */}

                <View
                    className={styles.pickerBox}
                    onClick={this.handleToBodyInfo}
                    style={{ backgroundColor: '#f9f9f9' }}
                >
                    <View className={styles.title}>身体信息</View>
                    <Image src={findMore} className={styles.pickBtn} />
                </View>

                <View className={styles.tagInputBox}>
                    {/* <Input
                        type="text"
                        value=""
                        onInput={(e) => this.handleInput(e)}
                        placeholder="请选择/输入"
                        className={styles.tagInput}
                        placeholderClass={styles.tagInputplaceholder}
                    /> */}
                    <View className={styles.tagList}>
                        {tagList.map((item) => (
                            <View className={styles.tagItem}>
                                <Text>{item}</Text>
                                <Text onClick={() => this.handleDeleteTag(item)}>X</Text>
                            </View>
                        ))}
                    </View>
                    <View
                        className={styles.addtagBtn}
                        onClick={() => {
                            this.setState({
                                tagModal: true,
                            })
                        }}
                    >
                        + 添加
                    </View>
                </View>

                {/* <View className={styles.tags}>
                    <View
                        className={styles.tagitem}
                        onClick={() => {
                            this.handleAddTag('怕痒')
                        }}
                    >
                        怕痒
                    </View>
                    <View className={styles.tagitem}>身体敏感</View>
                    <View className={styles.tagitem}>怕痒</View>
                </View> */}

                <View className={styles.submitBtn} onClick={this.handleMessionStart}>
                    开始服务
                </View>

                <AtModal
                    isOpened={tagModal}
                    onClose={() => {
                        this.setState({
                            tagModal: false,
                        })
                    }}
                >
                    <View className={styles.modalContent}>
                        <Text className={styles.header}>添加标签</Text>
                        <Input
                            type="text"
                            value={tagInputVal}
                            onInput={(e) => this.handleTagInput(e)}
                            placeholder=""
                            className={styles.tagInput}
                            placeholderClass={styles.tagInputplaceholder}
                        />
                        <Text className={styles.confirmButton} onClick={() => this.handleAddTag(tagInputVal)}>
                            确认
                        </Text>
                    </View>
                </AtModal>
            </View>
        )
    }

    handleMessionStart = () => {
        const { isFootSoak, eatInfo, tagList, itemInfo, schedulingRecordId } = this.state
        this.props.dispatch({
            type: 'DateDetail/startService',
            params: {
                ...eatInfo,
                isFootSoak: isFootSoak ? 1 : 0,
                tags: tagList.join(','),
                packageProjectId: itemInfo.orderProjectRecordResponses[0].projectId,
                packageProjectName: itemInfo.orderProjectRecordResponses[0].projectName,
                packageId: itemInfo.packageId,
                packageName: itemInfo.packageName,
                schedulingRecordId,
            },
            callback: (data) => {
                Taro.navigateTo({
                    url: '/pages/EndServeies/index',
                })
            },
        })
    }
    bindPickerChange = (e) => {
        this.setState({
            selectorChecked: this.state.selector[e.detail.value],
        })
    }
    handleChange = (e) => {
        this.setState({ isFootSoak: e.target.value })
    }
}

export default DateDetail
