import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image, ScrollView } from '@tarojs/components'
import CalendarNormal from '../../components/CalendarNormal/index'
import { connect } from '@tarojs/redux'
import { EditSchedulingProps, EditSchedulingState } from './index.interface'
import styles from './EditScheduling.module.less'
import { BASEURL } from '../../config/index'
import testAvatar from '../../assets/img/test/test.png'

@connect(({ EditScheduling }) => ({
    ...EditScheduling,
}))
class EditScheduling extends Component<EditSchedulingProps, EditSchedulingState> {
    config: Config = {
        navigationBarTitleText: '修改排班',
    }
    constructor(props: EditSchedulingProps) {
        super(props)
        this.state = {
            technicianId: 0,
            dotOpt: [],
            currentTime: new Date().getTime(),
            selectDayList: [],
            technicianInfo: {},
        }
    }
    componentDidShow = () => {
        // this.getDetail()
        const { technicianId } = this.$router.params
        this.setState(
            {
                technicianId: Number.parseInt(technicianId, 10) || 119,
            },
            () => {
                this.getTerchnician()
                this.getDetail()
            },
        )
    }

    getDetail = () => {
        // const { currentTime, shopId } = this.state
        Taro.showLoading({
            title: '加载中',
        })
        const { technicianId } = this.state
        this.props.dispatch({
            type: 'EditScheduling/getScheduling',
            params: {
                id: technicianId,
            },
            cb: (data) => {
                const newList: any = []
                data.forEach((item) => {
                    newList.push(moment(item).format('YYYY/M/D'))
                })
                this.setState({
                    selectDayList: newList,
                })
                Taro.hideLoading()
            },
        })
    }

    getTerchnician = () => {
        const { technicianId } = this.state
        this.props.dispatch({
            type: 'TechnicianDetail/getTechnicianDetail',
            params: { id: technicianId },
            cb: (data) => {
                Taro.hideLoading()
                this.setState({
                    technicianInfo: data,
                })
                console.log(data)
            },
        })
    }

    formatDate = (time, type) => {
        const date = new Date(time)
        const year = date.getFullYear() //取得4位数的年份
        const month = date.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
        const day = date.getDate() //返回日期月份中的天数（1到31）

        const hour = date.getHours() //返回日期中的小时数（0到23）
        const minute = date.getMinutes() //返回日期中的分钟数（0到59）
        const second = date.getSeconds()

        if (type === 'short') {
            return year + '-' + month + '-' + day
        } else {
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        }
    }
    getWeekDay = (time) => {
        switch (moment(time).weekday()) {
            case 1: {
                return ' 星期一'
            }
            case 2: {
                return ' 星期二'
            }

            case 3: {
                return ' 星期三'
            }
            case 4: {
                return ' 星期四'
            }
            case 5: {
                return ' 星期五'
            }
            case 6: {
                return ' 星期六'
            }
            case 7: {
                return ' 星期日'
            }
            default:
                return ''
        }
    }

    handleSelectDay = (item) => {
        const { selectDayList } = this.state
        const _time = item.year + '/' + item.month + '/' + item.day
        const list = selectDayList
        let flag = true
        list.forEach((item, index) => {
            if (item === _time) {
                list.splice(index, 1)
                flag = false
            }
        })
        if (flag) {
            list.push(_time)
        }
        // console.log(list)

        const date = new Date(_time)
        const appointmentTime = date.getTime()
        this.setState(
            {
                currentTime: appointmentTime,
                selectDayList: list,
            },
            () => {
                // this.getDetail()
            },
        )
    }

    // 排班
    handleSubmit = () => {
        const { selectDayList, technicianId } = this.state
        const technicianIds: any = [technicianId]
        const times: any = []
        selectDayList.forEach((item) => {
            times.push(item.replace(/\//g, '-'))
        })
        this.props.dispatch({
            type: 'StartScheduling/startScheduling',
            params: { technicianIds, times },
            cb: (data) => {
                Taro.showToast({
                    title: '修改成功',
                })
                setTimeout(() => {
                    Taro.navigateBack()
                }, 2000)
            },
        })
    }

    render() {
        const { dotOpt, selectDayList, technicianInfo } = this.state
        return (
            <View className={styles.EditSchedulingMain}>
                <View className={styles.titleBox}>
                    <View className={styles.line}></View>
                    <View className={styles.title}>修改排班技师</View>
                </View>

                <View>
                    <View className={styles.scrollBox}>
                        <View className={styles.scrollItem}>
                            <Image
                                src={
                                    technicianInfo.avatar
                                        ? BASEURL + JSON.parse(technicianInfo.avatar).file
                                        : testAvatar
                                }
                                className={styles.avatar}
                            />
                            <View className={styles.name}>{technicianInfo.name}</View>
                            <View className={styles.no}>{technicianInfo.phone}</View>
                        </View>
                    </View>
                </View>

                <View className={styles.titleBox}>
                    <View className={styles.line}></View>
                    <View className={styles.title}>选择服务开始时间</View>
                </View>

                <View className={styles.calendarBox}>
                    <CalendarNormal
                        onSelectDay={this.handleSelectDay}
                        // 年月标题样式
                        titleOpt={{
                            template: 'AYearBMonth',
                        }}
                        // 周末标题配置
                        weekOpt={{
                            // 周末标题文字和样式
                            data: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
                        }}
                        // 天的样式主题配置
                        dayOpt={{
                            // 天的默认样式
                            defaultStyle: {},
                            // 今天的样式
                            todayStyle: {
                                width: '48rpx',
                                height: '48rpx',
                                lineHeight: '48rpx',
                                textAlign: 'center',
                                borderRadius: '24rpx',
                                color: '#B365B7',
                                backgroundColor: '#fff',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                            },
                            // 天的当前月样式
                            currentMonthStyle: {
                                color: 'rgba(51, 51, 51, 1)',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                                fontWeight: 'bold',
                                marginLeft: '10rpx',
                            },
                            // 天的点击样式
                            clickedStyle: {
                                width: '68rpx',
                                height: '68rpx',
                                borderRadius: '34rpx',
                                backgroundColor: 'rgba(179, 101, 183, 1)',
                                color: '#fff',
                                fontSize: '28rpx',
                                fontFamily: 'PingFang-SC-Medium',
                            },
                        }}
                        selectDayList={selectDayList}
                        isScheduling
                        dotOpt={dotOpt}
                    />
                </View>

                <View className={styles.button} onClick={this.handleSubmit}>
                    确认
                </View>
            </View>
        )
    }
}

export default EditScheduling
