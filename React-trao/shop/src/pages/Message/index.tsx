import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { MessageProps, MessageState } from './index.interface'
import styles from './Message.module.less'
import NoSearchData from '../../components/NoSearchData'
import { timestampToTime } from '../../utils/function'

@connect(({ Message }) => ({
    ...Message,
}))
class Message extends Component<MessageProps, MessageState> {
    config: Config = {
        navigationBarTitleText: '消息',
    }
    constructor(props: MessageProps) {
        super(props)
        this.state = {
            current: 0,
            messageCategoryList: [
                {
                    title: '预约提醒',
                    max: 99,
                },
                {
                    title: '支付提醒',
                    max: 99,
                },
                // {
                //     title: '日期提醒',
                //     max: 99,
                // },
            ],
            messageList: [],
        }
    }

    componentDidMount() {
        this.getMessageNumber()
        this.getMessageData()
    }

    handleClick = (value) => {
        if (value === this.state.current) return
        this.setState(
            {
                current: value,
            },
            () => {
                this.getMessageData()
            },
        )
    }

    getMessageNumber = () => {
        let { messageCategoryList } = this.state
        this.props.dispatch({
            type: 'Message/getMessageNumber',
            payload: {
                type: this.state.current + 1,
            },
            cb: (data) => {
                if (data && data.length > 0) {
                    data.map((item) => {
                        messageCategoryList[item.type - 1].text = item.number
                    })
                    this.setState({
                        messageCategoryList,
                    })
                }
            },
        })
    }

    getMessageData = () => {
        this.setState({
            messageList: [],
        })
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        let { messageList } = this.state
        this.props.dispatch({
            type: 'Message/getMessageData',
            payload: {
                type: this.state.current + 1,
            },
            cb: (data) => {
                if (data && data.length > 0) {
                    messageList = data
                }
                this.setState({
                    messageList,
                })
                Taro.hideLoading()
            },
        })
    }

    goOrderDetail = (id) => {
        Taro.navigateTo({
            url: `/pages/OrderDetails/index?tradeId=${id}`,
        })
    }

    handleMakeCall = (shopPhoneNum) => {
        Taro.makePhoneCall({
            phoneNumber: shopPhoneNum + '',
        }).then((res) => {})
    }

    render() {
        const { current, messageCategoryList, messageList } = this.state

        return (
            <View className={styles.MessageMain}>
                <View className={styles.fixedTab}>
                    <AtTabBar
                        current={current}
                        tabList={messageCategoryList}
                        onClick={this.handleClick.bind(this)}
                    ></AtTabBar>
                </View>
                <View className={styles.MessageWrapper}>
                    {messageList && messageList.length > 0 ? (
                        <View className={styles.messageList}>
                            {messageList.map((item) => {
                                return (
                                    <View className={styles.messageListItem} key={item.id}>
                                        <View className={styles.title}>{item.title}</View>
                                        <View className={styles.text}>联系电话：{item.phone}</View>
                                        <View className={styles.text}>
                                            原开始时间：{item.time && timestampToTime(item.time)}
                                        </View>
                                        <View className={styles.text}>服务项目：{item.projectName}</View>
                                        {current === 1 && item.domainId && (
                                            <View
                                                className={styles.messageBtn}
                                                onClick={() => {
                                                    this.goOrderDetail(item.domainId)
                                                }}
                                            >
                                                查看详情
                                            </View>
                                        )}
                                        {current === 0 && item.type === 1 && (
                                            <View
                                                className={styles.messageBtn}
                                                onClick={() => {
                                                    this.handleMakeCall(item.phone)
                                                }}
                                            >
                                                拨打电话
                                            </View>
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <NoSearchData type="消息" />
                    )}
                </View>
            </View>
        )
    }
}

export default Message
