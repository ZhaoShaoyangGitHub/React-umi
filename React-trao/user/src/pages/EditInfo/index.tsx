import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import moment from 'moment'
import { EditInfoProps, EditInfoState } from './index.interface'
import { getUserInfo, updateUserInfo } from './apis'
import { getToday } from '../../utils/function'
import styles from './EditInfo.module.less'
import { Icons } from '../../assets/img/load'
import { BASEURL } from '../../config/index'

@connect(({ EditInfo }) => ({
    ...EditInfo,
}))
class EditInfo extends Component<EditInfoProps, EditInfoState> {
    config: Config = {
        navigationBarTitleText: '个人资料',
    }
    public genderArr: Array<string> = ['男', '女']
    public bloodArr: Array<string> = ['A型', 'B型', 'AB型', 'O型']
    public animalArr: Array<string> = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
    public constellationArr: Array<string> = [
        '白羊座',
        '金牛座',
        '双子座',
        '巨蟹座',
        '狮子座',
        '处女座',
        '天秤座',
        '天蝎座',
        '射手座',
        '摩羯座',
        '水瓶座',
        '双鱼座',
    ]
    public maritalArr: Array<string> = ['保密', '已婚', '未婚']
    public childNumbers: Array<number> = [0, 1, 2, 3, 4, 5]

