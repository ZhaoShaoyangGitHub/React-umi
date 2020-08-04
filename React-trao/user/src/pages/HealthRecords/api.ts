import Request from '../../utils/request'

export const getHealthRecords = () =>
    Request({
        url: '/api/user/healthRecords',
        method: 'GET',
    })

export const setWeightRecord = (data) =>
    Request({
        url: '/api/user/save/weight/record',
        method: 'POST',
        data,
    })

export const setMenstruationRecord = (data) =>
    Request({
        url: '/api/user/save/menstruation/record',
        method: 'POST',
        data,
    })

export const setSymptom = (data) =>
    Request({
        url: '/api/user/save/symptom',
        method: 'POST',
        data,
    })

export const getUpdateRecord = () =>
    Request({
        url: '/api/user/get/update/record',
        method: 'GET',
    })
