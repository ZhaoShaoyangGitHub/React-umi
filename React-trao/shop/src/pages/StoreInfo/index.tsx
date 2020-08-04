import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { StoreInfoProps, StoreInfoState } from './index.interface'
import styles from './StoreInfo.module.less'
import { publicImages, HomeImages } from '../../assets/img/load'
import { BASEURL } from '../../config/index'
// import { areaInfo } from '../../assets/common/area'

@connect(({ StoreInfo }) => ({
    ...StoreInfo,
}))
class StoreInfo extends Component<StoreInfoProps, StoreInfoState> {
    config: Config = {
        navigationBarTitleText: '门店信息',
    }
    constructor(props: StoreInfoProps) {
        super(props)
        this.state = {
            shopId: 0,
            name: '',
            imageUrl: '',
            address: '',
            introduce: '',
            province: '',
            provinceIndex: -1,
            provinceArr: [],
            city: '',
            cityIndex: -1,
            cityArr: [],
            area: '',
            areaIndex: -1,
            areaArr: [],
            addressStatus: false,
            areaType: 1, //1表示province 2表示city 3表示 area
        }
    }

    componentDidShow() {
        this.getShopDetails()
        this.getProvinceArr()
    }

    getProvinceArr = () => {
        const areaInfo = Taro.getStorageSync('areaInfo')
        let provinceArr: any = []
        areaInfo.map((item) => {
            provinceArr.push({
                selected: false,
                title: item.provinceName,
            })
        })
        this.setState({
            provinceArr,
            areaType: 1,
        })
    }

    getCityArr = () => {
        const areaInfo = Taro.getStorageSync('areaInfo')
        let cityArr: any = []
        areaInfo[this.state.provinceIndex].cityList.map((item, index) => {
            cityArr.push({
                selected: false,
                title: item.cityName,
            })
        })
        this.setState({
            cityArr,
            areaType: 2,
        })
    }

    getAreaArr = () => {
        const areaInfo = Taro.getStorageSync('areaInfo')
        let areaArr: any = []
        areaInfo[this.state.provinceIndex].cityList[this.state.cityIndex].districtList.map((item, index) => {
            areaArr.push({
                selected: false,
                title: item.districtName,
            })
        })
        this.setState({
            areaArr,
            areaType: 3,
        })
    }

    selectedType = (index) => {
        if (this.state.areaType === index) return
        switch (index) {
            case 1:
                this.setState({
                    areaType: 1,
                })
                break
            case 2:
                if (this.state.cityIndex < 0 || this.state.cityArr.length < 1) {
                    Taro.showToast({
                        title: '请选择省份',
                        mask: true,
                        icon: 'none',
                    })
                } else {
                    this.setState({
                        areaType: 2,
                    })
                }
                break
            case 3:
                if (this.state.areaArr.length < 1) {
                    Taro.showToast({
                        title: '请选择城市',
                        mask: true,
                        icon: 'none',
                    })
                } else {
                    this.setState({
                        areaType: 3,
                    })
                }
                break
        }
    }

    selectedProvince = (index) => {
        let { provinceArr } = this.state
        provinceArr.map((item, ind) => {
            if (ind === index) {
                provinceArr[ind].selected = true
            } else {
                provinceArr[ind].selected = false
            }
        })
        this.setState(
            {
                provinceIndex: index,
                province: provinceArr[index].title,
                provinceArr,
                city: '',
                cityIndex: -1,
                area: '',
                areaIndex: -1,
            },
            () => {
                this.getCityArr()
            },
        )
    }

    selectedCity = (index) => {
        let { cityArr } = this.state
        cityArr.map((item, ind) => {
            if (ind === index) {
                cityArr[ind].selected = true
            } else {
                cityArr[ind].selected = false
            }
        })
        this.setState(
            {
                cityIndex: index,
                city: cityArr[index].title,
                cityArr,
                area: '',
                areaIndex: -1,
            },
            () => {
                this.getAreaArr()
            },
        )
    }

