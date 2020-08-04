/* eslint-disable no-lone-blocks */
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'
import CartItem from '../../components/CartItem'
import Price from '../../components/Price'
import CartBottomBar from '../../components/CartBottomBar/index'
import { publicImages, shoppingCart } from '../../assets/img/load'
import { GoodListProps, GoodListState } from './index.interface'
import { BASEURL } from '../../config/index'
import styles from './GoodList.module.less'
import StoreItem from '../../components/StoreItem'

@connect(({ GoodList, Cart }) => ({
    ...GoodList,
    ...Cart,
}))
class GoodList extends Component<GoodListProps, GoodListState> {
    config: Config = {
        navigationBarTitleText: '开始下单',
    }
    constructor(props: GoodListProps) {
        super(props)
        this.state = {
            NavOffsetTop: 84,
            isActivated: false,
            shopId: 0,
            totalCartNum: 0,
            CategoryList: [],
            CartList: [],
            current: 0,
            isShow: false,
            currentGoodsInfo: {},
            cartNum: 0,
            tabList: [
                { title: '精油' },
                { title: '减肥产品' },
                { title: '按摩' },
                { title: '泡脚粉' },
                { title: '套装' },
                { title: '其他' },
            ],
            pageList: [],
            list: [],
            storeInfo: null,
        }
    }
    public isFetch = false
    componentDidShow() {
        const { shopId } = this.$router.params
        if (shopId) {
            this.setState({
                shopId: +shopId,
            })
        }
        try {
            var value = Taro.getStorageSync('storeInfo')
            if (value) {
                this.setState({
                    storeInfo: JSON.parse(value),
                })
            } else {
                if (shopId) {
                    this.setState(
                        {
                            shopId: +shopId,
                        },
                        () => {
                            this.getShopDetails()
                        },
                    )
                }
            }
        } catch (e) {
            if (shopId) {
                this.setState(
                    {
                        shopId: +shopId,
                    },
                    () => {
                        this.getShopDetails()
                    },
                )
            }
        }

        const _this = this
        this.getShoppingCartNum()
        this.props.dispatch({
            type: 'GoodList/requestCategory',
            params: { type: 1 },
            cb: (data) => {
                for (let i = 0; i < data.length; i++) {
                    data[i].title = data[i].name
                }

                this.setState({ CategoryList: data }, () => {
                    console.log(this.state.CategoryList)
                    _this.getPageListData(data[0].id, 0)
                })
            },
        })
    }
    getShopDetails = () => {
        const { shopId } = this.state
        this.props.dispatch({
            type: 'Store/getShopDetails',
            payload: {
                shopId,
            },
            cb: (data) => {
                const { name, imageUrl, address } = data
                this.setState({
                    storeInfo: {
                        name,
                        imageUrl,
                        address,
                    },
                })
                Taro.setStorage({
                    key: 'storeInfo',
                    data: JSON.stringify({
                        name,
                        imageUrl,
                        address,
                    }),
                })
            },
        })
    }

    goStorePage = (shopId) => {
        Taro.navigateTo({ url: `/pages/StoreInfo/index?shopId=${shopId}` })
    }
    getPageListData(categoryId, current) {
        const { pageList, CategoryList } = this.state
        const _arr = pageList
        this.props.dispatch({
            type: 'GoodList/requestPageList',
            params: { categoryId: categoryId, pageIndex: 1 },
            // params: { categoryId: '', pageIndex: 1 },
            cb: (data) => {
                if (data) {
                    for (let i = 0; i < data.list.length; i++) {
                        data.list[i].quantity = 0
                    }
                    //
                    if (!this.isFetch) {
                        for (let j = 0; j < CategoryList.length; j++) {
                            _arr.push([])
                        }
                    }

                    _arr[current] = data.list
                    this.setState({ pageList: _arr }, () => {
                        console.log('填充数组数据', this.state.pageList)
                        this.isFetch = true
                    })
                }
            },
        })
    }

