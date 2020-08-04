import Request from '../../utils/request'

export const getAppointment = () =>
    Request({
        url: '/api/u/order/begin/appointment',
        method: 'GET',
    })

export const articleCategoryList = () => {
    return Request({
        url: '/api/u/article/category/list',
        method: 'GET',
    })
}

export const articleList = (data) => {
    return Request({
        url: '/api/u/article/list',
        data,
        method: 'GET',
    })
}

export const getIsConfirmOrder = (data) => {
    return Request({
        url: '/api/home/confirm/order',
        data,
        method: 'GET',
    })
}
export const getAreaData = () => {
    return Request({
        url: '/api/common/get/region',
        method: 'GET',
    })
}
export const confirmService = () => {
    return Request({
        url: '/api/u/order/all/confirm',
        method: 'GET',
    })
}
