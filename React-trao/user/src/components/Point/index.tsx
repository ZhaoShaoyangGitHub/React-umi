import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Icons } from '../../assets/img/load'
import styles from './index.module.less'
import { PointProps } from './index.interface'

const Point = (props: PointProps) => {
    const dayList = [
        {
            id: 0,
            title: '1天',
        },
        {
            id: 1,
            title: '2天',
        },
        {
            id: 2,
            title: '3天',
        },
        {
            id: 3,
            title: '4天',
        },
        {
            id: 4,
            title: '5天',
        },
        {
            id: 5,
            title: '6天',
        },
        {
            id: 6,
            title: '7天',
        },
    ]
    const { signInDay } = props
    return (
        <View className={styles.pointWrapper}>
            <View className={styles.signInDays}>
                连续签到第<Text className={styles.day}>{signInDay}</Text>天
            </View>
            {props.children}
            <View className={styles.position}>
                <View className={styles.signInDaysList}>
                    {dayList.map((item) => {
                        return (
                            <View className={styles.listItem} key={item.id}>
                                {item.id === 2 && (
                                    <Image src={Icons.checkinPoint3} mode="widthFix" className={styles.point} />
                                )}
                                {item.id === 6 && (
                                    <Image src={Icons.checkinPoint5} mode="widthFix" className={styles.point} />
                                )}
                                <Image
                                    src={signInDay > item.id ? Icons.checkinOn : Icons.checkinOff}
                                    mode="widthFix"
                                    className={styles.icon}
                                />
                                <View>{item.title}</View>
                            </View>
                        )
                    })}
                </View>
                <View className={styles.line}></View>
            </View>
        </View>
    )
}
export default Point
