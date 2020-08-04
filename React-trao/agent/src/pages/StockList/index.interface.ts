export interface StockListState {
    seletInd: number
    showList: any[]
    isFetching: boolean
    keyword: string
    pageIndex: number
    hasMore: boolean
}

export interface StockListProps {
    dispatch?: any
}
