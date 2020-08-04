export interface GoodsDetailsListState {
    showList: any[]
    pageIndex: number
    hasMore: boolean
    goodsNameId: number | string
    goodsTypeId: number | string
    startDate: string
    endDate: string
    currentFilterIndex: number
    goodsNameList: any[]
}

export interface GoodsDetailsListProps {
    dispatch?: any
    type?: string
}
