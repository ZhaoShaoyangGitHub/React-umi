import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image, ScrollView, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PackageSelectProps, PackageSelectState } from './index.interface'
import styles from './PackageSelect.module.less'
import { BASEURL } from '../../config/index'
import { Icons } from '../../assets/img/load'

let hourList = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
]
let minuteList1 = ['00', '15', '30', '45']
let minuteList2 = ['00', '30']
@connect(({ PackageSelect }) => ({
    ...PackageSelect,
}))
class PackageSelect extends Component<PackageSelectProps, PackageSelectState> {
    config: Config = {
        navigationBarTitleText: '服务预约',
    }
    constructor(props: PackageSelectProps) {
        super(props)
        this.state = {
            timeData: [hourList, minuteList1],
            selectedIndArr: [],
            startTime: '',
            time: [],
            timeString: '',
            projectList: [],
            technicianList: [],
            currentTechnician: -1,
            serviceStartTime: '',
            serviceEndTime: '',
        }
    }

    componentDidShow = () => {
        const { orderId } = this.$router.params
        this.props.dispatch({
            type: 'PackageSelect/getServiceTime',
            params: { id: orderId },
            cb: (data) => {
                this.getTimeData(data.businessHoursStart, data.businessHoursEnd, data.waitingTime.value)
                this.setState({
                    serviceStartTime: data.businessHoursStart,
                    serviceEndTime: data.businessHoursEnd,
                })
            },
        })
        this.props.dispatch({
            type: 'PackageSelect/getPackageDetail',
            params: { id: orderId },
            cb: (data) => {
                console.log('套餐:', data)
                if (Array.isArray(data)) {
                    this.setState({ projectList: data })
                }
            },
        })

        this.props.dispatch({
            type: 'PackageSelect/getTechnician',
            params: { id: orderId },
            cb: (data) => {
                console.log('技师:', data)
                if (Array.isArray(data)) {
                    this.setState({ technicianList: data })
                }
            },
        })
    }

    // 获取时间选择器数据
    getTimeData = (startTime, endTime, interval) => {
        const startHour = startTime.substr(0, 2)
        const endHour = endTime.substr(0, 2)
        const newHourList = hourList.slice(hourList.indexOf(startHour), hourList.indexOf(endHour) + 1)
        let minuteList = minuteList1
        switch (interval) {
            case 1:
                minuteList = minuteList1
                break
            case 2:
                minuteList = minuteList2
                break
            default:
                break
        }
        this.setState({
            timeData: [newHourList, minuteList],
        })
    }

