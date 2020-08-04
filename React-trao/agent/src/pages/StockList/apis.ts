import Request from '../../utils/request'

export const pageList = (data) =>
    Request({
        url: '/api/goods/getInventory/pageList',
        method: 'GET',
        data,
    })

// 商品名列表
export const goodsNameList = (data) =>
    Request({
        url: '/api/goods/goodsNameList',
        method: 'GET',
        data,
    })

// 商品明细列表
export const goodsRecordList = (data) =>
    Request({
        url: '/api/goods/recordPageList',
        method: 'GET',
        data,
    })

// 发货
export const deliverTrade = (data) =>
    Request({
        url: '/api/order/deliverTrade',
        method: 'POST',
        data,
    })
