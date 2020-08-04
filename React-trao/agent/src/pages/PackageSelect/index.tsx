import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { PackageSelectProps, PackageSelectState } from './index.interface'
import styles from './PackageSelect.module.less'
import SelectStoreItem from '../../components/SelectStoreItem'

@connect(({ MyPackage, ChooseStore }) => ({
    ...MyPackage,
    ...ChooseStore,
}))
class PackageSelect extends Component<PackageSelectProps, PackageSelectState> {
    config: Config = {
        navigationBarTitleText: '门店选择',
    }
    constructor(props: PackageSelectProps) {
        super(props)
        this.state = {
            pageInfo: {
                currentPageIndex: 1,
                totalPage: 0,
                pageSize: 0,
            },
            list: [],
        }
    }

    componentDidMount() {
        const { status } = this.$router.params
        if (status === '1') {
            this.getStoreList()
            Taro.setNavigationBarTitle({
                title: '门店选择',
            })
        }
        if (status === '2') {
            this.getServiceProject()
            Taro.setNavigationBarTitle({
                title: '套餐选择',
            })
        }
    }

    getStoreList = () => {
        Taro.showLoading({
            title: '加载中',
            mask: true,
        })
        const { pageInfo } = this.state
        this.props.dispatch({
            type: 'ChooseStore/getStoreList',
            payload: {
                name: '',
                pageIndex: pageInfo.currentPageIndex,
            },
            cb: (data) => {
                if (data) {
                    const { list, pageIndex, pageSize, totalPage } = data
                    let storeList: any = []
                    if (list && list.length > 0) {
                        list.map((item) => {
                            storeList.push({
                                id: item.id,
                                name: item.name,
                                selected: false,
                            })
                        })
                    }
                    this.setState({
                        list: storeList,
                        pageInfo: {
                            currentPageIndex: pageIndex,
                            pageSize,
                            totalPage,
                        },
                    })
                }
                Taro.hideLoading()
            },
        })
    }

    getServiceProject = () => {
        this.props.dispatch({
            type: 'MyPackage/getServiceProject',
            payload: {
                pageIndex: 1,
            },
            cb: (data) => {
                const { list, pageIndex, pageSize, totalPage } = data
                let storeList: any = []
                if (list && list.length > 0) {
                    list.map((item) => {
                        storeList.push({
                            id: item.value,
                            name: item.label,
                            selected: false,
                        })
                    })
                }
                this.setState({
                    list: storeList,
                    pageInfo: {
                        currentPageIndex: pageIndex,
                        pageSize,
                        totalPage,
                    },
                })
            },
        })
    }

    isSelectStore = (index) => {
        let { list } = this.state
        list[index].selected = !list[index].selected
        this.setState({
            list,
        })
    }

    confirmAdd = () => {
        const { status } = this.$router.params
        let { list } = this.state
        let storeIds: any = []
        list.map((item) => {
            if (item.selected) {
                storeIds.push({
                    id: item.id,
                    name: item.name,
                })
            }
        })
        let key: string = ''
        if (status === '1') {
            key = 'storeIds'
        }
        if (status === '2') {
            key = 'projectIds'
        }
        Taro.setStorage({
            key,
            data: JSON.stringify(storeIds),
            success: () => {
                Taro.navigateBack()
            },
        })
    }

    render() {
        const { list } = this.state
        return (
            <View className={styles.PackageSelectMain}>
                {list && list.length > 0 && (
                    <View className={styles.PackageSelectWrapper}>
                        <View className={styles.storeList}>
                            {list.map((item, index) => {
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
                        <View className={styles.addBtn} onClick={this.confirmAdd}>
                            确定
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default PackageSelect
