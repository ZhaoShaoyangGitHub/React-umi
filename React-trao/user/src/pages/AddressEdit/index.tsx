import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Switch, Picker, Textarea, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AddressEditProps, AddressEditState } from './index.interface'
import { flatten } from '../../utils/function'
import styles from './AddressEdit.module.less'
interface Province {
    provinceName: string
    cityList: Array<City>
    [propName: string]: any
}
interface City {
    cityName: string
    districtList: Array<District>
    [propName: string]: any
}
interface District {
    districtname: string
    [propName: string]: any
}
@connect(({ AddressEdit, AddressManage }) => ({
    ...AddressEdit,
    addressList: AddressManage.addressList,
}))
class AddressEdit extends Component<AddressEditProps, AddressEditState> {
    config: Config = {
        navigationBarTitleText: '编辑收货地址',
    }
    constructor(props: AddressEditProps) {
        super(props)
        this.state = {
            addressId: '',
            areaData: [[], [], []],
            isDefault: true,
            currentSelector: [0, 0, 0],
            province: '',
            city: '',
            district: '',
            address: '',
            name: '',
            phone: '',
        }
    }

    componentDidMount() {
        this.getCurrentData()
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'AddressEdit/save',
            payload: {
                currentAddress: {},
            },
        })
    }
    getCurrentData = () => {
        const areaInfo = Taro.getStorageSync('areaInfo')
        const { currentAddress } = this.props
        const originProvinces = flatten(areaInfo)
        const provinces = originProvinces.map((province: Province) => province.provinceName)
        if (currentAddress && JSON.stringify(currentAddress) !== '{}') {
            this.setState({
                addressId: currentAddress.id,
                isDefault: Boolean(currentAddress.isDefault && currentAddress.isDefault.value === 1),
                province: currentAddress.province,
                city: currentAddress.city,
                district: currentAddress.district,
                address: currentAddress.address,
                name: currentAddress.name,
                phone: currentAddress.phone,
            })
            // 地址初始值
            const provinceIndex = provinces.findIndex((province: string) => province === currentAddress.province)
            const originCities = flatten(
                originProvinces.find((province: Province) => province.provinceName === currentAddress.province)
                    .cityList,
            )
            const cities = originCities.map((city: City) => city.cityName)
            const cityIndex = cities.findIndex((city: string) => city === currentAddress.city)
            const originDistricts = flatten(
                originCities.find((city: City) => city.cityName === currentAddress.city).districtList,
            )
            const districts = originDistricts.map((district: District) => district.districtName)
            const districtIndex =
                districts && districts.findIndex((district: string) => currentAddress.district === district)
            this.setState({
                // 地址初始值
                areaData: [provinces, cities, districts],
                currentSelector: [provinceIndex, cityIndex, districtIndex],
            })
        } else {
            const cities = flatten(areaInfo[0].cityList).map((city: City) => city.cityName)
            const districts = flatten(areaInfo[0].cityList[0].districtList).map(
                (district: District) => district.districtName,
            )
            this.setState({
                areaData: [provinces, cities, districts],
                currentSelector: [0, 0, 0],
            })
        }
    }
    handleChange = (value: string, attr: string) => {
        this.setState({
            [attr]: value,
        })
    }
    handleAreaChange = (value) => {
        const { areaData } = this.state
        this.setState({
            province: areaData[0][value[0]],
            city: areaData[1][value[1]],
            district: areaData[2][value[2]],
        })
    }
    handleColumnChange = (column: number, value: number) => {
        const { currentSelector, areaData } = this.state
        const areaInfo = Taro.getStorageSync('areaInfo')
        const [provinces, cities, districts] = areaData
        const newTempSeletor = currentSelector.slice()
        newTempSeletor[column] = value
        for (let i = column + 1; i < 3; i++) {
            newTempSeletor[i] = 0
        }
        this.setState(
            {
                currentSelector: newTempSeletor,
            },
            () => {
                if (column !== 2) {
                    let newProvinceName: string
                    let newCityName: string
                    let newProvinceData: Province
                    let newCityData: City | undefined
                    let oldProvinceData: Province
                    let newCities: Array<string> = cities
                    let newDistricts: Array<string> = districts
                    switch (column) {
                        case 0:
                            newProvinceName = provinces[value]
                            newProvinceData = areaInfo.find(
                                (province: Province) => province.provinceName === newProvinceName,
                            )
                            newCities = flatten(newProvinceData.cityList).map((city: City) => city.cityName)
                            newDistricts = flatten(newProvinceData.cityList[0].districtList).map(
                                (district: any) => district.districtName,
                            )
                            break
                        case 1:
                            newCityName = cities[value]
                            oldProvinceData = areaInfo.find(
                                (province: Province) => province.provinceName === provinces[currentSelector[0]],
                            )
                            newCityData = oldProvinceData.cityList.find((city: City) => city.cityName === newCityName)
                            newDistricts =
                                newCityData &&
                                flatten(newCityData.districtList).map((district: any) => district.districtName)
                            break
                        default:
                            break
                    }
                    this.setState({
                        areaData: [provinces, newCities, newDistricts],
                    })
                }
            },
        )
    }
    handleSave = () => {
        const { addressId: id, name, phone, province, city, district, address, isDefault } = this.state
        if (name && phone && province && city && address) {
            let actionName = ''
            if (id) {
                actionName = 'AddressEdit/update'
            } else {
                actionName = 'AddressEdit/add'
            }
            this.props.dispatch({
                type: actionName,
                payload: {
                    address,
                    city,
                    district,
                    id,
                    isDefault: isDefault ? 1 : 2, // 1 是 2 否 fo了
                    name,
                    phone,
                    province,
                    zip: '',
                },
                callback: () => {
                    // const { from } = this.$router.params
                    // Taro.navigateTo({
                    //     url: `/pages/AddressManage/index?from=${from}`,
                    // })
                    Taro.navigateBack({ delta: 1 })
                },
            })
        } else {
            Taro.showToast({
                title: '信息不完整',
                icon: 'none',
            })
        }
    }
    handleDelete = () => {
        const { addressId } = this.state
        this.props.dispatch({
            type: 'AddressEdit/delete',
            payload: {
                id: addressId,
            },
            callback: () => {
                Taro.navigateBack({ delta: 1 })
            },
        })
    }
    render() {
        const {
            isDefault,
            areaData,
            currentSelector,
            province,
            city,
            district,
            address = '',
            name,
            phone,
            addressId,
        } = this.state
        return (
            <View className={styles.AddressEditMain}>
                <View className={styles.itemsWrapper}>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>收货人</View>
                        <View className={styles.inputWrapper}>
                            <Input
                                type="text"
                                placeholder="请填写收货人姓名"
                                placeholderClass={styles.placeholder}
                                value={name}
                                onInput={(e: any) => this.handleChange(e.target.value, 'name')}
                            />
                        </View>
                    </View>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>手机号码</View>
                        <View className={styles.inputWrapper}>
                            <Input
                                type="number"
                                placeholder="请填写收货人手机号码"
                                maxLength={11}
                                placeholderClass={styles.placeholder}
                                value={phone}
                                onInput={(e: any) => this.handleChange(e.target.value, 'phone')}
                            />
                        </View>
                    </View>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>所在地区</View>
                        <View className={styles.pickerWrapper}>
                            <Picker
                                mode="multiSelector"
                                range={areaData}
                                onChange={(e) => this.handleAreaChange(e.detail.value)}
                                onColumnChange={(e) => this.handleColumnChange(e.detail.column, e.detail.value)}
                                value={currentSelector}
                            >
                                <View className={styles.picker}>
                                    {province === '' || city === '' ? (
                                        <Text className={styles.placeholder}>请选择</Text>
                                    ) : (
                                        `${province} ${city} ${district}`
                                    )}
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>详细地址</View>
                        <View className={styles.textareaWrapper}>
                            <Textarea
                                style="width: 500rpx"
                                autoHeight
                                placeholder="街道、楼牌号等"
                                placeholderClass={styles.placeholder}
                                value={address}
                                onInput={(e: any) => this.handleChange(e.target.value, 'address')}
                            />
                        </View>
                    </View>
                </View>
                <View className={styles.itemsWrapper}>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>默认地址</View>
                        <View className={styles.checkboxWrapper}>
                            <Switch
                                checked={isDefault}
                                color="#b365b7"
                                onChange={(e: any) => this.handleChange(e.target.value, 'isDefault')}
                            />
                        </View>
                    </View>
                    {addressId && (
                        <View className={styles.itemWrapper}>
                            <View className={styles.deleteWrapper} onClick={this.handleDelete}>
                                删除收货地址
                            </View>
                        </View>
                    )}
                </View>
                <View className={styles.buttonWrapper}>
                    <View className={styles.button} onClick={this.handleSave}>
                        保存
                    </View>
                </View>
            </View>
        )
    }
}

export default AddressEdit
