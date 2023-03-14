import { BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type RoleParamsVO = BasicPageParams & {
  roleName?: string
  roleCode?: string
}
export interface GetRoleInfoModel {
  id?: number
  roleName: string
  roleCode: string
  status: number
  remark: string
  createTime: string
  createBy: string
  menuIds?: number[]
}

export interface RoleInfo {
  id?: number
  parentId?: number
  ancestors?: string
  deptName?: string
  status?: number
  sort?: number
  leader?: null
  phone?: null
  email?: null
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  remark?: string
}
