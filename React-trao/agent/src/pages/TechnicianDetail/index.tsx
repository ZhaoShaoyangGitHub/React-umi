import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { BASEURL } from '../../config/index'
import { TechnicianDetailProps, TechnicianDetailState } from './index.interface'
import styles from './TechnicianDetail.module.less'
import { publicImages } from '../../assets/img/load'

@connect(({ TechnicianDetail }) => ({
    ...TechnicianDetail,
}))
class TechnicianDetail extends Component<TechnicianDetailProps, TechnicianDetailState> {
    config: Config = {
        navigationBarTitleText: '技师详情',
    }
    constructor(props: TechnicianDetailProps) {
        super(props)
        this.state = {
            isFetching: false,
            technicianId: 0,
            technicianInfo: {},
        }
    }

    componentDidShow = () => {
        // isAppointment  支付状态{1:已预约,2:未预约}
        // keyword	用户名称/手机号
        const { id } = this.$router.params
        this.setState(
            {
                technicianId: Number.parseInt(id, 10) || 2,
            },
            () => {
                this.getDetail()
            },
        )
    }

    getDetail = () => {
        const { isFetching, technicianId } = this.state
        Taro.showLoading({ title: '' })
        if (!isFetching) {
            this.setState({ isFetching: true })
            this.props.dispatch({
                type: 'TechnicianDetail/getTechnicianDetail',
                params: { id: technicianId },
                cb: (data) => {
                    Taro.hideLoading()
                    this.setState({
                        technicianInfo: data,
                    })
                },
            })
        }
    }

    render() {
        const { technicianInfo } = this.state
        return (
            <View className={styles.TechnicianDetailMain}>
                <View className={styles.content}>
                    <View className={styles.technicianItem}>
                        <View className={styles.left}>
                            <Image src={technicianInfo.avatar ? BASEURL + technicianInfo.avatar : publicImages.test} />
                            <View className={styles.del}>
                                <Text>{technicianInfo.name}</Text>
                                <Text>工号：{technicianInfo.workNumber}</Text>
                            </View>
                        </View>

                        <View className={styles.tag}>
                            <Image src={publicImages.addressIcon} />
                            <Text>
                                {technicianInfo.province} {technicianInfo.city}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className={styles.otherInfo}>
                    <View className={styles.infoBlock}>
                        <Text>手机号</Text>
                        <Text>{technicianInfo.phone}</Text>
                    </View>
                    <View className={styles.infoBlock}>
                        <Text>身份证号</Text>
                        <Text>{technicianInfo.idCard}</Text>
                    </View>
                    <View className={styles.infoBlock}>
                        <Text>地址</Text>
                        <Text>
                            {technicianInfo.province}
                            {technicianInfo.city}
                            {technicianInfo.area}
                            {technicianInfo.address}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default TechnicianDetail
