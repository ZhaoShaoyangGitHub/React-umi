import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StoreProps, StoreState } from './index.interface'
import styles from './Store.module.less'
import StoreItem from '../../components/StoreItem'
import { publicImages, PersonalImages } from '../../assets/img/load'

@connect(({ Store }) => ({
    ...Store,
}))
class Store extends Component<StoreProps, StoreState> {
    config: Config = {
        navigationBarTitleText: '门店',
    }
    constructor(props: StoreProps) {
        super(props)
        this.state = {
            shopId: 0,
            name: '',
            imageUrl: '',
            address: '',
        }
    }

    componentDidShow() {
        this.getShopDetails()
    }

    getShopDetails = () => {
        const { shopId } = this.$router.params
        if (shopId) {
            this.props.dispatch({
                type: 'Store/getShopDetails',
                payload: {
                    shopId,
                },
                cb: (data) => {
                    const { id, name, imageUrl, address } = data
                    this.setState({
                        shopId: id,
                        name,
                        imageUrl,
                        address,
                    })
                    Taro.setStorage({
                        key: 'storeInfo',
                        data: JSON.stringify({
                            name,
                            imageUrl,
                            address,
                        }),
                    })
                    Taro.setStorage({
                        key: 'shopId',
                        data: id,
                    })
                },
            })
        }
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }

    goOtherPage = (index) => {
        const { shopId } = this.state
        switch (index) {
            case 0:
                Taro.navigateTo({
                    url: `/pages/BusinessSituation/index?shopId=${shopId}`,
                })
                break

            case 1:
                Taro.navigateTo({
                    url: `/pages/StoreBalance/index?shopId=${shopId}`,
                })
                break
            case 2:
                Taro.navigateTo({
                    url: `/pages/AppointmentList/index?shopId=${shopId}`,
                })
                break
            case 3:
                Taro.navigateTo({
                    url: `/pages/TechnicianScheduling/index?shopId=${shopId}`,
                })
                break
            case 4:
                Taro.navigateTo({
                    url: `/pages/TechnicianList/index?shopId=${shopId}`,
                })
                break
            case 5:
                Taro.navigateTo({
                    url: `/pages/ServiceRecord/index?shopId=${shopId}`,
                })
                break
            case 6:
                Taro.navigateTo({
                    url: `/pages/StockList/index?shopId=${shopId}`,
                })
                break
            case 7:
                Taro.navigateTo({
                    url: `/pages/GoodList/index?shopId=${shopId}`,
                })
                break
            case 8:
                Taro.navigateTo({
                    url: `/pages/SaleOrderList/index?shopId=${shopId}`,
                })
                break
            case 9:
                break
        }
    }

    render() {
        const list = [
            {
                id: 0,
                title: '营业情况',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 1,
                title: '门店余额',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 2,
                title: '预约列表',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 3,
                title: '技师排班',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 4,
                title: '技师管理',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 5,
                title: '服务记录',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 6,
                title: '商品库存',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 7,
                title: '采购商品',
                iconUrl: PersonalImages.caseIcon1,
            },
            {
                id: 8,
                title: '销售订单',
                iconUrl: PersonalImages.caseIcon1,
            },
            // {
            //     id: 9,
            //     title: '售后退款',
            //     iconUrl: PersonalImages.caseIcon1,
            // },
        ]
        const { shopId, name, imageUrl, address } = this.state
        return (
            <View className={styles.StoreMain}>
                <StoreItem
                    storeTitle={name}
                    storeAddress={address}
                    storeImg={imageUrl && JSON.parse(imageUrl)[0].file}
                    nameStyles={{ fontSize: '32rpx' }}
                    onHandleClick={() => {
                        this.goStorePage(shopId)
                    }}
                >
                    <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                </StoreItem>
                <View className={styles.personalWrapper}>
                    {list.map((item) => {
                        return (
                            <View
                                className={styles.personalBox}
                                key={item.id}
                                onClick={() => {
                                    this.goOtherPage(item.id)
                                }}
                            >
                                <View className={styles.listItem}>
                                    <View className={styles.left}>
                                        <Image src={item.iconUrl} mode="widthFix" className={styles.icon} />
                                        <Text>{item.title}</Text>
                                    </View>
                                    <View className={styles.right}>
                                        <Image
                                            src={publicImages.jumpIcon}
                                            mode="widthFix"
                                            className={styles.jumpIcon}
                                        />
                                    </View>
                                </View>
                                <View
                                    className={
                                        item.id !== 2 &&
                                        item.id !== 3 &&
                                        item.id !== 4 &&
                                        item.id !== 6 &&
                                        item.id !== 8
                                            ? styles.marginBottom
                                            : styles.line
                                    }
                                ></View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default Store