    selectedArea = (index) => {
        let { areaArr } = this.state
        areaArr.map((item, ind) => {
            if (ind === index) {
                areaArr[ind].selected = true
            } else {
                areaArr[ind].selected = false
            }
        })
        this.setState(
            {
                areaIndex: index,
                area: areaArr[index].title,
                areaArr,
            },
            () => {
                console.log('更新成功')
            },
        )
    }

    getShopDetails = () => {
        let { shopId } = this.$router.params
        if (shopId) {
            this.props.dispatch({
                type: 'Shop/getShopInfo',
                payload: {
                    shopId,
                },
                cb: (data) => {
                    const { id, name, imageUrl, address, introduce, province, city, area } = data
                    this.setState({
                        shopId: id,
                        name,
                        imageUrl: JSON.parse(imageUrl)[0].file,
                        address,
                        introduce,
                        province,
                        city,
                        area,
                    })
                },
            })
        }
    }

    goStoreCover = () => {
        const { imageUrl, shopId } = this.state
        Taro.navigateTo({
            url: `/pages/StoreCover/index?imgUrl=${imageUrl}&shopId=${shopId}`,
        })
    }

    goStorePhotoAlbum = () => {
        const { shopId } = this.state
        Taro.navigateTo({
            url: `/pages/StorePhotoAlbum/index?shopId=${shopId}`,
        })
    }

    onChangeArea = () => {
        this.getProvinceArr()
        this.setState({
            addressStatus: true,
        })
    }

    onClose = () => {
        this.getShopDetails()
        this.setState({
            provinceIndex: -1,
            provinceArr: [],
            cityIndex: -1,
            cityArr: [],
            areaIndex: -1,
            areaArr: [],
            addressStatus: false,
            areaType: 1,
        })
    }

    onComfier = () => {
        const { province, area, city, shopId } = this.state
        Taro.showLoading({
            title: '更新中',
            mask: true,
        })
        this.props.dispatch({
            type: 'StoreInfo/updateShopInfo',
            payload: {
                province,
                area,
                city,
                id: shopId,
            },
            cb: () => {
                this.onClose()
                Taro.hideLoading()
            },
        })
    }

