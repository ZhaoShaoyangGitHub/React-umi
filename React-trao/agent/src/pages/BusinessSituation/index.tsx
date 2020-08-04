import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { BusinessSituationProps, BusinessSituationState } from './index.interface'
import styles from './BusinessSituation.module.less'
import { HomeImages } from '../../assets/img/load'

@connect(({ BusinessSituation }) => ({
    ...BusinessSituation,
}))
class BusinessSituation extends Component<BusinessSituationProps, BusinessSituationState> {
    config: Config = {
        navigationBarTitleText: '营业情况',
    }
    constructor(props: BusinessSituationProps) {
        super(props)
        this.state = {
            list: [
                { id: 0, url: '/pages/OverviewStore/index', imgUrl: HomeImages.selectIcon1, title: '门店概况' },
                { id: 1, url: '/pages/OverviewEmployee/index', imgUrl: HomeImages.selectIcon2, title: '员工概况' },
                { id: 2, url: '/pages/OverviewMember/index', imgUrl: HomeImages.selectIcon3, title: '会员概况' },
                { id: 3, url: '/pages/OverviewGoods/index', imgUrl: HomeImages.selectIcon4, title: '商品概况' },
            ],
        }
    }

    componentDidMount() {}

    goOtherPage = (url) => {
        const { shopId } = this.$router.params
        if (url && shopId) {
            Taro.navigateTo({
                url: url + '?shopId=' + shopId,
            })
        }
    }

    render() {
        const { list } = this.state
        return (
            <View className={styles.BusinessSituationMain}>
                <View className={styles.wrapper}>
                    <View className={styles.list}>
                        {list.map((item) => {
                            return (
                                <View
                                    className={styles.listItem}
                                    key={item.id}
                                    onClick={() => this.goOtherPage(item.url)}
                                >
                                    <Image src={item.imgUrl} className={styles.Image} mode="widthFix" />
                                    <View>{item.title}</View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        )
    }
}

export default BusinessSituation
