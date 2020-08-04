import Taro from '@tarojs/taro'
import { View, Image, Picker, Text } from '@tarojs/components'
import { SelectTimeProps } from './index.interface'
import styles from './index.module.less'
import { publicImages } from '../../assets/img/load'
import { getToday } from '../../utils/function'

function SelectTime(props: SelectTimeProps) {
    const { duration, startTime, endTime } = props
    const onChange = (e, type) => {
        this.props.onChange({ value: e.target.value, type })
    }
    return (
        <View className={styles.TimeWrapper}>
            <View className={styles.TimeDuration}>
                <View className={styles.leftTitle}>默认时长</View>
                <View className={styles.duration}>
                    <Text>{duration}天</Text>
                    <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.more} />
                </View>
            </View>
            <View className={styles.selectTime}>
                <Picker
                    mode="date"
                    end={getToday()}
                    onChange={(e) => onChange(e, 'startTime')}
                    value={startTime}
                    start="2000-01-01"
                >
                    <View className={styles.dataBox}>
                        <View className={styles.leftTitle}>选择开始时间</View>
                        <View className={styles.right}>
                            <Text>{startTime || '请选择'}</Text>
                            <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.more} />
                        </View>
                    </View>
                </Picker>
                <View className={styles.marginBottom}></View>
                <Picker
                    mode="date"
                    end={getToday()}
                    onChange={(e) => onChange(e, 'endTime')}
                    value={endTime}
                    start="2000-01-01"
                >
                    <View className={styles.dataBox}>
                        <View className={styles.leftTitle}>选择结束时间</View>
                        <View className={styles.right}>
                            <Text>{endTime || '请选择'}</Text>
                            <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.more} />
                        </View>
                    </View>
                </Picker>
            </View>
        </View>
    )
}

export default SelectTime
