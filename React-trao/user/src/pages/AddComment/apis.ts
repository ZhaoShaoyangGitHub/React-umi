/*
 * @LastEditors: Fox
 * @Description: In User Settings Edit
 * @Author: Fox
 * @Date: 2019-08-12 16:45:56
 * @LastEditTime: 2019-08-21 15:05:02
 */
import Request from '../../utils/request'

export const addComment = (data) => {
    return Request({
        url: '/api/user/evaluation',
        method: 'POST',
        data,
    })
}

export const updateComment = (data) => {
    return Request({
        url: '/api/user/update/evaluation',
        method: 'POST',
        data,
    })
}

export const getTechnicianInfo = (data) => {
    return Request({
        url: '/api/user/get/technicians',
        method: 'GET',
        data,
    })
}

export const getCommentInfo = (data) => {
    return Request({
        url: '/api/user/evaluation',
        method: 'GET',
        data,
    })
}
