import Request from '../../utils/request'

export const getDetails = (data) => {
    return Request({
        url: '/api/u/article/details',
        method: 'GET',
        data,
    })
}

export const addCollection = (data) => {
    return Request({
        url: '/api/u/enshrine/add',
        method: 'POST',
        data,
    })
}

export const cancelCollection = (data) => {
    return Request({
        url: '/api/u/enshrine/delete',
        method: 'POST',
        data,
    })
}

export const addLike = (data) => {
    return Request({
        url: '/api/technician/like',
        method: 'POST',
        data,
    })
}
export const cancelLike = (data) => {
    return Request({
        url: '/api/technician/cancel/like',
        method: 'POST',
        data,
    })
}
