export interface BasicPageParams {
  pageNum?: number
  pageSize?: number
}

export interface BasicFetchResult<T> {
  list: T[]
  totalCount: number
}