    render() {
        const {
            name,
            imageUrl,
            address,
            introduce,
            province,
            provinceIndex,
            provinceArr,
            city,
            cityIndex,
            cityArr,
            area,
            areaIndex,
            areaArr,
            addressStatus,
            areaType,
        } = this.state
        return (
            <View className={styles.StoreInfoMain}>
                <View className={styles.StoreInfoWrapper}>
                    <View className={styles.listItemBox} onClick={this.goStoreCover}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>门店封面</Text>
                            </View>
                            <View className={styles.right}>
                                <View className={styles.imageModels}>
                                    <Image
                                        src={imageUrl && BASEURL + imageUrl}
                                        className={styles.imageUrl}
                                        mode="aspectFill"
                                    />
                                </View>
                                <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                            </View>
                        </View>
                        <View className={styles.line}></View>
                    </View>
                    <View className={styles.listItemBox}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>门店名称</Text>
                            </View>
                            <View className={styles.right}>
                                <View className={styles.name}>{name}</View>
                            </View>
                        </View>
                        <View className={styles.line}></View>
                    </View>
                    <View className={styles.listItemBox}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>所在区域</Text>
                            </View>
                            <View className={styles.right}>
                                <View className={styles.name}>{province + '  ' + city + '  ' + area}</View>
                                <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                            </View>
                        </View>
                        <View className={styles.line}></View>
                    </View>
                    <View className={styles.listItemBox}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>详细地址</Text>
                            </View>
                            <View className={styles.right}>
                                <View className={styles.name}>{address}</View>
                            </View>
                        </View>
                        <View className={styles.line}></View>
                    </View>
                    <View className={styles.listItemBox}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>门店简介</Text>
                            </View>
                            <View className={styles.right}>
                                <View className={styles.name}>{introduce}</View>
                            </View>
                        </View>
                    </View>
                    <View className={styles.marginBottom}></View>
                    <View className={styles.listItemBox} onClick={this.goStorePhotoAlbum}>
                        <View className={styles.listItem}>
                            <View className={styles.left}>
                                <Text>门店相册</Text>
                            </View>
                            <View className={styles.right}>
                                <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                            </View>
                        </View>
                    </View>
                </View>
                {addressStatus && <View className={styles.modal}></View>}

                {addressStatus && (
                    <View className={styles.areaWrapper}>
                        <View className={styles.areaMin}>
                            <View className={styles.areaTitle}>
                                <Image
                                    src={HomeImages.maskCloseIcon}
                                    mode="widthFix"
                                    className={styles.titleIcon}
                                    onClick={this.onClose}
                                />
                                <Image
                                    src={HomeImages.maskSelect}
                                    mode="widthFix"
                                    className={styles.titleIcon}
                                    onClick={this.onComfier}
                                />
                            </View>
                            <View className={styles.areaNav}>
                                <View
                                    className={`${styles.areaNavItem} ${areaType === 1 && styles.active}`}
                                    onClick={() => {
                                        this.selectedType(1)
                                    }}
                                >
                                    {provinceIndex < 0 ? '请选择' : province}
                                </View>
                                {provinceIndex > -1 && (
                                    <View
                                        className={`${styles.areaNavItem} ${areaType === 2 && styles.active}`}
                                        onClick={() => {
                                            this.selectedType(2)
                                        }}
                                    >
                                        {cityIndex < 0 ? '请选择' : city}
                                    </View>
                                )}
                                {cityIndex > -1 && (
                                    <View
                                        className={`${styles.areaNavItem} ${areaType === 3 && styles.active}`}
                                        onClick={() => {
                                            this.selectedType(3)
                                        }}
                                    >
                                        {areaIndex < 0 ? '请选择' : area}
                                    </View>
                                )}
                            </View>
                            <ScrollView scrollY={true} className={styles.addressList}>
                                {areaType == 1 &&
                                    provinceArr.map((item, index) => {
                                        return (
                                            <View
                                                className={`${styles.addressListItem} ${
                                                    item.selected && styles.selected
                                                }`}
                                                key={item.id}
                                                onClick={() => {
                                                    this.selectedProvince(index)
                                                }}
                                            >
                                                {item.title}
                                                {item.selected && (
                                                    <Image
                                                        src={HomeImages.maskSelect}
                                                        className={styles.selectedIcon}
                                                        mode="widthFix"
                                                    />
                                                )}
                                            </View>
                                        )
                                    })}
                                {areaType == 2 &&
                                    cityArr.map((item, index) => {
                                        return (
                                            <View
                                                className={`${styles.addressListItem} ${
                                                    item.selected && styles.selected
                                                }`}
                                                key={item.id}
                                                onClick={() => {
                                                    this.selectedCity(index)
                                                }}
                                            >
                                                {item.title}
                                                {item.selected && (
                                                    <Image
                                                        src={HomeImages.maskSelect}
                                                        className={styles.selectedIcon}
                                                        mode="widthFix"
                                                    />
                                                )}
                                            </View>
                                        )
                                    })}
                                {areaType == 3 &&
                                    areaArr.map((item, index) => {
                                        return (
                                            <View
                                                className={`${styles.addressListItem} ${
                                                    item.selected && styles.selected
                                                }`}
                                                key={item.id}
                                                onClick={() => {
                                                    this.selectedArea(index)
                                                }}
                                            >
                                                {item.title}
                                                {item.selected && (
                                                    <Image
                                                        src={HomeImages.maskSelect}
                                                        className={styles.selectedIcon}
                                                        mode="widthFix"
                                                    />
                                                )}
                                            </View>
                                        )
                                    })}
                            </ScrollView>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

export default StoreInfo
