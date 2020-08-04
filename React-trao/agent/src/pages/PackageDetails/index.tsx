import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PackageDetailsProps, PackageDetailsState } from './index.interface'
import styles from './PackageDetails.module.less'
import { BASEURL } from '../../config/index'
import SelectStoreItem from '../../components/SelectStoreItem'
import { publicImages } from '../../assets/img/load'

@connect(({ MyPackage }) => ({
    ...MyPackage,
}))
class PackageDetails extends Component<PackageDetailsProps, PackageDetailsState> {
    config: Config = {
        navigationBarTitleText: '套餐详情',
    }
    constructor(props: PackageDetailsProps) {
        super(props)
        this.state = {
            status: 1, // 状态{1:未上架,2:上架中,3:已下架}
            id: 23,
            packageDetails: {},
            storeList: [],
            isSelectedAll: false,
        }
    }

    componentDidMount() {
        const { id } = this.$router.params
        if (id) {
            this.setState(
                {
                    id: +id,
                },
                () => {
                    this.getPackageDetails()
                },
            )
        }
    }

    getPackageDetails = () => {
        const { id, storeList } = this.state
        this.props.dispatch({
            type: 'MyPackage/getPackageDetail',
            payload: {
                id,
            },
            cb: (data) => {
                console.log(data)
                if (data) {
                    if (data.status && data.status.value === 2 && data.shopResponses.length > 0) {
                        data.shopResponses.map((item) => {
                            storeList.push({
                                id: item.id,
                                name: item.name,
                                selected: false,
                            })
                        })

                        this.setState({
                            storeList,
                        })
                    }
                    this.setState({
                        packageDetails: data,
                    })
                }
            },
        })
    }

    isSelectAllStore = () => {
        let { storeList, isSelectedAll } = this.state
        isSelectedAll = !isSelectedAll
        storeList.map((item, index) => {
            storeList[index].selected = isSelectedAll
        })
        this.setState({
            storeList,
            isSelectedAll,
        })
    }

    isSelectStore = (index) => {
        let { storeList, isSelectedAll } = this.state
        storeList[index].selected = !storeList[index].selected
        isSelectedAll = true
        storeList.map((item) => {
            if (item.selected === false) {
                isSelectedAll = false
                return
            }
        })
        this.setState({
            storeList,
            isSelectedAll,
        })
    }

    upDownStore = () => {
        const { storeList, id } = this.state
        let shopIds: Array<number> = []
        storeList.map((item) => {
            if (item.selected === true) {
                shopIds.push(item.id)
            }
        })
        if (shopIds.length < 1) {
            Taro.showToast({
                title: '请选择下架门店',
                mask: true,
                icon: 'none',
            })
        }
        this.props.dispatch({
            type: 'MyPackage/upDownPackageStore',
            payload: {
                packageId: id,
                shopIds,
                status: 2, //类型{1:上架,2:下架}
            },
            cb: (data) => {
                Taro.showToast({
                    title: '下架成功',
                    mask: true,
                })
                Taro.navigateBack()
            },
        })
    }

    render() {
        const { packageDetails, isSelectedAll, storeList } = this.state
        return (
            <View className={styles.PackageDetailsMain}>
                <View className={styles.comTitle}>套餐详情</View>
                <View className={styles.content}>
                    <View className={styles.packageDetailsItem}>
                        <View className={styles.left}>套餐图片</View>
                        <View className={styles.images}>
                            <View className={styles.backgroundCover}>
                                {packageDetails.imageUrl && (
                                    <Image
                                        src={BASEURL + packageDetails.imageUrl}
                                        mode="widthFix"
                                        className={styles.cover}
                                    />
                                )}
                                <View className={styles.text}>封面</View>
                            </View>
                            <View className={styles.imageListBox}></View>
                        </View>
                    </View>
                    <View className={styles.packageDetailsItem}>
                        <View className={styles.left}>套餐名称</View>
                        <View className={styles.baseInfo}>{packageDetails.name}</View>
                    </View>
                    <View className={styles.packageDetailsItem}>
                        <View className={styles.left}>套餐价格</View>
                        <View className={styles.packagePrice}>¥{packageDetails.marketPrice}</View>
                    </View>
                    <View className={styles.packageDetailsItem}>
                        <View className={styles.left}>套餐简介</View>
                        <View className={styles.baseInfo}>{packageDetails.efficacy}</View>
                    </View>
                    <View className={styles.packageDetailsItem}>
                        <View className={styles.left}>服务项目</View>
                        <View className={styles.baseInfo}>
                            {packageDetails.projectResponses &&
                                packageDetails.projectResponses.length > 0 &&
                                packageDetails.projectResponses.map((item) => {
                                    return (
                                        <View key={item.id}>
                                            {item.projectName}x{item.projectNumber}
                                        </View>
                                    )
                                })}
                            <View></View>
                        </View>
                    </View>
                </View>
                {packageDetails.status && (
                    <View>
                        <View className={styles.comTitle}>
                            {packageDetails.status.value === 2 ? '上' : '下'}架门店列表
                        </View>
                        <View className={styles.storeList}>
                            {packageDetails.status && packageDetails.status.value === 2 && storeList.length > 0 && (
                                <View>
                                    <View className={styles.storeListItem} onClick={this.isSelectAllStore}>
                                        <View className={styles.storeName}>全部门店</View>
                                        <View className={styles.selectDot}>
                                            {isSelectedAll && (
                                                <Image
                                                    src={publicImages.selectedIcon}
                                                    mode="widthFix"
                                                    className={styles.selectedIcon}
                                                ></Image>
                                            )}
                                        </View>
                                    </View>
                                    {storeList.map((item, index) => {
                                        return (
                                            <SelectStoreItem
                                                item={item}
                                                key={item.id}
                                                showSelect={true}
                                                onHandleClick={() => {
                                                    this.isSelectStore(index)
                                                }}
                                            />
                                        )
                                    })}
                                </View>
                            )}
                            {packageDetails.status.value === 3 &&
                                packageDetails.shopResponses.length > 0 &&
                                packageDetails.shopResponses.map((item) => {
                                    return <SelectStoreItem item={item} key={item.id} showSelect={false} />
                                })}
                        </View>
                        {packageDetails.status.value === 2 && storeList.length > 0 && (
                            <View className={styles.addBtn} onClick={this.upDownStore}>
                                确定下架
                            </View>
                        )}
                    </View>
                )}
            </View>
        )
    }
}

export default PackageDetails
