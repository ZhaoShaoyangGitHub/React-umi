import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { CartProps, CartState, CartClass } from './index.interface'
import styles from './Cart.module.less'
import { Icons, EmptyImg } from '../../assets/img/load'
import CartItem from '../../components/CartItem/index'
import Price from '../../components/Price'
import { BASEURL } from '../../config/index'
import { flatten } from '../../utils/function'

enum CartStatus {
    NotSell = 1,
    OnSell = 2,
    OffShelf = 3,
}
@connect(({ Cart }) => ({
    ...Cart,
}))
class Cart extends Component<CartProps, CartState> {
    config: Config = {
        navigationBarTitleText: '购物车',
    }
    constructor(props: CartProps) {
        super(props)
        this.state = {
            allValidData: [],
            validList: [],
            invalidList: [],
            selectedRowKeys: [],
            totalPrice: 0,
            allValidKeys: [],
            allInvalidKeys: [],
            checkAll: false,
            totalNumber: 0,
            isEdit: false,
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'Cart/getCartList',
        })
    }

    componentDidShow() {
        this.props.dispatch({
            type: 'Cart/getCartList',
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.CartDataList !== this.props.CartDataList) {
            const data = nextProps.CartDataList
            const validList: Array<any> = [] // 生效的列表(包含店铺信息)
            const invalidList: Array<CartClass> = [] // 不生效的列表(不包含店铺信息)
            const allValidKeys: Array<number> = [] // 所有生效的CartId
            const allInvalidKeys: Array<number> = [] // 所有不生效的CartId
            const allValidData: Array<any> = [] // 所有生效的商品数据
            for (let i = 0; i < data.length; i++) {
                const el = data[i]
                const obj = {
                    shopId: 0,
                    storeName: '',
                    children: [] as Array<CartClass>,
                }
                obj.storeName = el.shopName
                const validChildren: Array<CartClass> = []
                for (let j = 0; j < el.cartResponses.length; j++) {
                    const cart = el.cartResponses[j]
                    const childrenItem = {
                        cartId: cart.id,
                        goodsId: cart.goodsId,
                        goodsName: cart.goodsName,
                        price: cart.price,
                        amount: cart.amount,
                        imageUrl: BASEURL + cart.imageUrl,
                        goodsType: cart.goodsType,
                        isValid: true,
                    }
                    if (cart.status === CartStatus.OnSell) {
                        obj.shopId = cart.shopId
                        validChildren.push(childrenItem)
                        allValidKeys.push(cart.id)
                        allValidData.push({
                            id: cart.id,
                            domainId: cart.goodsId,
                            type: cart.goodsType.value === 1 ? 2 : 1,
                        })
                    } else {
                        allInvalidKeys.push(cart.id)
                        childrenItem.isValid = false
                        invalidList.push(childrenItem)
                    }
                }
                if (validChildren.length) {
                    obj.children = validChildren
                    validList.push(obj)
                }
            }
            this.setState({
                validList,
                invalidList,
                allValidKeys,
                allInvalidKeys,
                allValidData,
            })
        }
    }
    handleCartItemCheck = (cartId: number) => {
        // 生效商品选择
        const { selectedRowKeys, allValidKeys } = this.state
        const index: number = selectedRowKeys.indexOf(cartId)
        const newRowKeys: Array<number> = selectedRowKeys.slice()
        if (index > -1) {
            newRowKeys.splice(index, 1)
        } else {
            newRowKeys.push(cartId)
        }
        this.setState(
            {
                selectedRowKeys: newRowKeys,
                checkAll: newRowKeys.length === allValidKeys.length,
            },
            () => {
                this.calculateTotal()
            },
        )
    }
    onCheckAllChange = () => {
        // 全选
        const { allValidKeys, checkAll } = this.state
        this.setState(
            {
                selectedRowKeys: !checkAll ? allValidKeys : [],
                checkAll: !checkAll,
            },
            () => {
                this.calculateTotal()
            },
        )
    }

    handleQuantityChange = (cartId: number, value: number): void => {
        const _this = this
        const { validList } = this.state
        this.props.dispatch({
            type: 'Cart/changeAmount',
            payload: {
                id: cartId,
                amount: Number(value),
            },
            callback: () => {
                const shopIndex: number = validList.findIndex((shop) =>
                    shop.children.some((cart: CartClass) => cart.cartId === cartId),
                )
                const childIndex: number = validList[shopIndex].children.findIndex(
                    (cart: CartClass) => cart.cartId === cartId,
                )
                const newValidList = validList.slice()
                newValidList[shopIndex].children[childIndex].amount = value
                this.setState({
                    validList: newValidList,
                })
                _this.calculateTotal()
            },
        })
    }
    calculateTotal = () => {
        // 计算总额
        const { selectedRowKeys, validList } = this.state
        if (validList.length) {
            const invalidGoodsList: Array<any> = validList.slice().map((group) => group.children) || []
            const calList: Array<any> = flatten(invalidGoodsList).filter((item) => {
                return selectedRowKeys.includes(item.cartId)
            })
            const totalPrice: number = calList
                .map((item) => {
                    return item.price * item.amount
                })
                .reduce((first, second) => {
                    return first + second
                }, 0)
            const totalNumber: number = calList
                .map((item) => {
                    return item.amount
                })
                .reduce((first, second) => {
                    return Number(first) + Number(second)
                }, 0)
            this.setState({
                totalPrice,
                totalNumber,
            })
        }
    }
    handleEditChange = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        })
    }
    handleDelete = () => {
        const { selectedRowKeys } = this.state
        this.props.dispatch({
            type: 'Cart/delete',
            payload: {
                ids: selectedRowKeys,
            },
            callback: () => {
                this.setState({
                    selectedRowKeys: [],
                })
            },
        })
    }
    handleStar = () => {
        const { allValidData, selectedRowKeys } = this.state
        const collectList: any = []
        allValidData.forEach((item) => {
            selectedRowKeys.forEach((id) => {
                if (id === item.id) {
                    collectList.push(item)
                }
            })
        })
        this.props.dispatch({
            type: 'Cart/collect',
            payload: {
                userEnshrineForms: collectList,
            },
            callback: () => {
                Taro.showToast({
                    title: '收藏成功',
                })
            },
        })
    }
    handleClearInvalid = () => {
        const { allInvalidKeys } = this.state
        this.props.dispatch({
            type: 'Cart/delete',
            payload: {
                ids: allInvalidKeys,
            },
        })
    }
    gotoConfirm = () => {
        const { selectedRowKeys } = this.state
        if (!selectedRowKeys.length) {
            Taro.showToast({
                title: '请选择商品',
                icon: 'none',
            })
            return
        }
        console.log('去支付', selectedRowKeys)
        this.props.dispatch({
            type: 'OrderConfirm/getCartData',
            payload: {
                ids: selectedRowKeys,
            },
            callback: () => {
                this.props.dispatch({
                    type: 'OrderConfirm/save',
                    payload: {
                        currentAddress: {},
                    },
                })
                Taro.navigateTo({
                    url: '/pages/OrderConfirm/index',
                })
            },
        })
    }
    render() {
        const { validList, invalidList, selectedRowKeys, totalPrice, checkAll, totalNumber, isEdit } = this.state
        const allList: Array<any> = [...validList, ...invalidList]
        if (!allList.length) {
            return (
                <View className={styles.emptyWrapper}>
                    <Image className={styles.emptyImg} src={EmptyImg.emptyCart} />
                    <Text className={styles.emptyWord}>购物车暂时没有商品呦～</Text>
                </View>
            )
        }
        return (
            <View className={styles.cartMain}>
                <View className={styles.topWrapper}>
                    <Text className={styles.totalNumber}>共{totalNumber}件商品</Text>
                    <Text className={styles.editButton} onClick={this.handleEditChange}>
                        {isEdit ? '完成' : '编辑'}
                    </Text>
                </View>
                <View className={styles.cartList}>
                    {Array.isArray(validList) && validList.length !== 0 && (
                        <View className={styles.validList}>
                            {validList.map((store) => {
                                return (
                                    <View className={styles.itemsWrapper} key={store.storeId}>
                                        <View className={styles.itemsTitle}>{store.storeName}</View>
                                        <View className={styles.itemsChildren}>
                                            {store.children.map((item: any) => {
                                                return (
                                                    <View className={styles.itemWrapper} key={item.cartId}>
                                                        <View
                                                            className={styles.checkboxWrapper}
                                                            onClick={() => this.handleCartItemCheck(item.cartId)}
                                                        >
                                                            {selectedRowKeys.includes(item.cartId) ? (
                                                                <Image
                                                                    src={Icons.selected}
                                                                    className={styles.checkedIcon}
                                                                />
                                                            ) : (
                                                                <View className={styles.uncheckedIcon} />
                                                            )}
                                                        </View>
                                                        <View className={styles.cartItemWrapper}>
                                                            <CartItem
                                                                cartId={item.cartId}
                                                                goodsId={item.goodsId}
                                                                goodsName={item.goodsName}
                                                                price={item.price}
                                                                amount={item.amount}
                                                                imgSrc={item.imageUrl}
                                                                inventory={item.inventory}
                                                                isValid={item.isValid}
                                                                handleQuantityChange={this.handleQuantityChange}
                                                            />
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                    {Array.isArray(invalidList) && invalidList.length !== 0 && (
                        <View className={styles.itemsWrapper}>
                            <View className={styles.itemsTitle}>
                                <View> 失效商品{invalidList.length} 件 </View>
                                <View className={styles.extraButton} onClick={this.handleClearInvalid}>
                                    {' '}
                                    清空
                                </View>
                            </View>
                            <View className={styles.invalidList}>
                                {invalidList.map((item) => {
                                    return (
                                        <View className={styles.itemWrapper} key={item.cartId}>
                                            <View className={styles.cartItem}>
                                                <CartItem
                                                    cartId={item.cartId}
                                                    goodsId={item.goodsId}
                                                    goodsName={item.goodsName}
                                                    price={item.price}
                                                    amount={item.amount}
                                                    imgSrc={item.imageUrl}
                                                    inventory={item.inventory}
                                                    isValid={false}
                                                />
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )}
                </View>
                <View className={styles.bottom}>
                    <View className={styles.checkAll}>
                        <View className={styles.checkboxWrapper} onClick={() => this.onCheckAllChange()}>
                            {checkAll ? (
                                <Image src={Icons.selected} className={styles.checkedIcon} />
                            ) : (
                                <View className={styles.uncheckedIcon} />
                            )}
                            <Text className={styles.label}>全选</Text>
                        </View>
                    </View>
                    {isEdit ? (
                        <View className={styles.star} onClick={this.handleStar}>
                            加入我的收藏
                        </View>
                    ) : (
                        <View className={styles.totalprice}>
                            合计： <Price value={totalPrice} />
                        </View>
                    )}
                    {isEdit ? (
                        <View className={styles.delete} onClick={this.handleDelete}>
                            删除
                        </View>
                    ) : (
                        <View className={styles.confirm} onClick={this.gotoConfirm}>
                            去结算
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default Cart
