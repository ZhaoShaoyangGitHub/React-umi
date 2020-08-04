import Request from '../../utils/request'

export const demo = (data) =>
    Request({
        url: '/api/demo',
        method: 'GET',
        data,
    })
export const currentInfo = (data) =>
    Request({
        url: '/api/user/home/info',
        method: 'GET',
        data,
    })
export const getAreaData = () => {
    return Request({
        url: '/api/common/get/region',
        method: 'GET',
    })
}
