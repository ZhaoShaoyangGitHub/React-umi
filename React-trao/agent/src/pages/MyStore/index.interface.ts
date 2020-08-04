export interface MyStoreState {
    seletInd: number
    showList: any[]
    isFetching: boolean
    keyword: string
    pageIndex: number
    hasMore: boolean
}

export interface MyStoreProps {
    dispatch?: any
}
