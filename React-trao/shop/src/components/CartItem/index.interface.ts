/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-06 18:34:27
 * @LastEditTime: 2019-08-19 16:22:42
 */

/**
 * CartItem.state 参数类型
 *
 * @export
 * @interface CartItemState
 */
export interface CartItemState {}

/**
 * CartItem.props 参数类型
 *
 * @export
 * @interface CartItemProps
 */
export interface CartItemProps {
    cartId: number
    goodsId: number
    goodsName: string
    price: number
    amount: number
    imgSrc: string
    inventory: number
    isValid: boolean
    efficacy?: string
    type?: 'cart' | 'order' | 'goods'
    handleQuantityChange: (cartId: number, amount: number) => void
    handleShowInventoryToast: () => void
    handleAddAmountChange: () => void
    handleDisAmountChange: () => void
}
