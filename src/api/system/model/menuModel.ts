import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type MenuVO = BasicPageParams & {
  name?: string
  path?: string
}

// 路由对象
export interface RouteItem {
  id: number
  path: string
  permission: string
  component: any
  meta: RouteMetaVO
  type: number
  name?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteItem[]
}

// 路由对象
export interface RouteMetaVO {
  title: string
  icon?: string
  alwaysShow?: boolean
  hidden?: boolean
  noCache?: boolean
  frameSrc?: string
  affix?: boolean
  breadcrumb?: boolean
  queryParams?: string
  requireAuth?: boolean
  sort: number
}

// 菜单对象
export interface Menu {
  id?: number
  parentId?: number
  name?: string
  title?: string
  permission?: string
  component?: any
  icon?: string
  path?: string
  queryParams?: string
  redirect?: any
  type?: number
  status?: number
  alwaysShow?: number
  affix?: number
  hidden?: number
  hideHeader?: number
  keepalive?: number
  requireAuth?: number
  sort?: number
  createBy?: any
  updateBy?: any
  createTime?: string
  updateTime?: string
  remark?: any
}

/**
 * @description: Get menu return value
 */
export type getRouteListResultModel = RouteItem[]

export type getMenuListResultModel = Menu[]

// 根据菜单对象生成响应模型
export type MenuDTO = BasicFetchResult<Menu>
