import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import { AtInputNumber } from 'taro-ui'
import { CartItemProps, CartItemState } from './index.interface'
import Price from '../Price'
import styles from './index.module.less'
import { shoppingCart } from '../../assets/img/load'

class CartItem extends Component<CartItemProps, CartItemState> {
    constructor(props: CartItemProps) {
        super(props)
        this.state = {}
    }
    static defaultProps: CartItemProps = {
        cartId: 0,
        goodsId: 0,
        goodsName: '精油spa按压',
        price: 139,
        amount: 2,
        imgSrc: 'http://photo.orsoon.com/180419/180419_64/UMISShRmfk_small.jpg',
        inventory: 1000,
        isValid: true,
        handleQuantityChange: () => {},
        handleShowInventoryToast: () => {},
        handleDisAmountChange: () => {},
        handleAddAmountChange: () => {},
        type: 'cart',
    }
    handleAmountChange = (value: number) => {
        console.log('handleAmountChange', value)
        const { cartId, handleQuantityChange, inventory, handleShowInventoryToast, amount } = this.props
        let type = 1 // 1为+，2为-
        if (amount < value) {
            type = 1
        } else {
            type = 2
        }
        if (value >= 1) {
            if (value > inventory) {
                handleShowInventoryToast()
                handleQuantityChange(cartId, 0, type)
            } else {
                handleQuantityChange(cartId, Math.abs(value - amount), type)
            }
        }
    }
    handleGoodsAmountChange = (value: number) => {
        console.log('handleGoodsAmountChange', value)
        console.log('添加购物车成功弹窗 应该在GoodList里写 不在这写')
    }
    componentDidMount() {
        // TODO: 重置购物车数量
    }
    render() {
        const {
            isValid,
            imgSrc,
            goodsName,
            price,
            amount,
            inventory,
            type,
            handleAddAmountChange,
            handleDisAmountChange,
        } = this.props
        if (!isValid) {
            return (
                <View className={styles.CartItemMain}>
                    <View className={classNames(styles.item, styles.invalidItem)}>
                        <View className={styles.imgWrapper}>
                            {imgSrc && <Image src={imgSrc} className={styles.img} />}
                        </View>
                        <View className={styles.content}>
                            <View className={styles.top}>{goodsName}</View>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View className={styles.CartItemMain}>
                <View className={classNames(styles.item, styles.validItem)}>
                    <View className={styles.imgWrapper}>{imgSrc && <Image src={imgSrc} className={styles.img} />}</View>
                    <View className={styles.content}>
                        <View className={styles.top}>{goodsName}</View>
                        <View className={styles.bottom}>
                            <View className={styles.left}>
                                <Price value={price} />
                            </View>
                            <View className={styles.right}>
                                {type === 'order' && <View className={styles.amount}>x{amount}</View>}
                                {type === 'cart' && (
                                    <AtInputNumber
                                        min={1}
                                        max={inventory}
                                        step={1}
                                        value={amount}
                                        type="number"
                                        onChange={(value) => this.handleAmountChange(value)}
                                    />
                                )}
                                {type === 'goods' &&
                                    (amount ? (
                                        <View className={styles.amountGoods}>
                                            <Image
                                                src={shoppingCart.cart_minus}
                                                className={styles.icon}
                                                // onClick={() => this.handleGoodsAmountChange(amount - 1)}
                                                onClick={() => {
                                                    handleDisAmountChange()
                                                }}
                                            />
                                            <Text className={styles.amount}>{amount}</Text>
                                            <Image
                                                src={shoppingCart.cart_plus}
                                                className={styles.icon}
                                                // onClick={() => this.handleGoodsAmountChange(amount + 1)}
                                                onClick={() => {
                                                    handleAddAmountChange()
                                                }}
                                            />
                                        </View>
                                    ) : (
                                        <View className={styles.amountGoods}>
                                            <Image
                                                src={shoppingCart.cart_plus}
                                                className={styles.icon}
                                                // onClick={() => this.handleGoodsAmountChange(1)}
                                                onClick={() => {
                                                    handleAddAmountChange()
                                                }}
                                            />
                                        </View>
                                    ))}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CartItem
