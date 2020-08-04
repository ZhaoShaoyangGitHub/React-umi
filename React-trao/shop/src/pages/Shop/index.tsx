/* eslint-disable import/no-duplicates */
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ShopProps, ShopState } from './index.interface'
import styles from './Shop.module.less'
import middleMenuMy from '../../assets/img/shop/middle-menu-my.png'
import singleItemArrow from '../../assets/img/shop/single-item-arrow.png'
import { publicImages } from '../../assets/img/load'
import { BASEURL } from '../../config/index'

@connect(({ Shop }) => ({
    ...Shop,
}))
class Shop extends Component<ShopProps, ShopState> {
    config: Config = {
        navigationBarTitleText: '门店',
    }
    constructor(props: ShopProps) {
        super(props)
        this.state = {
            shopDetails: {},
        }
    }

    componentDidMount() {
        this.getShopInfo()
    }

    getShopInfo = () => {
        this.props.dispatch({
            type: 'Shop/getShopInfo',
            cb: (data) => {
                if (data) {
                    this.setState({
                        shopDetails: data,
                    })
                }
            },
        })
    }
    handleMenuClick = (menuItem: any) => {
        Taro.navigateTo({
            url: menuItem.url,
        })
    }
    switchItem = (id) => {
        console.log(id)
        switch (id) {
            case 0:
                Taro.navigateTo({
                    url: '/pages/StockList/index',
                })
                break
            case 1:
                Taro.navigateTo({
                    url: '/pages/AppointmentList/index',
                })
                break
            case 2:
                Taro.navigateTo({
                    url: '/pages/TechnicianScheduling/index',
                })
                break
            case 3:
                Taro.navigateTo({
                    url: '/pages/TechnicianList/index',
                })
                break
            case 4:
                Taro.navigateTo({
                    url: '/pages/SaleOrderList/index',
                })
                break
            case 5:
                break
            case 6:
                Taro.navigateTo({
                    url: '/pages/ServiceRecord/index',
                })
                break
            case 7:
                Taro.navigateTo({
                    url: '/pages/BusinessSituation/index',
                })
                break
            default:
                return
        }
    }
    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }

    render() {
        const { shopDetails } = this.state
        return (
            <View className={styles.ShopMain}>
                <View className={styles.topUserInfo} onClick={() => this.goStorePage(shopDetails.id)}>
                    <View className={styles.avatar}>
                        {shopDetails.coverUrl && shopDetails.coverUrl.length && (
                            <Image className={styles.avatarImg} src={BASEURL + shopDetails.coverUrl[0]} />
                        )}
                    </View>
                    <View className={styles.userInfo}>
                        <View className={styles.infoTop}>
                            <View className={styles.name}>{shopDetails.name}</View>
                        </View>
                        <View className={styles.infoBottom}>
                            <View className={styles.address}>
                                <Image
                                    src={publicImages.locationIcon}
                                    className={styles.userAddressIconImg}
                                    mode="widthFix"
                                />
                                <View className={styles.addressWord}>
                                    {shopDetails.city} {shopDetails.area}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={styles.singleMenu}>{this.renderList()}</View>
            </View>
        )
    }

    renderList = () => {
        const bottomMenuArr = [
            { id: 0, title: '商品库存' },
            { id: -1, title: '_' },
            { id: 1, title: '预约列表' },
            { id: 2, title: '技师排班' },
            { id: 3, title: '技师管理' },
            { id: -1, title: '_' },
            { id: 4, title: '销售订单' },
            // { id: 5, title: '售后退款' },
            { id: 6, title: '服务记录' },
            { id: -1, title: '_' },
            { id: 7, title: '营业情况' },
        ]
        return bottomMenuArr.map((item) => {
            return item.id === -1 ? (
                <View className={styles.space}></View>
            ) : (
                <View
                    key={item.id}
                    className={styles.singleMenuItem}
                    onClick={() => {
                        this.switchItem(item.id)
                    }}
                >
                    <Image className={styles.middleMenuItemImg} src={middleMenuMy} />
                    <View className={styles.middleMenuItemTitle}>{item.title}</View>
                    <Image className={styles.singleItemArrowImg} src={singleItemArrow} />
                    <View className={styles.underLine} />
                </View>
            )
        })
    }
}

export default Shop
