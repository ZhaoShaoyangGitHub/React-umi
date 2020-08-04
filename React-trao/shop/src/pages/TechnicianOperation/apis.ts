import Request from '../../utils/request'

export const addTechnician = (data) =>
    Request({
        url: '/api/user/technician/save',
        method: 'POST',
        data,
    })
