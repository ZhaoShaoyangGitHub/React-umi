import Request from '../../utils/request'

export const getIntegral = () =>
    Request({
        url: '/api/user/get/integral',
        method: 'GET',
    })
