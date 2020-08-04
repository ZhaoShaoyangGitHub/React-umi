import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MyPackageDetailProps, MyPackageDetailState } from './index.interface'
import styles from './MyPackageDetail.module.less'
import PackItem from '../../components/PackItem'
// import TitleSession from '../../components/TitleSession/index'
import RecordItem from '../../components/RecordItem/index'
import { BASEURL } from '../../config/index'
import { EmptyImg } from '../../assets/img/load'

@connect(({ MyPackage }) => ({
    ...MyPackage,
}))
class MyPackageDetail extends Component<MyPackageDetailProps, MyPackageDetailState> {
    config: Config = {
        navigationBarTitleText: '套餐详情',
    }
    constructor(props: MyPackageDetailProps) {
        super(props)
        this.state = {
            itemsList: [],
            packageInfo: {},
            recordList: [],
        }
    }

    componentDidShow = () => {
        const info = Taro.getStorageSync('currentPackageInfo')
        this.setState({
            packageInfo: info,
        })
        this.props.dispatch({
            type: 'PackageSelect/getPackageDetail',
            params: { id: info.orderId },
            cb: (data) => {
                console.log('套餐:', data)
                if (Array.isArray(data)) {
                    this.setState({ itemsList: data })
                }
            },
        })
        this.props.dispatch({
            type: 'MyPackageDetail/getPackageServiceRecord',
            params: { id: info.orderId },
            cb: (data) => {
                const list = data.map((item) => ({
                    staffName: item.staffUserName,
                    packageTitle: info.packageName,
                    serviceTitle: item.packageProjectName,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    staffNumber: item.staffUserWorkNumber,
                    weight: item.weight,
                }))
                this.setState({ recordList: list })
            },
        })
    }

    componentDidMount() {}

    render() {
        const { itemsList, packageInfo, recordList } = this.state
        return (
            <View className={styles.container}>
                <PackItem
                    imgSrc={BASEURL + packageInfo.packageImage}
                    title={packageInfo.packageName}
                    showObj={packageInfo.packageOrderProjectRecordResponseList}
                    orderId={packageInfo.orderId}
                    packageStatus={packageInfo.packageStatus}
                    btnObj={{
                        title: '',
                        cb: '',
                    }}
                    onHandleSuitClick={() => {}}
                    isShowStatus
                    efficacy={packageInfo.efficacy}
                />

                <View className={styles.TitleSessionMain}>
                    <View className={styles.titleSession}>
                        <View className={styles.titleBox}>
                            <View className={styles.leftBorder} />
                            <View className={styles.title}>服务项目</View>
                        </View>
                    </View>
                </View>
                {/* <TitleSession title="服务项目" /> */}
                <View className={styles.serviceNum}>
                    {itemsList.map((item) => (
                        <View className={styles.numItem}>
                            <Text>
                                {item.projectName}共{item.validNumber}次
                            </Text>
                            <Text>剩余{item.validNumber - (item.usedNumber || 0)}次</Text>
                        </View>
                    ))}
                </View>
                <View className={styles.TitleSessionMain}>
                    <View className={styles.titleSession}>
                        <View className={styles.titleBox}>
                            <View className={styles.leftBorder} />
                            <View className={styles.title}>历史记录</View>
                        </View>
                    </View>
                </View>
                {/* <TitleSession title="历史记录" /> */}
                {recordList.length > 0 ? (
                    <View>
                        {recordList.map((item, index) => (
                            <RecordItem recordInfo={item} index={recordList.length - index} />
                        ))}
                    </View>
                ) : (
                    <View>
                        <Image src={EmptyImg.emptyPackage} className={styles.noDataImg} />
                        <View className={styles.word}>暂时没有服务记录</View>
                    </View>
                )}
            </View>
        )
    }
}

export default MyPackageDetail
