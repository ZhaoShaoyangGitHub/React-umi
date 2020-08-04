/* eslint-disable no-lone-blocks */
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import CartItem from '../../components/CartItem'
import Price from '../../components/Price'
import CartBottomBar from '../../components/CartBottomBar/index'
import cartIcon from '@assets/img/cart_gray.png'
import { BASEURL } from '../../config/index'
import plusIcon from '@assets/img/plus.png'
import minusIcon from '@assets/img/minus.png'
import { GoodListProps, GoodListState } from './index.interface'
import styles from './GoodList.module.less'
// import { } from '../../components'

@connect(({ GoodList }) => ({
    ...GoodList,
}))
class GoodList extends Component<GoodListProps, GoodListState> {
    config: Config = {
        navigationBarTitleText: '开始下单',
    }
    constructor(props: GoodListProps) {
        super(props)
        this.state = {
            totalCartNum: 0,
            CategoryList: [],
            CartList: [],
            current: 0,
            userId: 0,
            isShow: false,
            tabList: [
                { title: '精油' },
                { title: '减肥产品' },
                { title: '按摩' },
                { title: '泡脚粉' },
                { title: '套装' },
                { title: '其他' },
            ],
            pageList: [],
            list: [
                {
                    goodsId: 2,
                    goodsName: '2019年春季最新款樱花雨落推拿减肥套餐',
                    price: 1500.0,
                    skuImage: 'http://img0.imgtn.bdimg.com/it/u=3536087198,2495969828&fm=26&gp=0.jpg',
                    inventory: 10,
                    quantity: 2,
                },
                {
                    goodsId: 1,
                    goodsName: '泡脚粉',
                    price: 139.0,
                    skuImage: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
                    inventory: 10,
                    quantity: 0,
                },
                {
                    goodsId: 3,
                    goodsName: '中式传统推拿+拔罐',
                    price: 2000.0,
                    skuImage: 'http://img0.imgtn.bdimg.com/it/u=3536087198,2495969828&fm=26&gp=0.jpg',
                    inventory: 10,
                    quantity: 1,
                },
                {
                    goodsId: 4,
                    goodsName: '减肥精油基础套装',
                    price: 3800,
                    skuImage: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
                    inventory: 10,
                    quantity: 0,
                },
            ],
        }
    }
    public isFetch = false
    componentDidShow() {
        const { userId } = this.$router.params
        this.setState({
            userId: Number.parseInt(userId, 10) || 0,
        })
        const _this = this
        this.props.dispatch({
            type: 'GoodList/requestCategory',
            params: { type: '2' },
            cb: (data) => {
                for (let i = 0; i < data.length; i++) {
                    data[i].title = data[i].name
                }
                data.unshift({
                    title: '套餐',
                    id: '',
                })

                this.setState({ CategoryList: data }, () => {
                    console.log(this.state.CategoryList)
                    _this.getPageListData(data[0].id, 0)
                })
                console.log('b', data[0].id)
            },
        })
    }
    getPageListData(categoryId, current) {
        const { pageList, CategoryList } = this.state
        const _arr = pageList
        this.props.dispatch({
            type: 'GoodList/requestPageList',
            params: { categoryId: '', pageIndex: 1 },
            // params: { categoryId: '', pageIndex: 1 },
            cb: (data) => {
                console.log('a', data)
                for (let i = 0; i < data.list.length; i++) {
                    data.list[i].quantity = 0
                }
                //
                if (!this.isFetch) {
                    console.log('CategoryList.length', CategoryList.length)

                    for (let j = 0; j < CategoryList.length; j++) {
                        _arr.push([])
                    }
                }

                console.log('_arr', _arr)
                _arr[current] = data.list
                this.setState({ pageList: _arr }, () => {
                    console.log('填充数组数据', this.state.pageList)
                    this.isFetch = true
                })
            },
        })
    }
    getGoodsPageListData(categoryId, current) {
        const { pageList, CategoryList } = this.state
        const _arr = pageList
        this.props.dispatch({
            type: 'GoodList/requestGoodsPageList',
            params: { categoryId: categoryId, pageIndex: 1 },
            // params: { categoryId: '', pageIndex: 1 },
            cb: (data) => {
                console.log('a', data)
                for (let i = 0; i < data.list.length; i++) {
                    data.list[i].quantity = 0
                    data.list[i].packageImage = data.list[i].image
                }
                //
                if (!this.isFetch) {
                    console.log('CategoryList.length', CategoryList.length)

                    for (let j = 0; j < CategoryList.length; j++) {
                        _arr.push([])
                    }
                }

                console.log('_arr', _arr)
                _arr[current] = data.list
                this.setState({ pageList: _arr }, () => {
                    console.log('填充数组数据', this.state.pageList)
                    this.isFetch = true
                })
            },
        })
    }
    handleClick(value) {
        const { current, CategoryList, pageList } = this.state
        console.log('当前', pageList[value])
        this.setState(
            {
                current: value,
            },
            () => {
                if (value === 0) {
                    this.getPageListData(CategoryList[value].id, value)
                } else {
                    this.getGoodsPageListData(CategoryList[value].id, value)
                }
            },
        )
    }
    getTotalPrice = () => {
        const { CartList } = this.state
        const cartlist = CartList
        let totalPrice = 0
        for (let i = 0; i < cartlist.length; i++) {
            totalPrice += cartlist[i].marketPrice * cartlist[i].quantity
        }
        return totalPrice
    }
    gotoPay = () => {
        const { userId } = this.state
        if (this.state.totalCartNum <= 0) return
        Taro.showLoading({ title: '' })
        console.log('跳转到结算')
        // { goodsForms: [{ goodsId: 0, number: 0, type: 0 }] }
        const { CartList } = this.state
        const _arr: any[] = []
        for (let i = 0; i < CartList.length; i++) {
            const obj: any = {}
            obj.goodsId = CartList[i].id
            obj.number = CartList[i].quantity
            obj.type = CartList[i].type
            _arr.push(obj)
        }
        this.props.dispatch({
            type: 'GoodList/postOrderTradeAffirm',
            params: { goodsForms: _arr },
            cb: (data) => {
                Taro.hideLoading()
                console.log('ok->', data)
                this.props.dispatch({
                    type: 'OrderConfirm/save',
                    payload: data,
                })
                this.props.dispatch({
                    type: 'OrderConfirm/saveform',
                    payload: _arr,
                })
                Taro.navigateTo({
                    url: `/pages/OrderConfirm/index?userId=${userId}`,
                })
            },
        })
    }
    handleToggleCartPanel = () => {
        this.setState({
            isShow: !this.state.isShow,
        })
    }
    handleGoodsAmountChange = (value: number) => {
        console.log('handleGoodsAmountChange', value)
        console.log('添加购物车成功弹窗 应该在GoodList里写 不在这写')
    }
    handleAddAmountChange = (ind, current) => {
        const { pageList } = this.state
        const pagelist = pageList
        console.log('+', ind)
        pagelist[current][ind].quantity++

        this.setState({ pageList: pagelist }, () => {
            this.checkCartNum()
        })
    }
    checkCartNum = () => {
        const { pageList } = this.state
        const pagelist: any[] = pageList
        console.log('购物车🛒：', pagelist)
        const _arr: any[] = []
        for (let i = 0; i < pagelist.length; i++) {
            for (let j = 0; j < pagelist[i].length; j++) {
                if (pagelist[i][j].quantity !== 0) {
                    _arr.push(pagelist[i][j])
                }
            }
        }
        console.log('_arr:', _arr)
        let totalCartNum = 0
        for (let i = 0; i < _arr.length; i++) {
            totalCartNum += _arr[i].quantity
        }
        this.setState({ CartList: _arr, totalCartNum })
    }
    handleDisAmountChange = (ind, current) => {
        const { pageList } = this.state
        const pagelist = pageList
        console.log('-', ind)
        if (pagelist[current][ind].quantity <= 0) {
            return
        } else {
            pagelist[current][ind].quantity--
            this.setState({ pageList: pagelist }, () => {
                this.checkCartNum()
            })
        }
    }
    handleAddAmountChangeByCart = (ind, current) => {
        console.log(ind, current)
        const { CartList, pageList } = this.state
        const pagelist = pageList
        const cartlist = CartList
        const currentId = cartlist[ind].id
        for (let i = 0; i < pagelist.length; i++) {
            for (let j = 0; j < pagelist[i].length; j++) {
                if (pagelist[i][j].id === currentId) {
                    console.log('pagelist.id:', pagelist[i][j].id, 'current.id:', currentId)
                    pagelist[i][j].quantity++
                }
            }
        }
        this.setState({ pageList: pagelist }, () => {
            this.checkCartNum()
        })
    }
    handleDisAmountChangeByCart = (ind, current) => {
        const { CartList, pageList } = this.state
        const pagelist = pageList
        const cartlist = CartList
        const currentId = cartlist[ind].id
        for (let i = 0; i < pagelist.length; i++) {
            for (let j = 0; j < pagelist[i].length; j++) {
                if (pagelist[i][j].id === currentId) {
                    console.log('匹配到的id', currentId)
                    if (pagelist[i][j].quantity <= 0) {
                        return
                    } else {
                        pagelist[i][j].quantity--
                    }
                }
            }
        }
        this.setState({ pageList: pagelist }, () => {
            this.checkCartNum()
        })
    }
    render() {
        const { current, tabList, CategoryList, list, pageList, CartList, isShow, totalCartNum } = this.state
        return (
            <View className={styles.GoodListMain}>
                <View className={styles.topWrapper}>
                    <AtTabs
                        current={current}
                        scroll
                        tabList={CategoryList}
                        onClick={(value) => this.handleClick(value)}
                    />
                </View>
                <View className={styles.listWrapper}>
                    {pageList[current] &&
                        pageList[current].map((item, index) => {
                            return (
                                <View className={styles.itemWrapper} key={item.id}>
                                    <View className={styles.cartItemWrapper}>
                                        <CartItem
                                            goodsId={item.id}
                                            goodsName={item.name}
                                            price={item.marketPrice}
                                            amount={item.quantity}
                                            imgSrc={BASEURL + item.packageImage}
                                            type="goods"
                                            handleAddAmountChange={() => {
                                                this.handleAddAmountChange(index, current)
                                            }}
                                            handleDisAmountChange={() => {
                                                this.handleDisAmountChange(index, current)
                                            }}
                                            efficacy={item.efficacy}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                </View>
                {/* 浮层 */}
                <AtFloatLayout isOpened={isShow} onClose={() => this.handleToggleCartPanel()}>
                    <View className={styles.panelHeader}>已选商品</View>
                    <View className={styles.panelContent}>
                        {CartList.map((item, index) => {
                            return (
                                <View key={item.id} className={styles.contentItem}>
                                    <View className={styles.name}>{item.name}</View>
                                    <View className={styles.price}>
                                        <Price value={item.marketPrice} />
                                    </View>
                                    <View className={styles.operate}>
                                        <Image
                                            src={minusIcon}
                                            className={styles.icon}
                                            onClick={() => this.handleDisAmountChangeByCart(index, current)}
                                        />
                                        <Text className={styles.amount}>{item.quantity}</Text>
                                        <Image
                                            src={plusIcon}
                                            className={styles.icon}
                                            onClick={() => this.handleAddAmountChangeByCart(index, current)}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </AtFloatLayout>
                {/* BottomBar */}
                <CartBottomBar
                    handleToggleCartPanel={this.handleToggleCartPanel}
                    price={this.getTotalPrice()}
                    gotoPay={this.gotoPay}
                    productNum={totalCartNum}
                />
            </View>
        )
    }
}

export default GoodList
