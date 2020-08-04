import Request from '../../utils/request'

export const getOrderPageList = (data) =>
    Request({
        url: '/api/user/order/signature/pageList',
        method: 'GET',
        data,
    })

export const getAchievementData = (data) =>
    Request({
        url: '/api/user/signature/statistics',
        method: 'GET',
        data,
    })
