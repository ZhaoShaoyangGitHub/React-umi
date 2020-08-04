import Taro, { Component } from '@tarojs/taro'
import moment from 'moment'
import { View, Text } from '@tarojs/components'
import { RecordItemProps, RecordItemState } from './index.interface'
import styles from './index.module.less'

class RecordItem extends Component<RecordItemProps, RecordItemState> {
    static defaultProps = {
        recordInfo: {
            staffName: '',
            packageTitle: '',
            serviceTitle: '',
            startTime: new Date(),
            endTime: null,
            staffNumber: '',
            weight: '',
        },
        index: 0,
    }

    constructor(props: RecordItemProps) {
        super(props)
        this.state = {}
    }

    getWeekDay = () => {
        const { recordInfo } = this.props
        switch (moment(recordInfo.startTime).weekday()) {
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

    render() {
        const { recordInfo, index } = this.props
        return (
            <View className={styles.infoBox} style={{ borderLeft: '8rpx solid #CCCCCC ' }}>
                <View className={styles.titleBox}>
                    {moment(recordInfo.startTime).format('YYYY-MM-DD')}
                    {this.getWeekDay()} 第{index}次服务
                </View>
                <View className={styles.keyValBox}>
                    <View className={styles.itemBox}>
                        <View className={styles.key}>套餐名称：</View>
                        <View className={styles.val}>{recordInfo.packageTitle}</View>
                    </View>
                    <View className={styles.itemBox}>
                        <View className={styles.key}>服务项目：</View>
                        <View className={styles.val}>
                            <Text>{recordInfo.serviceTitle}</Text>
                        </View>
                    </View>
                    <View className={styles.itemBox}>
                        <View className={styles.key}>服务时间：</View>
                        <View className={styles.val}>
                            {recordInfo.endTime
                                ? `${moment(recordInfo.startTime).format('YYYY-MM-DD HH:mm')}至
                            ${moment(recordInfo.endTime).format('YYYY-MM-DD HH:mm')}`
                                : '服务中'}
                        </View>
                    </View>
                    <View className={styles.itemBox}>
                        <View className={styles.key}>服务技师：</View>
                        <View className={styles.val}>
                            {recordInfo.staffName} {recordInfo.staffNumber}
                        </View>
                    </View>
                    <View className={styles.itemBox}>
                        <View className={styles.key}>当日体重：</View>
                        <View className={styles.val}>{recordInfo.weight}kg</View>
                    </View>
                </View>
            </View>
        )
    }
}

export default RecordItem
