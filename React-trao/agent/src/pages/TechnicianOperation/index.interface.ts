export interface TechnicianOperationState {
    technicianId?: number
    shopId?: number
    areaData: Array<Array<string>>
    currentSelector: Array<number>
    province?: string
    city?: string
    district?: string
    address?: string
    name?: string
    phone?: string
    idCard?: string
    password?: string
    [propName: string]: any
}

export interface TechnicianOperationProps {
    dispatch?: any
}
