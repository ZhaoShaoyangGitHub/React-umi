import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MyCollectionProps, MyCollectionState } from './index.interface'
import styles from './myCollection.module.less'
import { AtTabs } from 'taro-ui'
import { Icons } from '../../assets/img/load'
import ArticleItem from '../../components/ArticleItem/index'
import ShopItem from '../../components/ShopItem/index'

@connect(({ MyCollection }) => ({
    ...MyCollection,
}))
class MyCollection extends Component<MyCollectionProps, MyCollectionState> {
    config: Config = {
        navigationBarTitleText: '我的收藏',
    }
    constructor(props: MyCollectionProps) {
        super(props)
        this.state = {
            current: 0,
            userId: 0,
            tabList: [
                {
                    title: '套餐',
                },
                {
                    title: '商品',
                },
                {
                    title: '文章',
                },
                {
                    title: '店铺',
                },
            ],
        }
    }

    componentDidMount() {
        var personInfo = Taro.getStorageSync('personalInfo')
        if (personInfo) {
            this.setState({
                userId: JSON.parse(personInfo).userId,
            })
        }
        this.getCollectionData(1)
    }

    handleClick = (type: number) => {
        this.setState({
            current: type,
        })
        this.getCollectionData(type + 1)
    }

    getCollectionData = (type) => {
        this.props.dispatch({
            type: 'MyCollection/getEnshrine',
            payload: {
                type,
            },
        })
    }

    handleSwitch = (id, type) => {
        switch (type) {
            case 'pack':
                Taro.navigateTo({
                    url: `/pages/PackageDetail/index?id=${id}&userId=${this.state.userId}`,
                })
                break
            case 'goods':
                Taro.navigateTo({
                    url: `/pages/GoodsDetail/index?id=${id}&userId=${this.state.userId}`,
                })
                break
            default:
                return
        }
    }

    render() {
        const { current, tabList } = this.state
        const { myCollectionDataList } = this.props
        return (
            <View className={styles.MyCollectionMain}>
                <View className={styles.topWrapper}>
                    <AtTabs current={current} tabList={tabList} onClick={(value) => this.handleClick(value)} />
                </View>
                {myCollectionDataList && myCollectionDataList.length > 0 ? (
                    <View className={styles.listWrapper}>
                        {current === 0 && (
                            <View className={styles.articleList}>
                                {myCollectionDataList.map((item) => {
                                    return (
                                        <ShopItem
                                            key={item.id}
                                            onHandleClick={this.handleSwitch.bind(this, item.id, 'pack')}
                                            shopImg={item.imageUrl}
                                            shopTitle={item.name}
                                            shopAddress={''}
                                            shopPrice={item.marketPrice}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                            efficacy={item.efficacy}
                                        />
                                    )
                                })}
                            </View>
                        )}
                        {current === 1 && (
                            <View className={styles.articleList}>
                                {myCollectionDataList.map((item) => {
                                    return (
                                        <ShopItem
                                            key={item.id}
                                            onHandleClick={this.handleSwitch.bind(this, item.id, 'goods')}
                                            shopImg={item.image}
                                            shopTitle={item.name}
                                            shopAddress={''}
                                            shopPrice={item.marketPrice}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                            efficacy={item.efficacy}
                                        />
                                    )
                                })}
                            </View>
                        )}
                        {current === 2 && (
                            <View className={styles.articleList}>
                                {myCollectionDataList.map((item) => {
                                    return (
                                        <ArticleItem
                                            onHandleClick={() => {
                                                Taro.navigateTo({
                                                    url: `/pages/ArticleDetails/index?id=${item.id}&userId=${this.state.userId}`,
                                                })
                                            }}
                                            key={item.id}
                                            articleImg={item.image && JSON.parse(item.image).file}
                                            articleTitle={item.title}
                                            numberWatch={item.numberWatch}
                                            thumbUpNumber={item.thumbUpNumber}
                                            data={item.createTime}
                                            propsStyles={{ marginBottom: '30rpx' }}
                                        />
                                    )
                                })}
                            </View>
                        )}
                        {current === 3 && (
                            <View className={styles.tabBarListItem}>
                                {myCollectionDataList.map((item) => {
                                    return (
                                        <View
                                            key={item.id}
                                            onClick={() => {
                                                Taro.navigateTo({
                                                    url: '/pages/StoreDetail/index?id=' + item.id,
                                                })
                                            }}
                                        >
                                            <ShopItem
                                                shopImg={item.coverUrl && item.coverUrl[0]}
                                                shopTitle={item.name}
                                                shopAddress={item.province + item.city + item.area + item.address}
                                                shopPhoneNum={item.phone}
                                                propsStyles={{ marginBottom: '30rpx' }}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                    </View>
                ) : (
                    <View className={styles.empty}>
                        <Image src={Icons.collectionEmpty} mode="widthFix" />
                        <Text>暂时没有收藏内容呦～</Text>
                    </View>
                )}
            </View>
        )
    }
}

export default MyCollection
