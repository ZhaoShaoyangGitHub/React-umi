import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { SetUserInfoProps, SetUserInfoState } from './index.interface'
import { updateUserInfo, getUserInfo } from './apis'
import { IsChn } from '../../utils/function'
import styles from './SetUserInfo.module.less'

@connect(({ EditInfo }) => ({
    ...EditInfo,
}))
class SetUserInfo extends Component<SetUserInfoProps, SetUserInfoState> {
    config: Config = {
        navigationBarTitleText: '个人资料',
    }

    constructor(props: SetUserInfoProps) {
        super(props)
        this.state = {
            valueLength: 0,
            userId: 0,
            attr: '',
            attrName: '',
            attrValue: '',
            showLength: false,
            height: '', // 身高
            weight: '', // 体重
            standardWeight: '', // 标准体重
            targetWeight: '', // 目标体重
            chest: '', // 胸围
            waistline: '', // 腰围
            hipline: '', // 臀围
            highHip: '', // 上臀围
            leftLeg: '', // 左腿围
            rightLeg: '', // 右腿围
            shank: '', // 小腿围
        }
    }

    componentDidShow() {
        const { attr, attrName, attrValue = '', id } = this.$router.params

        if (attr === 'name') {
            this.setState({
                showLength: true,
                valueLength: attrValue ? attrValue.length : 0,
            })
        }
        this.setState(
            {
                attr,
                attrName,
                attrValue,
                userId: Number.parseInt(id, 10) || 0,
            },
            () => {
                this.getUserInfo()
            },
        )
    }

    getUserInfo = async () => {
        const { userId } = this.state
        const res = await getUserInfo({
            userId,
        })
        if (res && res.code === 'OK' && res.data) {
            const { data } = res
            const { userBodyInfoResponse = {} } = data
            this.setState({
                height: userBodyInfoResponse && userBodyInfoResponse.stature, // 身高
                weight: userBodyInfoResponse && userBodyInfoResponse.weight, // 体重
                standardWeight: userBodyInfoResponse && userBodyInfoResponse.standardWeight, // 标准体重
                targetWeight: userBodyInfoResponse && userBodyInfoResponse.targetWeight, // 目标体重
                chest: userBodyInfoResponse && userBodyInfoResponse.chestCircumference, // 胸围
                waistline: userBodyInfoResponse && userBodyInfoResponse.waistline, // 腰围
                hipline: userBodyInfoResponse && userBodyInfoResponse.hipline, // 臀围
                highHip: userBodyInfoResponse && userBodyInfoResponse.highHip, // 上臀围
                leftLeg: userBodyInfoResponse && userBodyInfoResponse.leftLeg, // 左腿围
                rightLeg: userBodyInfoResponse && userBodyInfoResponse.rightLeg, // 右腿围
                shank: userBodyInfoResponse && userBodyInfoResponse.shank, // 小腿围
            })
        }
    }

    handleChange = (val): void => {
        this.setState({
            attrValue: val,
        })
    }

    handleSave = () => {
        const { attr, attrValue, userId } = this.state
        if (!attrValue) {
            Taro.showToast({
                title: '信息不能为空哦',
                icon: 'none',
                duration: 1000,
            })
            return
        }
        if (attr === 'name' && !IsChn(attrValue)) {
            Taro.showToast({
                title: '姓名只能是纯汉字哦',
                icon: 'none',
                duration: 1000,
            })
            return
        }
        for (let key of Object.keys(this.state)) {
            if ((key = attr)) {
                this.setState(
                    {
                        [key]: attrValue,
                    },
                    () => {
                        const obj = {
                            stature: this.state.height,
                            weight: this.state.weight,
                            standardWeight: this.state.standardWeight,
                            targetWeight: this.state.targetWeight,
                            chestCircumference: this.state.chest,
                            waistline: this.state.waistline,
                            hipline: this.state.hipline,
                            highHip: this.state.highHip,
                            leftLeg: this.state.leftLeg,
                            rightLeg: this.state.rightLeg,
                            shank: this.state.shank,
                            userId,
                        }
                        this.updateUserInfo(obj)
                    },
                )
                return
            }
        }
    }
    updateUserInfo = async (data) => {
        const res = await updateUserInfo(data)
        if (res && res.code === 'OK') {
            Taro.showToast({
                title: '修改成功',
            }).then(() => {
                setTimeout(() => {
                    Taro.navigateBack({
                        delta: 1,
                    })
                }, 1500)
            })
        }
    }

    render() {
        const { attr, attrName, attrValue, showLength, valueLength } = this.state
        return (
            <View className={styles.container}>
                <View className={styles.title}>{attrName}</View>
                <AtInput
                    name={attr}
                    title=""
                    type="number"
                    placeholder={`请输入${attrName}`}
                    value={attrValue}
                    onChange={(val) => this.handleChange(val)}
                />
                {showLength && <View className={styles.valueLength}>{valueLength}/6</View>}
                <View className={styles.buttonWrapper}>
                    <View className={styles.button} onClick={this.handleSave}>
                        确定
                    </View>
                </View>
            </View>
        )
    }
}

export default SetUserInfo
