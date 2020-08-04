import Request from '../../utils/request'

export const getConsumptionInfo = (data) =>
    Request({
        url: '/api/user/getVipUser/consumption',
        method: 'GET',
        data,
    })

export const getServiceRecord = (data) =>
    Request({
        url: '/api/user/getVipUser/serviceRecord',
        method: 'GET',
        data,
    })

export const getPackageList = (data) =>
    Request({
        url: '/api/user/order/get/packageList',
        method: 'GET',
        data,
    })
