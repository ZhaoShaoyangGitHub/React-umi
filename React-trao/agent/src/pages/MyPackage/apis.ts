import Request from '../../utils/request'

export const getGoodsPackage = (data) =>
    Request({
        url: '/api/goodsPackage/pageList',
        method: 'GET',
        data,
    })

export const addGoodsPackage = (data) =>
    Request({
        url: '/api/goodsPackage/save',
        method: 'POST',
        data,
    })

export const getPackageDetail = (data) =>
    Request({
        url: '/api/goodsPackage/detail',
        method: 'GET',
        data,
    })
export const getServiceProject = (data) =>
    Request({
        url: '/api/goodsPackage/serviceProject',
        method: 'GET',
        data,
    })

export const upDownPackageStore = (data) =>
    Request({
        url: '/api/goodsPackage/upDown',
        method: 'POST',
        data,
    })
