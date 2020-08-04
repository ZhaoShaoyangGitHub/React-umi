import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { HealthRecordsSettingProps, HealthRecordsSettingState } from './index.interface'
import styles from './HealthRecordsSetting.module.less'
import { getToday } from '../../utils/function'

@connect(({ HealthRecordsSetting }) => ({
    ...HealthRecordsSetting,
}))
class HealthRecordsSetting extends Component<HealthRecordsSettingProps, HealthRecordsSettingState> {
    config: Config = {
        navigationBarTitleText: '体重记录',
    }
    public timer: any = ''
    constructor(props: HealthRecordsSettingProps) {
        super(props)
        this.state = {
            type: 2, //1表示体重2表示日期
            weightValue: '',
            startTime: '',
            endTime: '',
            status: 0, //是否正常{0:正常,1:不正常}
        }
    }

    componentDidMount() {
        const { type } = this.$router.params
        if (type) {
            this.setState({
                type: +type,
            })
            if (+type === 2) {
                Taro.setNavigationBarTitle({
                    title: '月经记录',
                })
            }
        }
    }

    handleInput = (e) => {
        this.setState({ weightValue: e.target.value })
    }

    handleConfirm = () => {
        const { type, weightValue, startTime, endTime, status } = this.state
        if (type === 1) {
            this.props.dispatch({
                type: 'HealthRecords/setWeightRecord',
                payload: {
                    weight: weightValue,
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
        if (type === 2) {
            if (!startTime) {
                Taro.showToast({
                    title: '请选择开始日期',
                    mask: true,
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            if (!endTime) {
                Taro.showToast({
                    title: '请选择结束日期',
                    mask: true,
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            if (startTime >= endTime) {
                Taro.showToast({
                    title: '请选择正确日期',
                    mask: true,
                    duration: 1000,
                    icon: 'none',
                })
                return
            }
            this.props.dispatch({
                type: 'HealthRecords/setMenstruationRecord',
                payload: {
                    startTime,
                    endTime,
                    status: status + 1,
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
    }

    onChange = (e, key): void => {
        this.setState({
            [key]: e.detail.value,
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        this.timer = null
    }

    render() {
        const { type, weightValue, startTime, endTime, status } = this.state
        return (
            <View className={styles.HealthRecordsSettingMain}>
                {type === 1 && (
                    <View className={styles.weightWrapper}>
                        <View className={styles.leftTitle}>体重（kg）</View>
                        <Input
                            className={styles.weightInput}
                            value={weightValue}
                            type="digit"
                            placeholder={'请输入体重'}
                            onInput={(e) => this.handleInput(e)}
                        />
                    </View>
                )}
                {type === 2 && (
                    <View className={styles.dataWrapper}>
                        <View className={styles.dataBox}>
                            <Picker
                                mode="date"
                                end={getToday()}
                                onChange={(e) => this.onChange(e, 'startTime')}
                                value={startTime}
                                start="2020-01-01"
                            >
                                <View className={styles.picker}>
                                    <Text>开始时间</Text>
                                    <Text>{startTime || '请选择'}</Text>
                                </View>
                            </Picker>
                        </View>
                        <View className={styles.dataBox}>
                            <Picker
                                mode="date"
                                end={getToday()}
                                onChange={(e) => this.onChange(e, 'endTime')}
                                value={endTime}
                                start="2020-01-01"
                            >
                                <View className={styles.picker}>
                                    <Text>结束时间</Text>
                                    <Text>{endTime || '请选择'}</Text>
                                </View>
                            </Picker>
                        </View>
                        <View className={styles.dataBox}>
                            <Picker
                                mode="selector"
                                range={['正常', '不正常']}
                                onChange={(e) => this.onChange(e, 'status')}
                                value={status}
                            >
                                <View className={`${styles.picker} ${styles.noBorder}`}>
                                    <Text>是否正常</Text>
                                    <Text>{['正常', '不正常'][status]}</Text>
                                </View>
                            </Picker>
                        </View>
                    </View>
                )}
                <View className={styles.buttonWrapper}>
                    <View className={styles.button} onClick={this.handleConfirm}>
                        确定
                    </View>
                </View>
            </View>
        )
    }
}

export default HealthRecordsSetting
