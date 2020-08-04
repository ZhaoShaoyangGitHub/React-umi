import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Switch, Picker, Textarea, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Titlesession from '../../components/Titlesession'
import level_icon from '../../assets/img/level.png'
import active_level_icon from '../../assets/img/active_level.png'
import { BASEURL } from '../../config/index'
import { AddCommentProps, AddCommentState } from './index.interface'
import styles from './AddComment.module.less'

@connect(({ AddComment }) => ({
    ...AddComment,
}))
class AddComment extends Component<AddCommentProps, AddCommentState> {
    config: Config = {
        navigationBarTitleText: '服务评价',
    }
    constructor(props: AddCommentProps) {
        super(props)
        this.state = {
            comment: '',
            level: 0,
            domainId: 0,
            levelText: '',
            commentType: 1, // 2 服务   1 订单
            technicianInfo: {
                avatar: '',
                name: '',
                phone: '',
            },
            commentId: 0,
        }
    }

    componentDidMount() {
        const { commentType, id } = this.$router.params
        this.setState(
            {
                commentType: Number.parseInt(commentType, 10) || 1,
                domainId: Number.parseInt(id, 10) || 0,
            },
            () => {
                this.getCommentInfo()
                this.getTechnicianInfo()
            },
        )
    }

    // 获取评论信息
    getCommentInfo = () => {
        const { commentType, domainId } = this.state
        this.props.dispatch({
            type: 'AddComment/getCommentInfo',
            payload: {
                id: domainId,
                type: commentType,
            },
            callback: (data) => {
                this.setState(
                    {
                        comment: data.evaluationContent,
                        level: data.evaluationLevelt.value,
                        commentId: data.id,
                    },
                    () => {
                        this.getLevelText()
                    },
                )
            },
        })
    }

    // 获取技师信息
    getTechnicianInfo = () => {
        const { commentType, domainId } = this.state
        if (commentType === 2) {
            this.props.dispatch({
                type: 'AddComment/getTechnicianInfo',
                payload: {
                    id: domainId,
                },
                callback: (data) => {
                    this.setState({
                        technicianInfo: {
                            avatar: BASEURL + data.avatar,
                            name: data.name,
                            phone: data.phone,
                        },
                    })
                },
            })
        }
    }

    handleSubmit = () => {
        const { domainId, comment, level, commentType, commentId } = this.state
        console.log({
            domainId: domainId,
            evaluationContent: comment,
            evaluationLevelt: level,
            evaluationType: commentType,
            id: '',
        })
        // return
        if (commentId === 0) {
            this.props.dispatch({
                type: 'AddComment/add',
                payload: {
                    domainId: domainId,
                    evaluationContent: comment,
                    evaluationLevelt: level,
                    evaluationType: commentType,
                    id: '',
                },
                callback: () => {
                    Taro.showToast({
                        title: '评论成功',
                    })
                    setTimeout(() => {
                        Taro.navigateBack()
                    }, 1000)
                },
            })
        } else {
            this.props.dispatch({
                type: 'AddComment/update',
                payload: {
                    domainId: domainId,
                    evaluationContent: comment,
                    evaluationLevelt: level,
                    evaluationType: commentType,
                    id: commentId,
                },
                callback: () => {
                    Taro.showToast({
                        title: '修改成功',
                    })
                    setTimeout(() => {
                        Taro.navigateBack()
                    }, 1000)
                },
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            comment: e.detail.value,
        })
    }

    // 选择满意度星级
    handleSelectLevel = (index: number) => {
        this.setState(
            {
                level: index,
            },
            () => {
                this.getLevelText()
            },
        )
    }

    // 获取星级评价文字
    getLevelText = () => {
        const { level } = this.state
        let text = ''
        switch (level) {
            case 1:
                text = '非常差'
                break
            case 2:
                text = '差'
                break
            case 3:
                text = '一般'
                break
            case 4:
                text = '好'
                break
            case 5:
                text = '非常好'
                break
            default:
                break
        }
        this.setState({ levelText: text })
    }
    render() {
        const { comment, level, levelText, technicianInfo, commentType } = this.state
        return (
            <View className={styles.AddCommentMain}>
                <Titlesession title="我要评价" />
                <View className={styles.commentWrap}>
                    {commentType === 2 && (
                        <View className={styles.technician}>
                            <Image src={technicianInfo.avatar} />
                            <Text>{technicianInfo.name}</Text>
                            <Text>{technicianInfo.phone}</Text>
                        </View>
                    )}
                    <Textarea
                        value={comment}
                        placeholder="请写下您对技师的建议，有助于我们为你们提供更优质的服务。"
                        onInput={this.handleChange}
                    />
                </View>

                <View className={styles.level}>
                    <Text>满意度</Text>
                    {[1, 3, 4, 5, 6].map((item, index) =>
                        level > index ? (
                            <Image
                                key={item}
                                onClick={() => {
                                    this.handleSelectLevel(index + 1)
                                }}
                                src={active_level_icon}
                            />
                        ) : (
                            <Image
                                key={item}
                                onClick={() => {
                                    this.handleSelectLevel(index + 1)
                                }}
                                src={level_icon}
                            />
                        ),
                    )}
                    <Text className={styles.desc}>{levelText}</Text>
                </View>

                <View className={styles.button} onClick={this.handleSubmit}>
                    提交
                </View>
            </View>
        )
    }
}

export default AddComment
