import Request from '../../utils/request'

export const getStoreList = (data) =>
    Request({
        url: '/api/shop/pageList',
        method: 'GET',
        data,
    })
