import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, OpenData, Icon, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PhysicalSelfTestProps, PhysicalSelfTestState } from './index.interface'
import styles from './PhysicalSelfTest.module.less'
import { testImages, Icons } from '../../assets/img/load'
import { BASEURL } from '../../config/index'
import BarChart from '../../components/Echart/BarChart'

@connect(({ PhysicalSelfTest, Personal }) => ({
    ...PhysicalSelfTest,
    ...Personal,
}))
class PhysicalSelfTest extends Component<PhysicalSelfTestProps, PhysicalSelfTestState> {
    config: Config = {
        navigationBarTitleText: '中医体质自测表',
    }
    barChart: any
    ageQuestion: Object = {
        title: '您的年龄是？',
        markResponses: [
            {
                title: '25岁以下',
                mark: 1,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
            {
                title: '26岁~35岁',
                mark: 2,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
            {
                title: '36岁~45岁',
                mark: 3,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
            {
                title: '46岁~55岁',
                mark: 4,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
            {
                title: '56岁~65岁',
                mark: 5,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
            {
                title: '65岁以上',
                mark: 6,
                isSelect: {
                    description: '否',
                    value: 2,
                },
            },
        ],
    }

    constructor(props: PhysicalSelfTestProps) {
        super(props)
        this.state = {
            startStatus: false,
            resultStatus: false,
            chartStatus: false,
            isNext: false, // 是否下一题
            currentIndex: 0,
            questionTitle: '',
            questionList: [],
            answerList: [],
            personalInfo: {},
            markList: [],
            constitutionResult: {
                constitutionResult: '',
                peacefulMark: 0, // 平和质分数
                dampHeatMark: 0, // 湿热质分数
                phlegmDampnessMark: 0, // 痰湿质分数
                qiDeficiencyMark: 0, // 气虚质分数
                qiDepressionMark: 0, // 气郁质分数
                specialReportMark: 0, // 特禀质分数
                stasisOfBloodMark: 0, // 血瘀质分数
                yangDeficiencyMark: 0, // 阳虚质分数
                yinDeficiencyMark: 0, // 阴虚质分数
            },
        }
    }

    componentDidMount() {
        this.getPersonalInfo()
        this.getResult()
    }

    getPersonalInfo = () => {
        this.props.dispatch({
            type: 'Personal/fetchUserInfo',
            cb: (data) => {
                this.setState({ personalInfo: data }, () => {
                    this.getQuestion()
                })
            },
        })
    }

    onStartTest = () => {
        this.setState({
            startStatus: true,
        })
    }

    getQuestion = () => {
        let { currentIndex, questionTitle, questionList, answerList, personalInfo } = this.state
        this.props.dispatch({
            type: 'PhysicalSelfTest/getQuestionList',
            payload: {
                isFindResult: 2,
                gender: personalInfo.gender.value,
            },
            cb: (data) => {
                if (data && data.length > 0) {
                    questionList = [this.ageQuestion, ...data]
                    answerList = questionList[currentIndex].markResponses
                    questionTitle = questionList[currentIndex].title
                    this.setState({
                        questionTitle,
                        questionList,
                        answerList,
                    })
                }
            },
        })
    }

    getResult = () => {
        let { constitutionResult } = this.state
        this.props.dispatch({
            type: 'PhysicalSelfTest/getResult',
            cb: (data) => {
                if (data && data.length > 0) {
                    if (data && data.constitutionResult) {
                        ;(constitutionResult.constitutionResult = data.constitutionResult),
                            this.setState({
                                constitutionResult,
                            })
                    }
                }
            },
        })
    }

    saveResult = (answerForms, ageType) => {
        this.props.dispatch({
            type: 'PhysicalSelfTest/saveResult',
            payload: {
                answerForms,
                ageType,
                genderType: this.state.personalInfo.gender.value,
            },
        })
    }

    selectedQuestion = (value: any, index: number) => {
        let { currentIndex, questionList, answerList } = this.state
        answerList.map((item, ind) => {
            if (index === ind) {
                item.isSelect = {
                    description: '是',
                    value: 1,
                }
            } else {
                item.isSelect = {
                    description: '否',
                    value: 2,
                }
            }
        })
        questionList[currentIndex].markResponses = answerList
        this.setState({
            questionList,
            isNext: true,
        })
    }

    jumpPrevQuestion = () => {
        let { currentIndex, questionTitle, questionList, answerList } = this.state
        currentIndex--
        answerList = questionList[currentIndex].markResponses
        questionTitle = questionList[currentIndex].title
        this.setState({
            currentIndex,
            answerList,
            questionTitle,
            isNext: true,
        })
    }

    jumpNextQuestion = () => {
        let { currentIndex, questionTitle, questionList, answerList, resultStatus, isNext } = this.state
        if (!isNext) return
        currentIndex++
        if (currentIndex >= questionList.length) {
            resultStatus = true
            this.handleResult()
        } else {
            answerList = questionList[currentIndex].markResponses
            questionTitle = questionList[currentIndex].title
        }
        this.setState(
            {
                currentIndex,
                answerList,
                questionTitle,
                resultStatus,
                isNext: false,
            },
            () => {
                if (this.state.resultStatus) {
                    Taro.setNavigationBarTitle({
                        title: '测试结果',
                    })
                }
            },
        )
    }

    handleResult = () => {
        const { questionList, constitutionResult, markList } = this.state
        let answerForms: Array<object> = []
        let ageType: number = 1
        questionList.map((items, index) => {
            items.markResponses.map((item) => {
                if (index === 0) {
                    if (item.isSelect.value === 1) {
                        ageType = item.mark
                        return
                    }
                } else {
                    let obj: any = {}
                    if (items.type.value > markList.length) {
                        markList[items.type.value - 1] = {
                            title: items.type.description,
                            questionNum: 0,
                            mark: 0,
                        }
                    }
                    if (item.isSelect.value === 1) {
                        obj = {
                            constitutionId: items.id,
                            constitutionMarkId: item.id,
                        }
                        markList[items.type.value - 1]['mark'] += item.mark
                        markList[items.type.value - 1]['questionNum']++
                    }
                    if (obj.hasOwnProperty('constitutionId')) {
                        answerForms.push(obj)
                    }
                    obj = null
                }
            })
        })
        markList.map((item: any) => {
            item.mark = Math.round(item.mark ? ((item.mark - item.questionNum) / (item.questionNum * 4)) * 100 : 0)
        })
        let peacefulNum = 0
        let biasedNum = 0
        constitutionResult.peacefulMark = markList[0].mark // 平和质分数
        markList.forEach((item: any, index) => {
            if (index > 0) {
                if (item.mark < 30) {
                    peacefulNum++
                }
                if (item.mark < 40) {
                    biasedNum++
                    if (item.mark >= 30) {
                        constitutionResult.constitutionResult += '倾向是' + item.title + '，'
                    }
                } else {
                    constitutionResult.constitutionResult += item.title + '，'
                }
            }
        })
        if (constitutionResult.peacefulMark >= 60 && peacefulNum === markList.length - 1) {
            constitutionResult.constitutionResult = '平和质，' + constitutionResult.constitutionResult
        }
        if (constitutionResult.peacefulMark >= 60 && biasedNum === markList.length - 1) {
            constitutionResult.constitutionResult = '基本是平和质，' + constitutionResult.constitutionResult
        }
        // constitutionResult.qiDeficiencyMark = markList[1].mark // 气虚质分数
        // constitutionResult.yangDeficiencyMark = markList[2].mark // 阳虚质分数
        // constitutionResult.yinDeficiencyMark = markList[3].mark // 阴虚质分数
        // constitutionResult.phlegmDampnessMark = markList[4].mark // 痰湿质分数
        // constitutionResult.dampHeatMark = markList[5].mark // 湿热质分数
        // constitutionResult.stasisOfBloodMark = markList[6].mark // 血瘀质分数
        // constitutionResult.qiDepressionMark = markList[7].mark // 气郁质分数
        // constitutionResult.specialReportMark = markList[8].mark // 特禀质分数
        this.setState(
            {
                constitutionResult,
            },
            () => {
                this.saveResult(answerForms, ageType)
            },
        )
    }

    goToDetail = () => {
        let constitutionList: Array<string> = []
        let dataY: Array<number> = []
        this.state.markList.forEach((item: any) => {
            constitutionList.push(item.title)
            dataY.push(item.mark)
        })
        this.setState(
            {
                chartStatus: true,
            },
            () => {
                this.barChart.refresh({
                    label: {
                        show: true,
                    },
                    xAxis: [
                        {
                            type: 'value',
                            max: 100, //设置最大值
                            min: 0,
                            axisLine: {
                                lineStyle: {
                                    color: '#999999',
                                },
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#999999',
                                },
                                alignWithLabel: true,
                            },
                            // axisLabel: {
                            //     formatter: function (value) {
                            //         var texts: any = []
                            //         if (value < 30) {
                            //             texts.push('否')
                            //         } else if (value <= 40) {
                            //             texts.push('倾向')
                            //         } else {
                            //             texts.push('是')
                            //         }
                            //         return texts
                            //     },
                            // },
                            splitLine: {
                                show: false,
                            },
                            splitArea: {
                                show: true,
                                areaStyle: {
                                    color: ['rgba(255, 255, 255, 0)', 'rgba(238, 238, 238, 0.4)'],
                                },
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            name: '体质',
                            data: constitutionList,
                            axisLine: {
                                lineStyle: {
                                    color: '#999999',
                                },
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                },
                            },
                        },
                    ],
                    measures: [
                        {
                            data: dataY,
                            barWidth: 15, //柱图宽度,
                        },
                    ],
                })
            },
        )
    }

    refBarChart = (node) => (this.barChart = node)

    render() {
        const {
            currentIndex,
            startStatus,
            resultStatus,
            chartStatus,
            answerList,
            questionTitle,
            questionList,
            personalInfo,
            isNext,
            constitutionResult,
        } = this.state
        const avatar = personalInfo.avatar ? JSON.parse(personalInfo.avatar).file : ''
        return (
            <View className={styles.PhysicalSelfTestMain}>
                <View className={styles.PhysicalSelfTestWrapper}>
                    {!startStatus ? (
                        <View className={styles.startPage}>
                            <View className={styles.subTittle}>中华中医药学会标准</View>
                            <View className={styles.title}>中医体质分类判定自测表</View>
                            {constitutionResult.constitutionResult ? (
                                <View className={styles.constitutionResult}>
                                    {constitutionResult.constitutionResult}
                                </View>
                            ) : (
                                <View className={styles.titleBtn}>荣月健康</View>
                            )}
                            <Image src={testImages.img2} mode="widthFix" className={styles.image} />
                            <View className={styles.startBtn} onClick={this.onStartTest}>
                                开始测试
                            </View>
                        </View>
                    ) : !chartStatus ? (
                        <View className={styles.questionWrapper}>
                            <Image src={testImages.img1} mode="widthFix" className={styles.imageBg} />
                            <View className={styles.questionTitleRight}>
                                {(currentIndex < 9 ? '0' + (currentIndex + 1) : currentIndex + 1) +
                                    '/' +
                                    (questionList.length + 1)}
                            </View>
                            {!resultStatus ? (
                                <View className={styles.questionMain}>
                                    <View className={styles.textTitle}>请根据近一年的体验和感觉，回答以下问题</View>
                                    <View className={styles.questionContent}>
                                        <View className={styles.questionTitle}>
                                            <View className={styles.questionOrder}>
                                                {currentIndex + 1 < 9 ? '0' + (currentIndex + 1) : currentIndex + 1}
                                            </View>
                                            <View>{questionTitle}</View>
                                        </View>
                                        <View className={styles.answerList}>
                                            {answerList &&
                                                answerList.length > 0 &&
                                                answerList.map((item, index) => {
                                                    return (
                                                        <View
                                                            className={styles.answerListItem}
                                                            key={item.answer}
                                                            onClick={() => {
                                                                this.selectedQuestion(item.score, index)
                                                            }}
                                                        >
                                                            <View className={styles.dot}>
                                                                {item.isSelect.value === 1 && (
                                                                    <Image
                                                                        className={styles.selectedIcon}
                                                                        src={Icons.selected}
                                                                        mode="widthFix"
                                                                    />
                                                                )}
                                                            </View>
                                                            <Text className={styles.txt}>{item.title}</Text>
                                                        </View>
                                                    )
                                                })}
                                        </View>
                                        <View className={styles.questionBottom}>
                                            {currentIndex > 0 && (
                                                <View className={styles.prevQuestion} onClick={this.jumpPrevQuestion}>
                                                    上一题
                                                </View>
                                            )}
                                            <View
                                                className={`${styles.nextQuestion} ${!isNext && styles.disable}`}
                                                onClick={this.jumpNextQuestion}
                                            >
                                                下一题
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View className={styles.resultPage}>
                                    <View className={styles.title}>您的测试成绩单</View>
                                    <View className={styles.avatar}>
                                        {avatar ? (
                                            <Image
                                                className={styles.avatarImg}
                                                src={avatar.includes('https://') ? avatar : BASEURL + avatar}
                                            />
                                        ) : (
                                            <OpenData
                                                className={styles.avatarImg}
                                                type="userAvatarUrl"
                                                lang="zh_CN"
                                            ></OpenData>
                                        )}
                                    </View>
                                    <View className={styles.name}>
                                        你好，{personalInfo.name || personalInfo.nickName || personalInfo.phone}
                                    </View>
                                    <View className={styles.resultContent}>
                                        <Image src={testImages.img3} mode="widthFix" className={styles.imageBg} />
                                        <View className={styles.resultTxt}>
                                            <View>
                                                <View>您可能具有</View>
                                                <View>{constitutionResult.constitutionResult}</View>
                                            </View>
                                        </View>
                                    </View>
                                    <View className={styles.checkoutDetail}>
                                        <Text onClick={this.goToDetail}>查看详情</Text>
                                    </View>
                                    <View className={styles.questionBottom}>
                                        <Button className={styles.nextQuestion} openType="share">
                                            我要分享
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        <View className={styles.testDetails}>
                            <View className={styles.chart}>
                                <BarChart ref={this.refBarChart} />
                            </View>
                            <View className={styles.questionBottom}>
                                <Button className={styles.nextQuestion} openType="share">
                                    我要分享
                                </Button>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default PhysicalSelfTest
