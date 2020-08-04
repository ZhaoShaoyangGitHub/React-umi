import Request from '../../utils/request'

export const getCollectionList = (data) =>
    Request({
        url: '/api/u/enshrine/get',
        method: 'GET',
        data,
    })