    constructor(props: EditInfoProps) {
        super(props)
        this.state = {
            avatar: {
                file: '',
                original: '',
                size: '',
                state: '',
                title: '',
            },
            nickname: '', // 姓名
            genderSelectIndex: 0, // 性别
            bloodSelectIndex: 0, // 血型
            animalSelectIndex: 0, // 属相
            constellationSelectIndex: 0, // 星座
            maritalSelectIndex: 0, // 婚姻状态
            date: '', // 生日
            job: '', // 职业
            workingTime: '', // 工作时长
            childNumber: '', // 子女个数
            height: '', // 身高
            weight: '', // 体重
            standardWeight: '', // 标准体重
            targetWeight: '', // 目标体重
            upperArm: '', //上臂围
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
        this.getUserInfo()
    }
    getUserInfo = async () => {
        const res = await getUserInfo()
        if (res && res.code === 'OK' && res.data) {
            const { data } = res
            const { userBodyInfoResponse = {} } = data
            const { animalArr, constellationArr, bloodArr } = this.state
            this.setState({
                avatar: data.avatar && JSON.parse(data.avatar),
                nickname: data.nickName, // 姓名
                genderSelectIndex: data.gender && data.gender.value - 1, // 性别
                bloodSelectIndex: bloodArr.findIndex((b) => b === data.bloodType), // 血型
                animalSelectIndex: animalArr.findIndex((a) => a === data.chineseZodiac), // 属相
                constellationSelectIndex: constellationArr.findIndex((c) => c === data.constellation), // 星座
                maritalSelectIndex: data.marriageStatus && data.marriageStatus.value - 1, // 婚姻状态
                date: data.birthday && moment(data.birthday).format('YYYY-MM-DD'), // 生日
                job: data.profession, // 职业
                workingTime: data.workTime, // 工作时长
                childNumber: data.offspringCount, // 子女个数
                height: userBodyInfoResponse && userBodyInfoResponse.stature, // 身高
                weight: userBodyInfoResponse && userBodyInfoResponse.weight, // 体重
                standardWeight: userBodyInfoResponse && userBodyInfoResponse.standardWeight, // 标准体重
                targetWeight: userBodyInfoResponse && userBodyInfoResponse.targetWeight, // 目标体重
                upperArm: userBodyInfoResponse && userBodyInfoResponse.upperArm, // 目标体重
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

    handleChange = (val, key): void => {
        this.setState({
            [key]: val,
        })
    }

    onChange = (e, key): void => {
        this.setState(
            {
                [key]: e.detail.value,
            },
            () => {
                this.handleSave()
            },
        )
    }

    handleSave = (): void => {
        const {
            avatar,
            nickname,
            genderSelectIndex,
            date,
            bloodSelectIndex,
            animalSelectIndex,
            constellationSelectIndex,
            job,
            workingTime,
            maritalSelectIndex,
            childNumber,
            height,
            weight,
            standardWeight,
            targetWeight,
            upperArm,
            chest,
            waistline,
            hipline,
            highHip,
            leftLeg,
            rightLeg,
            shank,
        } = this.state
        const obj = {
            avatar: avatar,
            name: nickname,
            gender: Number(genderSelectIndex) + 1,
            birthday: moment(date).valueOf(),
            bloodType: this.bloodArr[bloodSelectIndex] || '',
            chineseZodiac: this.animalArr[animalSelectIndex] || '',
            constellation: this.constellationArr[constellationSelectIndex] || '',
            profession: job,
            workTime: workingTime,
            marriageStatus: Number(maritalSelectIndex) + 1,
            offspringCount: childNumber,
            userBodyInfoForm: {
                stature: height,
                weight,
                standardWeight,
                targetWeight,
                upperArm,
                chestCircumference: chest,
                waistline,
                hipline,
                highHip,
                leftLeg,
                rightLeg,
                shank,
            },
        }
        this.updateUserInfo(obj)
    }
    updateUserInfo = async (data) => {
        const res = await updateUserInfo(data)
        if (res && res.code === 'OK') {
            Taro.showToast({
                title: '修改成功',
            })
        }
    }
    goSetUserInfoPage = (attr: string, attrName: string, attrValue: any) => {
        Taro.navigateTo({
            url: `/pages/SetUserInfo/index?attr=${attr}&attrName=${attrName}&attrValue=${attrValue ? attrValue : ''}`,
        })
    }

    changeAvatar = () => {
        Taro.showLoading({
            title: '修改中',
            mask: true,
        })
        Taro.chooseImage({
            count: 1,
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                Taro.uploadFile({
                    url: `${BASEURL}/api/ueditor`,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                    filePath: tempFilePaths[0],
                    name: 'upfile',
                    formData: {
                        action: 'uploadimage',
                        encode: 'utf-8',
                    },
                    success: (res) => {
                        const data = JSON.parse(res.data)
                        this.setState(
                            {
                                avatar: {
                                    file: data.url,
                                    original: data.original,
                                    size: data.size,
                                    state: data.state,
                                    title: data.title,
                                },
                            },
                            () => {
                                this.handleSave()
                            },
                        )
                    },
                })
            },
            complete: () => {
                Taro.hideLoading()
            },
        })
    }
    render() {
        const {
            avatar,
            nickname,
            genderSelectIndex,
            date,
            bloodSelectIndex,
            animalSelectIndex,
            constellationSelectIndex,
            job,
            workingTime,
            maritalSelectIndex,
            childNumber,
            height,
            weight,
            standardWeight,
            targetWeight,
            upperArm,
            chest,
            waistline,
            hipline,
            highHip,
            leftLeg,
            rightLeg,
            shank,
        } = this.state
        return (
            <View className={styles.container}>
                <View className={styles.baseInfo}>
                    <View className={styles.title}>基本信息</View>
                    <View className={styles.infoListItemAvatar}>
                        <Text className={styles.info_title}>头像</Text>
                        <View className={styles.avatar} onClick={this.changeAvatar}>
                            {avatar && avatar != 'null' && avatar.file && (
                                <Image
                                    className={styles.avatarImg}
                                    src={avatar.file.includes('https://') ? avatar.file : BASEURL + avatar.file}
                                    mode="widthFix"
                                />
                            )}
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('name', '姓名', nickname)
                        }}
                    >
                        <Text className={styles.info_title}>姓名</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${nickname ? '' : styles.please_select}`}>
                                {nickname || '请输入'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <Picker
                        mode="selector"
                        range={this.genderArr}
                        onChange={(e) => this.onChange(e, 'genderSelectIndex')}
                        value={genderSelectIndex || 0}
                    >
                        <View className={styles.picker}>
                            <Text>性别</Text>
                            <Text>{this.genderArr[genderSelectIndex] || '请选择'}</Text>
                        </View>
                    </Picker>

                    <Picker
                        mode="date"
                        end={getToday()}
                        onChange={(e) => this.onChange(e, 'date')}
                        value={date}
                        start="1900-01-01"
                    >
                        <View className={styles.picker}>
                            <Text>生日</Text>
                            <Text>{date || '请选择'}</Text>
                        </View>
                    </Picker>

                    <Picker
                        mode="selector"
                        range={this.bloodArr}
                        onChange={(e) => this.onChange(e, 'bloodSelectIndex')}
                        value={bloodSelectIndex || 0}
                    >
                        <View className={styles.picker}>
                            <Text>血型</Text>
                            <Text>{this.bloodArr[bloodSelectIndex] || '请选择'}</Text>
                        </View>
                    </Picker>

                    <Picker
                        mode="selector"
                        range={this.animalArr}
                        onChange={(e) => this.onChange(e, 'animalSelectIndex')}
                        value={animalSelectIndex || 0}
                    >
                        <View className={styles.picker}>
                            <Text>属相</Text>
                            <Text>{this.animalArr[animalSelectIndex] || '请选择'}</Text>
                        </View>
                    </Picker>

                    <Picker
                        mode="selector"
                        range={this.constellationArr}
                        onChange={(e) => this.onChange(e, 'constellationSelectIndex')}
                        value={constellationSelectIndex || 0}
                    >
                        <View className={`${styles.picker} ${styles.noBorder}`}>
                            <Text>星座</Text>
                            <Text>{this.constellationArr[constellationSelectIndex] || '请选择'}</Text>
                        </View>
                    </Picker>

                    <View className={styles.whiteSpace} />

                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('job', '职业', job)
                        }}
                    >
                        <Text className={styles.info_title}>职业</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${job ? '' : styles.please_select}`}>
                                {job || '请输入职业'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('workingTime', '工作年限', workingTime)
                        }}
                    >
                        <Text className={styles.info_title}>工作年限</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${workingTime ? '' : styles.please_select}`}>
                                {workingTime || '请输入工作年限'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>

                    <View className={styles.whiteSpace} />

                    <Picker
                        mode="selector"
                        range={this.maritalArr}
                        onChange={(e) => this.onChange(e, 'maritalSelectIndex')}
                        value={maritalSelectIndex || 0}
                    >
                        <View className={styles.picker}>
                            <Text>婚姻状态</Text>
                            <Text>{this.maritalArr[maritalSelectIndex] || '请选择'}</Text>
                        </View>
                    </Picker>

                    <Picker
                        mode="selector"
                        range={this.childNumbers}
                        onChange={(e) => this.onChange(e, 'childNumber')}
                        value={childNumber || 0}
                    >
                        <View className={`${styles.picker} ${styles.noBorder}`}>
                            <Text>子女数</Text>
                            <Text>{childNumber || '请选择子女数'}</Text>
                        </View>
                    </Picker>
                </View>

                <View className={styles.whiteSpace} />

                <View className={styles.bodyInfo}>
                    <View className={styles.title}>身体信息</View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('height', '身高(cm)', height)
                        }}
                    >
                        <Text className={styles.info_title}>身高(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${height ? '' : styles.please_select}`}>
                                {height || '请输入身高'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('weight', '体重(kg)', weight)
                        }}
                    >
                        <Text className={styles.info_title}>体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${weight ? '' : styles.please_select}`}>
                                {weight || '请输入体重'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('standardWeight', '标准体重(kg)', standardWeight)
                        }}
                    >
                        <Text className={styles.info_title}>标准体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${standardWeight ? '' : styles.please_select}`}>
                                {standardWeight || '请输入标准体重'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('targetWeight', '目标体重(kg)', targetWeight)
                        }}
                    >
                        <Text className={styles.info_title}>目标体重(kg)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${targetWeight ? '' : styles.please_select}`}>
                                {targetWeight || '请输入目标体重'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('chest', '上臂围(cm)', chest)
                        }}
                    >
                        <Text className={styles.info_title}>上臂围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${chest ? '' : styles.please_select}`}>
                                {chest || '请输入上臂围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('upperArm', '胸围(cm)', upperArm)
                        }}
                    >
                        <Text className={styles.info_title}>胸围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${upperArm ? '' : styles.please_select}`}>
                                {upperArm || '请输入胸围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('waistline', '腰围(cm)', waistline)
                        }}
                    >
                        <Text className={styles.info_title}>腰围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${waistline ? '' : styles.please_select}`}>
                                {waistline || '请输入腰围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('hipline', '臀围(cm)', hipline)
                        }}
                    >
                        <Text className={styles.info_title}>臀围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${hipline ? '' : styles.please_select}`}>
                                {hipline || '请输入臀围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('leftLeg', '左大腿围(cm)', leftLeg)
                        }}
                    >
                        <Text className={styles.info_title}>左腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${leftLeg ? '' : styles.please_select}`}>
                                {leftLeg || '请输入左大腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('rightLeg', '右大腿围(cm)', rightLeg)
                        }}
                    >
                        <Text className={styles.info_title}>右腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${rightLeg ? '' : styles.please_select}`}>
                                {rightLeg || '请输入右大腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                    <View
                        className={styles.infoListItem}
                        onClick={() => {
                            this.goSetUserInfoPage('shank', '小腿围(cm)', shank)
                        }}
                    >
                        <Text className={styles.info_title}>小腿围(cm)</Text>
                        <View className={styles.info_value}>
                            <Text className={`${styles.info_value} ${shank ? '' : styles.please_select}`}>
                                {shank || '请输入小腿围'}
                            </Text>
                            <Image className={styles.setIcon} src={Icons.findMore} />
                        </View>
                    </View>
                </View>
                <View className={styles.whiteSpace} />
            </View>
        )
    }
}

export default EditInfo
