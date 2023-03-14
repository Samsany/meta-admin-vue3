export interface BasicPageParams {
  pageNum?: number
  pageSize?: number
}

export interface BasicFetchResult<T> {
  totalCount: number
  totalPage: number
  pageNum: number
  pageSize: number
  hasNextPage: boolean
  list: T[]
}
