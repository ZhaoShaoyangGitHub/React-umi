import Request from '../../utils/request'

export const addTechnician = (data) =>
    Request({
        url: '/api/technician/save',
        method: 'POST',
        data,
    })
