import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { EditProfileProps, EditProfileState } from './index.interface'
import styles from './EditProfile.module.less'
import { Icons } from '../../assets/img/load'

@connect(({ EditProfile }) => ({
    ...EditProfile,
}))
class EditProfile extends Component<EditProfileProps, EditProfileState> {
    config: Config = {
        navigationBarTitleText: '编辑档案',
    }

    public timer: any = ''

    constructor(props: EditProfileProps) {
        super(props)
        this.state = {
            list: [
                {
                    id: 0,
                    selected: false,
                    title: '胸闷气短',
                },
                {
                    id: 1,
                    selected: false,
                    title: '腰酸背痛',
                },
                {
                    id: 2,
                    selected: false,
                    title: '视物模糊',
                },
                {
                    id: 3,
                    selected: false,
                    title: '眼袋',
                },
                {
                    id: 4,
                    selected: false,
                    title: '黑眼圈',
                },
                {
                    id: 5,
                    selected: false,
                    title: '睡眠差',
                },
                {
                    id: 6,
                    selected: false,
                    title: '肤色黄',
                },
                {
                    id: 7,
                    selected: false,
                    title: '暗疮',
                },
                {
                    id: 8,
                    selected: false,
                    title: '眼涩',
                },
                {
                    id: 9,
                    selected: false,
                    title: '眼胀',
                },
                {
                    id: 10,
                    selected: false,
                    title: '面部色斑',
                },
                {
                    id: 11,
                    selected: false,
                    title: '毛孔粗大',
                },
                {
                    id: 12,
                    selected: false,
                    title: '偏头痛',
                },
                {
                    id: 13,
                    selected: false,
                    title: '肤色暗沉',
                },
                {
                    id: 14,
                    selected: false,
                    title: '耳鸣',
                },
                {
                    id: 15,
                    selected: false,
                    title: '耳悸',
                },
                {
                    id: 16,
                    selected: false,
                    title: '咽喉不适',
                },
                {
                    id: 17,
                    selected: false,
                    title: '口腔溃疡',
                },
                {
                    id: 18,
                    selected: false,
                    title: '头痛',
                },
                {
                    id: 19,
                    selected: false,
                    title: '鼻炎',
                },
                {
                    id: 20,
                    selected: false,
                    title: '记忆力下降',
                },
                {
                    id: 21,
                    selected: false,
                    title: '内分泌失调',
                },
                {
                    id: 22,
                    selected: false,
                    title: '颈肩疼痛',
                },
                {
                    id: 23,
                    selected: false,
                    title: '肩周炎',
                },
                {
                    id: 24,
                    selected: false,
                    title: '月经多',
                },
                {
                    id: 25,
                    selected: false,
                    title: '月经少',
                },
                {
                    id: 26,
                    selected: false,
                    title: '胸口疼痛',
                },
                {
                    id: 27,
                    selected: false,
                    title: '乳腺增生',
                },
                {
                    id: 28,
                    selected: false,
                    title: '痔疮',
                },
                {
                    id: 29,
                    selected: false,
                    title: '尿频',
                },
                {
                    id: 30,
                    selected: false,
                    title: '注意力不集中',
                },
                {
                    id: 31,
                    selected: false,
                    title: '畏寒怕冷',
                },
                {
                    id: 32,
                    selected: false,
                    title: '经血不畅',
                },
                {
                    id: 33,
                    selected: false,
                    title: '妇科炎症',
                },
                {
                    id: 34,
                    selected: false,
                    title: '大便不通畅',
                },
                {
                    id: 35,
                    selected: false,
                    title: '尿少',
                },
                {
                    id: 36,
                    selected: false,
                    title: '易怒',
                },
            ],
            painList: [
                {
                    id: 0,
                    selected: false,
                    title: '无感',
                    value: '痛经（无感）',
                },
                {
                    id: 1,
                    selected: false,
                    title: '轻微',
                    value: '痛经（轻微）',
                },
                {
                    id: 2,
                    selected: false,
                    title: '中度',
                    value: '痛经（中度）',
                },
                {
                    id: 3,
                    selected: false,
                    title: '严重',
                    value: '痛经（严重）',
                },
            ],
            symptomValues: [],
        }
    }

    componentDidShow() {
        this.getHealthRecords()
    }

    getHealthRecords = () => {
        this.props.dispatch({
            type: 'HealthRecords/getHealthRecords',
            cb: (data) => {
                const { userSymptomResponse } = data
                let { list, painList } = this.state
                this.setState(
                    {
                        symptomValues: userSymptomResponse.symptomValues || [],
                    },
                    () => {
                        if (this.state.symptomValues.length) {
                            this.state.symptomValues.map((item) => {
                                list.map((listItem) => {
                                    if (listItem.title === item.symptom) {
                                        listItem.selected = true
                                        return
                                    }
                                })
                                painList.map((painListItem) => {
                                    if (painListItem.value === item.symptom) {
                                        painListItem.selected = true
                                        return
                                    }
                                })
                            })
                            this.setState({
                                list,
                                painList,
                            })
                        }
                    },
                )
            },
        })
    }

    setSymptom = () => {
        const { symptomValues } = this.state
        this.props.dispatch({
            type: 'HealthRecords/setSymptom',
            payload: {
                symptomValues,
            },
            cb: () => {
                Taro.showToast({
                    title: '更新成功',
                    mask: true,
                    duration: 1500,
                    success: () => {
                        this.timer = setTimeout(() => {
                            Taro.navigateBack()
                        }, 1500)
                    },
                })
            },
        })
    }

    onHandelSelect = (index, type: number = 1) => {
        let { list, painList, symptomValues } = this.state
        symptomValues = []
        if (type === 1) {
            list[index].selected = !list[index].selected
        }
        if (type === 2) {
            painList.map((painListItem, ind) => {
                painListItem.selected = false
                if (ind === index) {
                    painListItem.selected = true
                    symptomValues.push({ symptom: painListItem.value })
                }
            })
        }
        list.map((listItem) => {
            if (listItem.selected) {
                symptomValues.push({ symptom: listItem.title })
            }
        })
        this.setState({
            list,
            painList,
            symptomValues,
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        this.timer = null
    }

    render() {
        const { list, painList } = this.state
        return (
            <View className={styles.EditProfileMain}>
                <View className={styles.content}>
                    <View className={styles.title}>
                        基础症状 <Text>(可多选)</Text>
                    </View>
                    <View className={styles.list}>
                        {list.map((item) => {
                            return (
                                <View
                                    className={styles.list_item}
                                    key={item.id}
                                    onClick={() => {
                                        this.onHandelSelect(item.id)
                                    }}
                                >
                                    <Text>{item.title}</Text>
                                    {item.selected ? (
                                        <Image src={Icons.selected} className={styles.icon} />
                                    ) : (
                                        <Image src={Icons.select} className={styles.icon} />
                                    )}
                                </View>
                            )
                        })}
                    </View>
                    <View className={styles.title}>痛经</View>
                    <View className={styles.list}>
                        {painList.map((item) => {
                            return (
                                <View
                                    className={styles.list_item}
                                    key={item.id}
                                    onClick={() => {
                                        this.onHandelSelect(item.id, 2)
                                    }}
                                >
                                    <Text>{item.title}</Text>
                                    {item.selected ? (
                                        <Image src={Icons.selected} className={styles.icon} />
                                    ) : (
                                        <Image src={Icons.select} className={styles.icon} />
                                    )}
                                </View>
                            )
                        })}
                    </View>
                    <View className={styles.buttonWrapper}>
                        <View className={styles.button} onClick={this.setSymptom}>
                            确认
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default EditProfile
