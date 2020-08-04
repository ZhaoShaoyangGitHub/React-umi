import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { MyCollectionProps, MyCollectionState } from './index.interface'
import styles from './MyCollection.module.less'
import ArticleItem from '../../components/ArticleItem/index'
import NoSearchData from '../../components/NoSearchData'

@connect(({ MyCollection }) => ({
    ...MyCollection,
}))
class MyCollection extends Component<MyCollectionProps, MyCollectionState> {
    config: Config = {
        navigationBarTitleText: '我的收藏',
    }
    constructor(props: MyCollectionProps) {
        super(props)
        this.state = {}
    }

    componentDidShow() {
        this.props.dispatch({
            type: 'MyCollection/getCollectionList',
            payload: {
                type: 3,
            },
        })
    }

    render() {
        const { MyCollectionDataList } = this.props
        return (
            <View className={styles.MyCollectionMain}>
                <View className={styles.articleListWrapper}>
                    {MyCollectionDataList && MyCollectionDataList.length > 0 ? (
                        MyCollectionDataList.map((item) => {
                            return (
                                <ArticleItem
                                    onHandleClick={() => {
                                        Taro.navigateTo({
                                            url: '/pages/ArticleDetails/index?id=' + item.id,
                                        })
                                    }}
                                    key={item.id}
                                    articleImg={JSON.parse(item.image).file}
                                    articleTitle={item.title}
                                    numberWatch={item.numberWatch}
                                    thumbUpNumber={item.thumbUpNumber}
                                    data={item.createTime}
                                    propsStyles={{ marginBottom: '30rpx' }}
                                />
                            )
                        })
                    ) : (
                        <NoSearchData type="文章" />
                    )}
                </View>
            </View>
        )
    }
}

export default MyCollection
