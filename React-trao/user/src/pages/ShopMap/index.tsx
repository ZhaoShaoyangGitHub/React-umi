import Taro, { Component } from '@tarojs/taro'
import { View, Map, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ShopMapProps, ShopMapState } from './index.interface'
import { order } from '../../assets/img/load'
import styles from './ShopMap.module.less'

@connect(({ ShopMap, loading }) => ({
    ...ShopMap,
    loading,
}))
class ShopMap extends Component<ShopMapProps, ShopMapState> {
    config: Taro.Config = {
        navigationBarTitleText: '商城',
    }
    constructor(props: ShopMapProps) {
        super(props)
        this.state = {
            shopList: [],
        }
    }

    componentDidShow() {
        this.getList()
    }

    getList = () => {
        this.props.dispatch({
            type: 'ShopSearch/shopSearch',
            params: { pageIndex: 1, pageSize: 50, keyword: '' },
            cb: (data) => {
                const shopList = data.list.map((item) => {
                    return {
                        iconPath: order.locate,
                        id: item.id,
                        latitude: Number.parseFloat(item.latitude),
                        longitude: Number.parseFloat(item.longitude),
                        width: 30,
                        height: 36,
                        type: typeof Number.parseFloat(item.latitude),
                    }
                })

                this.setState({ shopList }, () => {
                    Taro.hideLoading()
                })
            },
        })
    }

    render() {
        const { shopList } = this.state
        const currentLocationInfo =
            Taro.getStorageSync('currentLocationInfo') && JSON.parse(Taro.getStorageSync('currentLocationInfo'))
        return (
            <View className={styles.ShopMapMain}>
                <Map
                    id="map"
                    longitude={currentLocationInfo.longitude}
                    latitude={currentLocationInfo.latitude}
                    scale={13}
                    // bindcontroltap="controltap"
                    markers={shopList}
                    // bindregionchange="regionchange"
                    // show-location
                    style={{ height: '100vh', width: '100%' }}
                ></Map>
            </View>
        )
    }
}

export default ShopMap
