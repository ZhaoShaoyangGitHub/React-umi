import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { UpdateRecordsProps, UpdateRecordsState } from './index.interface'
import styles from './UpdateRecords.module.less'
import { connect } from '@tarojs/redux'
import moment from 'moment'

@connect(({ UpdateRecords }) => ({
    ...UpdateRecords,
}))
class UpdateRecords extends Component<UpdateRecordsProps, UpdateRecordsState> {
    config: Config = {
        navigationBarTitleText: '更新记录',
    }
    constructor(props: UpdateRecordsProps) {
        super(props)
        this.state = {
            UpdateRecordsDataList: [],
        }
    }

    componentDidShow() {
        this.getUpdateRecord()
    }

    getUpdateRecord = () => {
        this.props.dispatch({
            type: 'HealthRecords/getUpdateRecord',
            cb: (data) => {
                if (data) {
                    this.setState({
                        UpdateRecordsDataList: data,
                    })
                }
            },
        })
    }

    render() {
        const { UpdateRecordsDataList } = this.state
        return (
            <View className={styles.UpdateRecordsMain}>
                <View className={styles.list}>
                    {UpdateRecordsDataList &&
                        UpdateRecordsDataList.length > 0 &&
                        UpdateRecordsDataList.map((item) => {
                            return (
                                <View className={styles.listItem} key={item.id}>
                                    <View className={styles.marginBottom}>
                                        更新时间：{moment(item.createTime).format('YYYY-MM-DD')}
                                    </View>
                                    <View className={styles.marginBottom}>更新人：{item.userName}</View>
                                    <View>
                                        更新内容：
                                        {item.symptomValues.map((value) => {
                                            return <Text key={value}>{value.symptom}，</Text>
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                </View>
            </View>
        )
    }
}

export default UpdateRecords
