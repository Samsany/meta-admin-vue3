import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type RoleVO = BasicPageParams & {
  name?: string
  code?: string
}
export interface GetRoleInfoModel {
  id?: number
  name: string
  code: string
}

// 根据对象生成响应模型
export type RoleDTO = BasicFetchResult<GetRoleInfoModel>
