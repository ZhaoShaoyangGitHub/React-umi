export interface AppointmentListState {
    isFetching: boolean
    date: string
    nameList: any[]
    dateList: any[]
}

export interface AppointmentListProps {
    dispatch?: any
}
