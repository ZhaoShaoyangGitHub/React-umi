import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { SuitStoreProps, SuitStoreState } from './index.interface'
import ShopItem from '../../components/ShopItem/index'
import styles from './SuitStore.module.less'

@connect(({ SuitStore }) => ({
    ...SuitStore,
}))
class SuitStore extends Component<SuitStoreProps, SuitStoreState> {
    config: Config = {
        navigationBarTitleText: '适用门店',
    }
    constructor(props: SuitStoreProps) {
        super(props)
        this.state = {
            suitShopData: [],
        }
    }

    componentDidMount() {
        console.log(this.$router.params)
        const query = this.$router.params
        // const query = { id: 3 }
        switch (query.type) {
            case 'pack':
                this.props.dispatch({
                    type: 'PackageDetail/getPackDetail',
                    params: { id: query.id },
                    cb: (data) => {
                        console.log(data)
                        this.setState({ suitShopData: data.shopResponses }, () => {
                            console.log(this.state.suitShopData)
                        })
                    },
                })
                break
            case 'goods':
                this.props.dispatch({
                    type: 'GoodsDetail/getGoodsDetail',
                    params: { id: query.id },
                    cb: (data) => {
                        console.log(data)
                        this.setState({ suitShopData: data.shopResponses }, () => {
                            console.log(this.state.suitShopData)
                        })
                    },
                })
                break

            default:
        }
    }

    handleSelectShop = (id: number) => {
        Taro.setStorageSync('packageShopId', id)
        Taro.navigateBack()
    }

    render() {
        const { suitShopData } = this.state
        return (
            <View className={styles.SuitStoreMain}>
                {suitShopData.map((item) => {
                    return (
                        <ShopItem
                            onHandleClick={() => {
                                console.log(item)
                                Taro.navigateTo({
                                    url: '/pages/StoreDetail/index?id=' + item.id,
                                })
                            }}
                            key={item.id}
                            shopImg={item.coverUrl[0]}
                            shopTitle={item.name}
                            shopAddress={item.province + ' ' + item.city + ' ' + item.area}
                            shopPhoneNum={item.phone}
                            isSelect
                            propsStyles={{ marginBottom: '30rpx' }}
                            handleSelectShop={() => this.handleSelectShop(item.id)}
                            // shopDistance="1.2km"
                        />
                    )
                })}
            </View>
        )
    }
}

export default SuitStore
