import Request from '../../utils/request'

export const getEnshrine = (data) =>
    Request({
        url: '/api/u/enshrine/get',
        method: 'GET',
        data,
    })
