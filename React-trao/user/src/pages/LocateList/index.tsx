import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIndexes } from 'taro-ui'
import { LocateListProps, LocateListState } from './index.interface'
import styles from './LocateList.module.less'
import { Icons } from '../../assets/img/load'

@connect(({ LocateList }) => ({
    ...LocateList,
}))
class LocateList extends Component<LocateListProps, LocateListState> {
    config: Config = {
        navigationBarTitleText: '城市列表',
    }
    componentDidShow() {
        Taro.getLocation({
            type: 'wgs84',
            success: (res) => {
                console.log('res', res)
            },
        })
    }
    constructor(props: LocateListProps) {
        super(props)
        this.state = {
            list: [
                // {
                //     title: 'A',
                //     key: 'A',
                //     items: [
                //         {
                //             name: '阿坝',
                //             // 此处可加其他业务字段
                //         },
                //     ],
                // },
            ],
            currentCity: '上海市',
            hotCities: ['上海', '南京', '杭州', '北京', '广州', '成都'],
            searchText: '',
            resultList: [],
        }
    }

    componentDidMount() {}
    onClick(item) {
        console.log(item)
    }
    handleSearchChange = (value) => {
        console.log('value', value)
        let resultList: string[] = []
        if (value) {
            resultList = ['北京网通1', '北京网通2', '北京网通3']
        } else {
            resultList = []
        }
        this.setState({
            searchText: value,
            resultList,
        })
    }
    handleCitySelect = (city) => {
        console.log('city', city)
    }
    clearSearchText = () => {
        this.setState({
            searchText: '',
            resultList: [],
        })
    }
    render() {
        const { list, currentCity, hotCities, resultList, searchText } = this.state
        return (
            <View className={styles.LocateListMain}>
                <View>
                    <View className={styles.blockWrapper}>
                        <View className={styles.blockTitle}>当前城市</View>
                        <View className={styles.blockList}>
                            <View className={styles.activeRadio}>
                                <View className={styles.iconWrapper}>
                                    <Image src={Icons.location_01} className={styles.locateIcon} />
                                </View>
                                <Text className={styles.activeText}>{currentCity}</Text>
                            </View>
                        </View>
                    </View>
                    <View className={styles.blockWrapper}>
                        <View className={styles.blockTitle}>热门城市</View>
                        <View className={styles.blockList}>
                            {hotCities.map((city: string) => {
                                return (
                                    <View
                                        className={styles.blockRadio}
                                        key={city}
                                        onClick={() => this.handleCitySelect(city)}
                                    >
                                        <Text className={styles.text}>{city}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
                {/* <View className={styles.filterBlock}>
                    <View className={styles.searchBlock}>
                        <View className={styles.iconWrapper}>
                            <Image src={Icons.searchIcon} className={styles.searchIcon} />
                        </View>
                        <Input
                            type="text"
                            placeholder="请输入城市名称"
                            className={styles.searchText}
                            onInput={(e: any) => this.handleSearchChange(e.detail.value)}
                            value={searchText}
                        />
                        {searchText && (
                            <View className={styles.iconWrapper} onClick={this.clearSearchText}>
                                <Image src={Icons.closeIcon} className={styles.deleteIcon} />
                            </View>
                        )}
                    </View>
                </View> */}
                {/* {resultList.length ? (
                    <View className={styles.resultList}>
                        {resultList.map((item: any) => {
                            return (
                                <View
                                    className={styles.resultItem}
                                    onClick={() => this.handleCitySelect(item)}
                                    key={item}
                                >
                                    {item}
                                </View>
                            )
                        })}
                    </View>
                ) : (
                    <View style="height:100vh">
                        <AtIndexes
                            list={list}
                            onClick={this.onClick.bind(this)}
                            isShowToast={false}
                            isVibrate={false}
                        ></AtIndexes>
                    </View>
                )} */}
            </View>
        )
    }
}

export default LocateList
