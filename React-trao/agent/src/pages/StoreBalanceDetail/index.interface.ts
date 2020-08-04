export interface StoreBalanceDetailState {
    shopId: number
    date: string
    detailList: any[]
    pageIndex: number
    hasMore: boolean
}

export interface StoreBalanceDetailProps {
    dispatch?: any
}
