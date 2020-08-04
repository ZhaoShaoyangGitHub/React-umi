import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { MyPackageProps, MyPackageState } from './index.interface'
import styles from './MyPackage.module.less'
import NoSearchData from '../../components/NoSearchData'
import { BASEURL } from '../../config/index'

@connect(({ MyPackage }) => ({
    ...MyPackage,
}))
class MyPackage extends Component<MyPackageProps, MyPackageState> {
    config: Config = {
        navigationBarTitleText: '我的套餐',
    }
    constructor(props: MyPackageProps) {
        super(props)
        this.state = {
            current: 0,
            packageList: [],
        }
    }

    componentDidMount() {
        this.getPackageList()
    }

    handleClick = (value) => {
        this.setState(
            {
                current: value,
            },
            () => {
                this.getPackageList()
            },
        )
    }

    getPackageList = () => {
        this.props.dispatch({
            type: 'MyPackage/getGoodsPackage',
            payload: {
                pageIndex: 1,
                status: this.state.current + 2,
            },
            cb: (data) => {
                if (data && data.list) {
                    this.setState({
                        packageList: data.list,
                    })
                }
            },
        })
    }

    goDetailsPage = (id) => {
        // 状态{1:未上架,2:上架中,3:已下架}
        Taro.navigateTo({
            url: `/pages/PackageDetails/index?id=${id}`,
        })
    }

    goAddPackagePage = () => {
        Taro.removeStorage({
            key: 'storeIds',
        })
        Taro.removeStorage({
            key: 'projectIds',
        })
        Taro.navigateTo({
            url: '/pages/AddPackage/index',
        })
    }

    render() {
        const { current, packageList } = this.state
        const tabList = [{ title: '已上架' }, { title: '已下架' }]
        return (
            <View className={styles.MyPackageMain}>
                <View className={styles.fixedTab}>
                    <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}></AtTabs>
                </View>
                <View className={styles.MyPackageWrapper}>
                    {packageList && packageList.length ? (
                        <View className={styles.packageList}>
                            {packageList.map((item) => {
                                return (
                                    <View
                                        className={styles.packageListItem}
                                        key={item}
                                        onClick={() => {
                                            this.goDetailsPage(item.id)
                                        }}
                                    >
                                        <View className={styles.packageImage}>
                                            <Image
                                                src={BASEURL + item.imageUrl}
                                                mode="widthFix"
                                                className={styles.image}
                                            />
                                        </View>
                                        <View className={styles.packageInfo}>
                                            <View>
                                                <View className={styles.packageName}>{item.name}</View>
                                                <View className={styles.packageProject}>
                                                    服务项目：{item.type.value}次{item.name}
                                                </View>
                                            </View>
                                            <View className={styles.packagePrice}>
                                                ¥<Text className={styles.price}>{item.marketPrice}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    ) : (
                        <NoSearchData text="套餐记录" />
                    )}
                </View>
                <View className={styles.addBtn} onClick={this.goAddPackagePage}>
                    添加套餐
                </View>
            </View>
        )
    }
}

export default MyPackage
