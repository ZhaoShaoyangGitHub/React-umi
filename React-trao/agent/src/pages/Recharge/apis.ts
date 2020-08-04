import Request from '../../utils/request'

export const balanceList = (data) =>
    Request({
        url: '/api/system/amount/list',
        method: 'GET',
        data,
    })
export const recharge = (data) =>
    Request({
        url: '/api/user/payApplet',
        method: 'POST',
        data,
    })
