export interface AppointmentListState {
    isFetching: boolean
    shopId: number
    date: string
    nameList: any[]
    dateList: any[]
    storeInfo: any
}

export interface AppointmentListProps {
    dispatch?: any
}