    handleAreaChange = (value) => {
        console.log(value)
        this.setState({ startTime: value })
    }
    render() {
        const {
            selectedIndArr,
            startTime,
            time,
            timeString,
            projectList,
            technicianList,
            currentTechnician,
            timeData,
        } = this.state

        return (
            <View className={styles.PackageSelectMain}>
                <View className={styles.titleBox}>
                    <View className={styles.line}></View>
                    <View className={styles.title}>预约信息</View>
                </View>

                <View className={styles.contentBox}>
                    <View className={styles.left}>预约日期</View>
                    <View className={styles.time}>
                        <Picker
                            mode="date"
                            onChange={(e) => this.handleAreaChange(e.detail.value)}
                            value={startTime}
                            start={moment().format('YYYY-MM-DD')}
                        >
                            <View className={styles.picker}>{!startTime ? '请选择' : startTime}</View>
                        </Picker>
                    </View>
                </View>

                <View className={styles.titleBox}>
                    <View className={styles.line}></View>
                    <View className={styles.title}>选择服务项目</View>
                </View>

                <View className={styles.selectBox}>
                    {/* <Image src={} className={styles.} /> */}
                    {selectedIndArr.length >= projectList.length ? (
                        <Image
                            src={Icons.selected}
                            className={styles.selected}
                            onClick={this.handleSelectAll.bind(this, 'none')}
                        />
                    ) : (
                        <View className={styles.empty} onClick={this.handleSelectAll.bind(this, 'all')}></View>
                    )}
                    <View className={styles.word}>全选</View>
                </View>
                {projectList.map((item, index) => {
                    return (
                        <View className={styles.itemBox} key={item.id} onClick={this.handleSelect.bind(this, index)}>
                            {selectedIndArr.indexOf(index) !== -1 ? (
                                <Image src={Icons.selected} className={styles.selected} />
                            ) : (
                                <View className={styles.empty}></View>
                            )}
                            <View className={styles.rightContent}>
                                {/* <Image src={item.imgSrc} className={styles.imgSrc} /> */}
                                {/* <Image
                                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579239705082&di=87ea861c294a763b5d01883105b081bb&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb21bb051f8198618bfdca2be41ed2e738bd4e675.jpg"
                                    className={styles.imgSrc}
                                /> */}
                                <View className={styles.rightInfo}>
                                    <View className={styles.top}>{item.projectName}</View>
                                    <View className={styles.bot}>
                                        {/* <View className={styles.price}>¥{item.price}</View> */}
                                        <View className={styles.num}>X{item.validNumber - item.usedNumber}</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}

                <View className={styles.titleBox}>
                    <View className={styles.line}></View>
                    <View className={styles.title}>选择服务技师</View>
                </View>

                <ScrollView scrollX scrollWithAnimation scrollTop={0} style={{ width: '100vw' }}>
                    <View className={styles.scrollBox}>
                        {technicianList.map((item, index) => {
                            return (
                                <View
                                    key={item.id}
                                    className={styles.scrollItem}
                                    onClick={this.handleSelectTechnician.bind(this, index)}
                                >
                                    <View className={styles.selectPosi}>
                                        {currentTechnician === index ? (
                                            <Image src={Icons.selected} className={styles.selected} />
                                        ) : (
                                            <View className={styles.empty}></View>
                                        )}
                                    </View>
                                    <View className={styles.avatar}>
                                        {item.avatar && (
                                            <Image
                                                src={BASEURL + JSON.parse(item.avatar).file}
                                                className={styles.avatar}
                                            />
                                        )}
                                    </View>
                                    <View className={styles.name}>{item.name}</View>
                                    <View className={styles.no}>{item.phone}</View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                <Picker
                    mode="multiSelector"
                    range={timeData}
                    onChange={(e) => this.handleTimeChange(e.detail.value)}
                    value={time}
                >
                    <View className={styles.selectTime}>
                        <View className={styles.left}>请选择服务时间段</View>
                        {!timeString ? (
                            <Image src={Icons.findMore} className={styles.right} />
                        ) : (
                            <View className={styles.right_t}>{timeString}</View>
                        )}
                    </View>
                </Picker>

                <View className={styles.submitBtn} onClick={this.handleSubmit}>
                    确定
                </View>
            </View>
        )
    }
    handleSubmit = () => {
        const { orderId } = this.$router.params
        const { projectList, currentTechnician, technicianList, serviceStartTime, serviceEndTime } = this.state
        const { startTime, timeString, selectedIndArr } = this.state
        const _time = startTime + ' ' + timeString + ':00'
        // const date = new Date(_time)
        // const appointmentTime = date.getTime()

        const ids: any[] = []

        for (let i = 0; i < selectedIndArr.length; i++) {
            ids.push(projectList[selectedIndArr[i]].id)
        }

        if (!startTime || !timeString) {
            Taro.showToast({ title: '请选择开始时间和时间段', icon: 'none', duration: 1000 })
            return
        }

        if (!selectedIndArr.length) {
            Taro.showToast({ title: '请选择服务项目', icon: 'none', duration: 1000 })
            return
        }

        if (currentTechnician === -1) {
            Taro.showToast({ title: '请选择技师', icon: 'none', duration: 1000 })
            return
        }
        if (moment(_time).isBefore(moment(startTime + ' ' + serviceStartTime))) {
            Taro.showToast({ title: '不能早于营业时间', icon: 'none' })
            return
        }
        if (moment(_time).isAfter(moment(startTime + ' ' + serviceEndTime))) {
            Taro.showToast({ title: '不能晚于营业时间', icon: 'none' })
            return
        }
        if (moment(_time).isBefore(moment())) {
            Taro.showToast({ title: '不能早于当前时间', icon: 'none' })
            return
        }
        const staffUserId = technicianList[currentTechnician].userId

        // console.log('表单:', appointmentTime, ids, orderId, staffUserId)

        this.props.dispatch({
            type: 'PackageSelect/userSaveapPointment',
            params: { appointmentTime: _time, ids, orderId, remark: '', staffUserId },
            cb: (data) => {
                Taro.navigateTo({
                    url: `/pages/PayResult/index?id=${null}&type=package`,
                })

                console.log('预约结果:', data)
            },
        })
    }
    handleSelectTechnician = (index) => {
        this.setState({ currentTechnician: index })
    }
    handleTimeChange = (value) => {
        const { timeData } = this.state
        console.log(value)
        this.setState({ time: value, timeString: `${timeData[0][value[0]]}:${timeData[1][value[1]]}` })
    }
    handleSelectAll = (type) => {
        console.log('全选:', type)
        const { projectList } = this.state
        if (type === 'none') {
            this.setState({ selectedIndArr: [] })
        } else {
            let _arr: any = []
            projectList.forEach((item, index) => {
                _arr.push(index)
            })
            this.setState({ selectedIndArr: _arr })
        }
    }
    handleSelect = (index) => {
        console.log(index)
        const { selectedIndArr } = this.state
        let _selectedIndArr = JSON.parse(JSON.stringify(selectedIndArr))
        if (_selectedIndArr.indexOf(index) === -1) {
            _selectedIndArr.push(index)
            this.setState({ selectedIndArr: _selectedIndArr })
        } else {
            _selectedIndArr = _selectedIndArr.filter((item) => {
                return item !== index
            })
            this.setState({ selectedIndArr: _selectedIndArr })
        }
    }
}

export default PackageSelect
