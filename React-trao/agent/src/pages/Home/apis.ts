import Request from '../../utils/request'

export const getHomeData = () =>
    Request({
        url: '/api/home',
        method: 'GET',
    })
export const getAreaData = () => {
    return Request({
        url: '/api/common/get/region',
        method: 'GET',
    })
}
