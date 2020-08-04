import Request from '../../utils/request'

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
