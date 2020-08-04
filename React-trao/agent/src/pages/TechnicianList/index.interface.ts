export interface TechnicianListState {
    showList: any[]
    isFetching: boolean
    pageIndex: number
    hasMore: boolean
    shopId: number
    storeInfo: any
}

export interface TechnicianListProps {
    dispatch?: any
}
