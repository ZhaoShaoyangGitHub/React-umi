import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
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
            attr: '',
            attrName: '',
            attrValue: '',
            showLength: false,
            inputType: 'type',
            avatar: {},
            name: '', // 姓名
            gender: {}, // 性别
            bloodType: '', // 血型
            chineseZodiac: '', // 属相
            constellation: '', // 星座
            marriageStatus: '', // 婚姻状态
            birthday: '', // 生日
            job: '', // 职业
            workingTime: '', // 工作时长
            childNumber: '', // 子女个数
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
        const { attr, attrName, attrValue = '' } = this.$router.params
        if (attr === 'name') {
            this.setState(
                {
                    showLength: true,
                    valueLength: attrValue ? attrValue.length : 0,
                    attr,
                    attrName,
                    attrValue,
                },
                () => {
                    this.getUserInfo()
                    return
                },
            )
        }
        if (attr === 'name' || attr === 'job' || attr === 'workingTime') {
            this.setState(
                {
                    inputType: 'text',
                    attr,
                    attrName,
                    attrValue,
                },
                () => {
                    this.getUserInfo()
                    return
                },
            )
        }
        this.setState(
            {
                attr,
                attrName,
                attrValue,
            },
            () => {
                this.getUserInfo()
                return
            },
        )
    }

    getUserInfo = async () => {
        const res = await getUserInfo()
        if (res && res.code === 'OK' && res.data) {
            const { data } = res
            const { userBodyInfoResponse = {} } = data
            this.setState({
                avatar: data.avatar, //头像
                name: data.nickName, // 姓名
                gender: data.gender && data.gender.value - 1, // 性别
                bloodType: data.bloodType, // 血型
                chineseZodiac: data.chineseZodiac, // 属相
                constellation: data.constellation, // 星座
                marriageStatus: data.marriageStatus && data.marriageStatus.value - 1, // 婚姻状态
                birthday: data.birthday, // 生日
                job: data.profession, // 职业
                workingTime: data.workTime, // 工作时长
                childNumber: data.offspringCount, // 子女个数
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
        if (this.state.attr === 'name' && val.length > 6) {
            Taro.showToast({
                title: '长度不能超过6位',
                mask: true,
                icon: 'none',
            })
            this.setState({
                valueLength: val.length,
            })
            return
        } else {
            this.setState({
                attrValue: val,
                valueLength: val.length,
            })
        }
    }

    handleSave = () => {
        const { attr, attrValue, valueLength } = this.state
        if (!attrValue) {
            Taro.showToast({
                title: '信息不能为空哦',
                icon: 'none',
                duration: 1000,
            })
            return
        }
        if (attr === 'name' && valueLength > 6) {
            Taro.showToast({
                title: '姓名长度不能超过6位',
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
                            avatar: this.state.avatar && this.state.avatar != 'null' && JSON.parse(this.state.avatar),
                            name: this.state.name,
                            gender: Number(this.state.gender) + 1,
                            birthday: this.state.birthday,
                            bloodType: this.state.bloodType,
                            chineseZodiac: this.state.chineseZodiac,
                            constellation: this.state.constellation,
                            profession: this.state.job,
                            workTime: this.state.workingTime,
                            marriageStatus: Number(this.state.marriageStatus) + 1,
                            offspringCount: this.state.childNumber,
                            userBodyInfoForm: {
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
                            },
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
        const { attr, attrName, attrValue, showLength, valueLength, inputType } = this.state
        return (
            <View className={styles.container}>
                <View className={styles.title}>{attrName}</View>
                <Input
                    name={attr}
                    type={inputType}
                    placeholder={`请输入${attrName}`}
                    value={attrValue}
                    onInput={(e) => this.handleChange(e.detail.value)}
                    className={styles.inputBox}
                    focus={true}
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
