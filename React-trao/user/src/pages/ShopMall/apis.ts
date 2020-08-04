import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })

// 获取套餐分类
export const getPackageCategory = (data) => {
    return Request({
        url: '/api/u/category/list',
        method: 'GET',
        data,
    })
}
