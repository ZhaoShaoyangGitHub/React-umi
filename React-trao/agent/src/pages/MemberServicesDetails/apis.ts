import Request from '../../utils/request'

export const getServiceDetails = (data) =>
    Request({
        url: '/api/user/getVipUser/serviceDetails',
        method: 'GET',
        data,
    })
