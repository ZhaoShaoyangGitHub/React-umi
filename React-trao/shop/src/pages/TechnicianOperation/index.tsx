import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Switch, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import { BASEURL } from '../../config/index'
// import testAvatar from '../../assets/img/test/test.png'
// import { areaInfo } from '../../assets/common/area'
import { flatten } from '../../utils/function'
import { TechnicianOperationProps, TechnicianOperationState } from './index.interface'
import styles from './TechnicianOperation.module.less'
// import { } from '../../components'
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
@connect(({ TechnicianOperation }) => ({
    ...TechnicianOperation,
}))
class TechnicianOperation extends Component<TechnicianOperationProps, TechnicianOperationState> {
    config: Config = {
        navigationBarTitleText: '添加账号',
    }
    constructor(props: TechnicianOperationProps) {
        super(props)
        this.state = {
            technicianId: 0,
            areaData: [[], [], []],
            currentSelector: [0, 0, 0],
            province: '',
            city: '',
            district: '',
            address: '',
            name: '',
            phone: '',
            idCard: '',
            password: '',
        }
    }

    componentDidShow = () => {
        const { id } = this.$router.params
        this.setState(
            {
                technicianId: Number.parseInt(id, 10) || 0,
            },
            () => {
                this.getCurrentData()
            },
        )
    }

    getCurrentData = async () => {
        const areaInfo = Taro.getStorageSync('areaInfo')
        const { technicianId } = this.state
        const originProvinces = flatten(areaInfo)
        const provinces = originProvinces.map((province: Province) => province.provinceName)
        if (technicianId !== 0) {
            // this.setState({
            //     // addressId: currentAddress.id,
            //     // isDefault: Boolean(currentAddress.isDefault && currentAddress.isDefault.value === 1),
            //     province: currentAddress.province,
            //     city: currentAddress.city,
            //     district: currentAddress.district,
            //     address: currentAddress.address,
            //     name: currentAddress.name,
            //     phone: currentAddress.phone,
            // })
            // // 地址初始值
            // const provinceIndex = provinces.findIndex((province: string) => province === currentAddress.province)
            // const originCities = flatten(
            //     originProvinces.find((province: Province) => province.provinceName === currentAddress.province)
            //         .cityList,
            // )
            // const cities = originCities.map((city: City) => city.cityName)
            // const cityIndex = cities.findIndex((city: string) => city === currentAddress.city)
            // const originDistricts = flatten(
            //     originCities.find((city: City) => city.cityName === currentAddress.city).districtList,
            // )
            // const districts = originDistricts.map((district: District) => district.districtName)
            // const districtIndex =
            //     districts && districts.findIndex((district: string) => currentAddress.district === district)
            // this.setState({
            //     // 地址初始值
            //     areaData: [provinces, cities, districts],
            //     currentSelector: [provinceIndex, cityIndex, districtIndex],
            // })
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
        const areaInfo = Taro.getStorageSync('areaInfo')
        const { currentSelector, areaData } = this.state
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
                    let newProvinceData: any
                    let newCityData: City | undefined
                    let oldProvinceData: any
                    let newCities: Array<string> = cities
                    let newDistricts: Array<string> = districts
                    switch (column) {
                        case 0:
                            newProvinceName = provinces[value]
                            newProvinceData = areaInfo.find(
                                (province: any) => province.provinceName === newProvinceName,
                            )
                            newCities = flatten(newProvinceData.cityList).map((city: City) => city.cityName)
                            newDistricts = flatten(newProvinceData.cityList[0].districtList).map(
                                (district: any) => district.districtName,
                            )
                            break
                        case 1:
                            newCityName = cities[value]
                            oldProvinceData = areaInfo.find(
                                (province: any) => province.provinceName === provinces[currentSelector[0]],
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
        const { name, phone, province, city, district, address, password, idCard } = this.state
        if (name && phone && province && city && address && idCard && password) {
            let actionName = ''
            // if (id) {
            //     actionName = 'AddressEdit/update'
            // } else {
            //     actionName = 'AddressEdit/add'
            // }
            this.props.dispatch({
                type: 'TechnicianOperation/addTechnician',
                params: {
                    address,
                    city,
                    area: district,
                    name,
                    phone,
                    province,
                    userType: 3,
                    password,
                    idCard,
                },
                cb: () => {
                    // const { from } = this.$router.params
                    // Taro.navigateTo({
                    //     url: `/pages/AddressManage/index?from=${from}`,
                    // })
                    Taro.showToast({
                        title: '添加成功',
                        duration: 1500,
                    })
                    setTimeout(() => {
                        Taro.navigateBack({ delta: 1 })
                    }, 1500)
                },
            })
        } else {
            Taro.showToast({
                title: '信息不完整',
                icon: 'none',
            })
        }
    }
    render() {
        const {
            areaData,
            currentSelector,
            province,
            city,
            district,
            address = '',
            name,
            phone,
            idCard,
            password,
        } = this.state
        return (
            <View className={styles.TechnicianOperationMain}>
                <View className={styles.itemsWrapper}>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>技师姓名</View>
                        <View className={styles.inputWrapper}>
                            <Input
                                type="text"
                                placeholder="请填写技师姓名"
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
                                value={phone}
                                type="number"
                                placeholder="请填写技师手机号码"
                                placeholderClass={styles.placeholder}
                                onInput={(e: any) => this.handleChange(e.target.value, 'phone')}
                            />
                        </View>
                    </View>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>身份证号</View>
                        <View className={styles.inputWrapper}>
                            <Input
                                value={idCard}
                                type="number"
                                placeholder="请填写技师身份证号"
                                placeholderClass={styles.placeholder}
                                onInput={(e: any) => this.handleChange(e.target.value, 'idCard')}
                            />
                        </View>
                    </View>
                    <View className={styles.itemWrapper}>
                        <View className={styles.label}>密码</View>
                        <View className={styles.inputWrapper}>
                            <Input
                                value={password}
                                password
                                placeholder="请填写技师密码"
                                placeholderClass={styles.placeholder}
                                onInput={(e: any) => this.handleChange(e.target.value, 'password')}
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
                    {/* {addressId && (
                        <View className={styles.itemWrapper}>
                            <View className={styles.deleteWrapper} onClick={this.handleDelete}>
                                删除收货地址
                            </View>
                        </View>
                    )} */}
                </View>

                <View className={styles.button} onClick={this.handleSave}>
                    确认添加
                </View>
            </View>
        )
    }
}

export default TechnicianOperation