    //加入购物车
    handelAddToCart = () => {
        const { currentGoodsInfo, shopId } = this.state
        this.props.dispatch({
            type: 'GoodList/addGoodToCart',
            params: {
                goodsId: currentGoodsInfo.id,
                number: currentGoodsInfo.buyNum,
                shopId,
            },
            cb: () => {
                Taro.showToast({
                    title: '加入购物车成功',
                    icon: 'none',
                    mask: true,
                    duration: 1500,
                })
                this.getShoppingCartNum()

                this.setState({ isShow: false })
            },
        })
    }
    // 获取购物车数量
    getShoppingCartNum = () => {
        this.props.dispatch({
            type: 'GoodList/getCartQuantity',
            params: {},
            cb: (data) => {
                this.setState({ cartNum: data })
            },
        })
    }
    // 立即购买
    handleBuy = () => {
        const { currentGoodsInfo, shopId } = this.state
        Taro.setStorageSync(
            'quickBuyInfo',
            JSON.stringify({
                goodsId: currentGoodsInfo.id,
                number: currentGoodsInfo.buyNum,
                shopId,
            }),
        )
        Taro.navigateTo({
            url: '/pages/OrderConfirm/index',
        })
    }
    handleClick(value) {
        const { current, CategoryList, pageList } = this.state
        this.setState({
            current: value,
        })
        this.getPageListData(CategoryList[value].id, value)
    }
    getTotalPrice = () => {
        const { CartList } = this.state
        const cartlist = CartList
        console.log('cartlist', cartlist)
        let totalPrice = 0
        for (let i = 0; i < cartlist.length; i++) {
            totalPrice += cartlist[i].agencyPrice * cartlist[i].quantity
        }
        return totalPrice
    }
    // gotoPay = () => {
    //     Taro.navigateTo({
    //         url: '/pages/OrderConfirm/index',
    //     })
    //     if (this.state.totalCartNum <= 0) return
    //     Taro.showLoading({ title: '' })
    //     console.log('跳转到结算')
    //     // { goodsForms: [{ goodsId: 0, number: 0, type: 0 }] }
    //     const { CartList } = this.state
    //     const _arr: any[] = []
    //     for (let i = 0; i < CartList.length; i++) {
    //         const obj: any = {}
    //         obj.goodsId = CartList[i].id
    //         obj.number = CartList[i].quantity
    //         obj.type = CartList[i].type
    //         _arr.push(obj)
    //     }
    //     this.props.dispatch({
    //         type: 'GoodList/postOrderTradeAffirm',
    //         params: { goodsForms: _arr },
    //         cb: (data) => {
    //             Taro.hideLoading()
    //             console.log('ok->', data)
    //             this.props.dispatch({
    //                 type: 'OrderConfirm/save',
    //                 payload: data,
    //             })
    //             this.props.dispatch({
    //                 type: 'OrderConfirm/saveform',
    //                 payload: _arr,
    //             })
    //             Taro.navigateTo({
    //                 url: '/pages/OrderConfirm/index',
    //             })
    //         },
    //     })
    // }
    handleToggleCartPanel = () => {
        if (this.state.isShow) {
            Taro.navigateTo({
                url: '/pages/Cart/index',
            })
        } else {
            this.setState({
                isShow: !this.state.isShow,
            })
        }
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

        console.log(current)

        // this.props.dispatch({
        //     type: 'GoodList/addGoodToCart',
        //     params: {
        //         amount: 1,
        //         createTime: '',
        //         goodsId: PackDetailData.id,
        //         goodsType: 2,
        //         shopId: PackDetailData.shopResponses[0].id,
        //         userId: 0,
        //     },
        //     cb: (message, id) => {
        //         Taro.showToast({
        //             title: message || '加入购物车成功',
        //             icon: 'none',
        //             mask: true,
        //             duration: 1500,
        //         })
        //     },
        // })
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
    handleAddAmountChangeByCart = () => {
        const { currentGoodsInfo } = this.state
        this.setState({
            currentGoodsInfo: {
                ...currentGoodsInfo,
                buyNum: currentGoodsInfo.buyNum + 1,
            },
        })
    }
    handleDisAmountChangeByCart = () => {
        const { currentGoodsInfo } = this.state
        this.setState({
            currentGoodsInfo: {
                ...currentGoodsInfo,
                buyNum: currentGoodsInfo.buyNum < 2 ? 1 : currentGoodsInfo.buyNum - 1,
            },
        })
    }
    // 跳转购物车
    handleToShoppingCart = () => {
        Taro.navigateTo({
            url: '/pages/Cart/index',
        })
    }
    onPageScroll = (res) => {
        if (res.scrollTop >= this.state.NavOffsetTop) {
            this.setState({
                isActivated: true,
            })
        } else {
            this.setState({
                isActivated: false,
            })
        }
    }
    getNavOffsetTop = () => {
        const query = Taro.createSelectorQuery()
        query.select('#navWrapper').boundingClientRect()
        console.log(query)
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            res[0].top
            res[0].scrollTop
            this.setState({
                NavOffsetTop: res[0].top,
            })
        })
    }
    render() {
        const {
            current,
            CategoryList,
            cartNum,
            pageList,
            currentGoodsInfo,
            isShow,
            totalCartNum,
            storeInfo,
            shopId,
            isActivated,
        } = this.state
        console.log(currentGoodsInfo)
        return (
            <View className={styles.GoodListMain}>
                {storeInfo && (
                    <StoreItem
                        storeTitle={storeInfo.name}
                        storeAddress={storeInfo.address}
                        storeImg={storeInfo.imageUrl && JSON.parse(storeInfo.imageUrl)[0].file}
                        nameStyles={{ fontSize: '32rpx' }}
                        propsStyles={{ marginBottom: '0' }}
                        itemStyles={{ 'box-shadow': 'none!important' }}
                        onHandleClick={() => {
                            this.goStorePage(shopId)
                        }}
                    >
                        <Image src={publicImages.jumpIcon} mode="widthFix" className={styles.jumpIcon} />
                    </StoreItem>
                )}
                <View id="navWrapper" className={styles.topWrapper}>
                    <AtTabs
                        current={current}
                        scroll
                        tabList={CategoryList}
                        onClick={(value) => this.handleClick(value)}
                        className={isActivated ? styles.activeNav : ''}
                    />
                </View>
                <View className={styles.listWrapper}>
                    {pageList[current] &&
                        pageList[current].map((item, index) => {
                            return (
                                <View className={styles.itemWrapper} key={item.id}>
                                    <View className={styles.cartItemWrapper}>
                                        {/* <CartItem
                                            goodsId={item.id}
                                            goodsName={item.name}
                                            price={item.price}
                                            amount={item.quantity}
                                            imgSrc={item.packageImage}
                                            type="goods"
                                            handleAddAmountChange={() => {
                                                this.handleAddAmountChange(index, current)
                                            }}
                                            handleDisAmountChange={() => {
                                                this.handleDisAmountChange(index, current)
                                            }}
                                  /> */}
                                        <View className={styles.packageImage}>
                                            {item.goodsImage && (
                                                <Image
                                                    className={styles.packageImage}
                                                    src={BASEURL + item.goodsImage}
                                                />
                                            )}
                                        </View>
                                        <Text className={styles.title}>{item.name}</Text>
                                        <View className={styles.price}>
                                            <Price value={item.price} />
                                            <Image
                                                src={shoppingCart.cart_plus}
                                                className={styles.icon}
                                                onClick={() => {
                                                    this.setState({
                                                        isShow: true,
                                                        currentGoodsInfo: {
                                                            ...item,
                                                            buyNum: 1,
                                                        },
                                                    })
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                </View>
                {/* 浮层 */}
                <AtFloatLayout
                    isOpened={isShow}
                    onClose={() => {
                        this.setState({
                            isShow: false,
                        })
                    }}
                >
                    {/* <View className={styles.panelHeader}>已选商品</View> */}
                    <View className={styles.panelContent}>
                        <View className={styles.contentItem}>
                            <View className={styles.goodsInfo}>
                                <View className={styles.goodsImage}>
                                    {currentGoodsInfo.goodsImage && (
                                        <Image src={BASEURL + currentGoodsInfo.goodsImage} />
                                    )}
                                </View>
                                <View className={styles.right}>
                                    <View className={styles.name}>{currentGoodsInfo.name}</View>
                                    <View>
                                        <Price value={currentGoodsInfo.price} />
                                        <Text className={styles.storage}>
                                            库存{currentGoodsInfo.number || 0}
                                            {currentGoodsInfo.unit}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View className={styles.buyNum}>
                                <Text>购买数量</Text>
                                <View className={styles.operate}>
                                    <Image
                                        src={shoppingCart.cart_minus}
                                        className={styles.icon}
                                        onClick={() => this.handleDisAmountChangeByCart()}
                                    />
                                    <Text className={styles.amount}>{currentGoodsInfo.buyNum}</Text>
                                    <Image
                                        src={shoppingCart.cart_plus}
                                        className={styles.icon}
                                        onClick={() => this.handleAddAmountChangeByCart()}
                                    />
                                </View>
                            </View>
                            <View className={styles.buttonList}>
                                <Text onClick={this.handelAddToCart}>加入购物车</Text>
                                <Text onClick={this.handleBuy}>立即购买</Text>
                            </View>
                        </View>
                    </View>
                </AtFloatLayout>
                {/* BottomBar */}
                {/* <CartBottomBar
                    handleToggleCartPanel={this.handleToggleCartPanel}
                    price={this.getTotalPrice()}
                    gotoPay={this.gotoPay}
                    productNum={totalCartNum}
                /> */}
                <View className={styles.cart} onClick={this.handleToShoppingCart}>
                    <Image src={shoppingCart.cart_gray} />
                    <Text>{cartNum}</Text>
                </View>
            </View>
        )
    }
}

export default GoodList
