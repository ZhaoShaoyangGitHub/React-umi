import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { EmptyImg, Icons } from '../../assets/img/load'
import { AddressManageProps, AddressManageState, Address } from './index.interface'
import styles from './AddressManage.module.less'

@connect(({ AddressManage }) => ({
    ...AddressManage,
}))
class AddressManage extends Component<AddressManageProps, AddressManageState> {
    config: Config = {
        navigationBarTitleText: '选择收货地址',
    }
    constructor(props: AddressManageProps) {
        super(props)
        this.state = {}
    }

    componentDidShow() {
        this.getAddressList()
    }
    getAddressList = () => {
        this.props.dispatch({
            type: 'AddressManage/getList',
        })
    }
    gotoEdit = (e: any, item?: Address) => {
        e.stopPropagation()
        const { from } = this.$router.params
        this.props.dispatch({
            type: 'AddressEdit/save',
            payload: {
                currentAddress: item || {},
            },
        })
        Taro.navigateTo({
            url: `/pages/AddressEdit/index?from=${from}`,
        })
    }
    backToOrderConfirm = (item: Address) => {
        console.log('跳转到订单确认 当前地址:', item)
        const { from } = this.$router.params
        console.log('from', from)
        if (from === 'OrderConfirm') {
            this.props.dispatch({
                type: 'OrderConfirm/save',
                payload: {
                    currentAddress: item,
                },
            })
            Taro.navigateBack()
        }
    }
    render() {
        const { addressList } = this.props
        let isDefaultAddress = true
        if (!addressList.length) {
            return (
                <View className={styles.emptyWrapper}>
                    <Image className={styles.emptyImg} src={EmptyImg.emptyAddress} />
                    <Text className={styles.emptyWord}>暂时没有收货地址呦～</Text>
                    <View className={styles.emptyButtonWrapper}>
                        <View className={styles.emptyButton} onClick={this.gotoEdit}>
                            去添加
                        </View>
                    </View>
                </View>
            )
        } else {
            addressList.map((item: Address) => {
                if (item.isDefault.value === 1) {
                    isDefaultAddress = false
                    return
                }
            })
        }
        return (
            <View className={styles.AddressManageMain}>
                <View className={styles.addressWrapper}>
                    {addressList.map((item: Address, index) => {
                        const { id: addressId, province, city, district, address, phone, name, isDefault } = item
                        return (
                            <View className={styles.addressItem} key={addressId}>
                                <View className={styles.center} onClick={() => this.backToOrderConfirm(item)}>
                                    <View className={styles.centerTop}>
                                        <Text className={styles.ellipsis}>{name}</Text>
                                        <Text className={styles.light}>{phone}</Text>
                                        {(isDefaultAddress && index === 0) || isDefault.value === 1 ? (
                                            <Text className={styles.default}>默认地址</Text>
                                        ) : (
                                            ''
                                        )}
                                    </View>
                                    <View className={styles.centerBottom}>
                                        <Text className={styles.ellipsis}>
                                            {province} {city} {district} {address}
                                        </Text>
                                    </View>
                                </View>

                                <View className={styles.right} onClick={(e) => this.gotoEdit(e, item)}>
                                    <Image src={Icons.findMore} className={styles.arrowIcon} />
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View className={styles.buttonWrapper} onClick={(e) => this.gotoEdit(e)}>
                    <View className={styles.button}>+ 新增收货地址</View>
                </View>
            </View>
        )
    }
}

export default AddressManage
