import Request from '../../utils/request'

export const getQuestionList = (data) =>
    Request({
        url: '/api/u/Constitution/getList',
        method: 'GET',
        data,
    })

export const getResult = () =>
    Request({
        url: '/api/u/Constitution/result',
        method: 'GET',
    })

export const saveResult = (data) =>
    Request({
        url: '/api/u/Constitution/save',
        method: 'POST',
        data,
    })
