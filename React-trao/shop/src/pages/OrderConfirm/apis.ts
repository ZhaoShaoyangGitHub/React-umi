import Request from '../../utils/request'

export const demo = data =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const saveTrade = data =>
    Request({
        url: '/api/user/order/affirm/saveTrade',
        method: 'POST',
        data,
    })
/**
 * 判断用户是否第一次下单
 * @param data
 */
export const judgeOneTrade = data =>
    Request({
        url: '/api/user/judgeOneTrade',
        method: 'GET',
        data,
    })
