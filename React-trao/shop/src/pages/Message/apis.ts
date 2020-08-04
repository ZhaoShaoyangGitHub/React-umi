import Request from '../../utils/request'

export const getMessageNumber = () =>
    Request({
        url: '/api/u/message/search/number',
        method: 'GET',
    })
export const getMessageData = (data) =>
    Request({
        url: '/api/u/message/search/message',
        method: 'GET',
        data,
    })
