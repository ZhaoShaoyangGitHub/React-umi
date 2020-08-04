import Taro, { Component, Config } from '@tarojs/taro'
import moment from 'moment'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { WriteOffProps, WriteOffState } from './index.interface'
import InfoModel from '../../components/InfoModel'
import styles from './WriteOff.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ WriteOff, DateDetail }) => ({
    ...WriteOff,
    ...DateDetail,
}))
class WriteOff extends Component<WriteOffProps, WriteOffState> {
    config: Config = {
        navigationBarTitleText: '排期详情',
    }
    constructor(props: WriteOffProps) {
        super(props)
        this.state = {
            val: 0,
            isCompleted: false,
            itemInfo: {},
            schedulingRecordId: 0,
        }
    }

    componentDidMount() {
        const { id } = this.$router.params
        this.setState({
            schedulingRecordId: Number.parseInt(id, 10) || 0,
        })
        this.props.dispatch({
            type: 'DateDetail/getSchedulingDetail',
            params: { id },
            callback: (data) => {
                this.setState({
                    itemInfo: data,
                })
            },
        })
    }

    handleSwitchToDetail = () => {}
    render() {
        const { val, isCompleted, itemInfo } = this.state
        return (
            <View className={styles.WriteOffMain}>
                <View className={styles.userinfo}>
                    <Image src={publicImages.test} className={styles.leftAvatar} />
                    <View className={styles.rightInfo}>
                        <View className={styles.titleItem}>
                            <View className={styles.left}>{itemInfo.userName}</View>
                            <View className={styles.right}>{itemInfo.userPhone}</View>
                        </View>
                        <View className={styles.infoItem}>
                            <View className={styles.key}>上次体重：</View>
                            <View className={styles.val}>58.5kg</View>
                        </View>
                    </View>
                </View>

                <View className={styles.content}>
                    {itemInfo &&
                        itemInfo.orderProjectRecordResponses &&
                        itemInfo.orderProjectRecordResponses.length > 0 &&
                        itemInfo.orderProjectRecordResponses.map((item) => {
                            return (
                                <View key={item.id} className={styles.packageBox}>
                                    <View className={styles.packageInfo} onClick={this.handleSwitchToDetail}>
                                        <Image
                                            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3753571868,2154753959&fm=26&gp=0.jpg"
                                            className={styles.packageimg}
                                        />
                                        <View className={styles.rightBox}>
                                            <View className={styles.title}>{item.projectName}</View>
                                            <View className={styles.detail}>
                                                {moment(item.appointmentTime).format('YYYY-MM-DD HH:mm')} 第
                                                {item.usedNumber}次服务
                                            </View>
                                            <View className={styles.bottom}>套餐剩余 {item.remainingNumber} 次</View>
                                        </View>
                                    </View>
                                    <View className={styles.botBox}>
                                        <View className={styles.left}>本次核销次数</View>
                                        <View className={styles.right}>
                                            <View className={styles.desbtn} onClick={this.handleDes}>
                                                -
                                            </View>
                                            <View className={styles.val}>{val <= 0 ? 0 : val}</View>
                                            <View
                                                className={styles.addbtn}
                                                onClick={() => this.handleAdd(item.remainingNumber)}
                                            >
                                                +
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                </View>

                <View className={styles.btn} onClick={this.handleConfirm}>
                    确认
                </View>
                {isCompleted && <InfoModel title="提交成功" />}
            </View>
        )
    }
    handleDes = () => {
        console.log('handleDes')
        const { val } = this.state
        if (val > 0) {
            let _val = val - 1
            this.setState({ val: _val })
        }
    }
    handleAdd = (max) => {
        const { val } = this.state
        if (val < max) {
            let _val = val + 1

            this.setState({ val: _val })
        }
    }
    handleConfirm = () => {
        const { val, itemInfo, schedulingRecordId } = this.state
        this.props.dispatch({
            type: 'WriteOff/endService',
            params: {
                endSchedulingForms: [
                    {
                        cancelNumber: val,
                        packageProjectId: itemInfo.orderProjectRecordResponses
                            ? itemInfo.orderProjectRecordResponses[0].projectId
                            : 0,
                        packageId: itemInfo.packageId,
                    },
                ],
                schedulingRecordId,
            },
            callback: (data) => {
                this.setState({ isCompleted: true })

                setTimeout(() => {
                    Taro.switchTab({
                        url: '/pages/Home/index',
                    })
                }, 1000)
            },
        })
        // Taro.navigateTo({
        //     url: '/pages/WriteOff/index',
        // })
    }
}

export default WriteOff
