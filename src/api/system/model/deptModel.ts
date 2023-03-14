import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type DeptSearchVO = BasicPageParams & {
  keyword?: string
  status?: number
  queryMode?: string
}

export interface GetDeptInfoModel {
  id?: number
  ancestors?: string
  deptName?: string
  children?: GetDeptInfoModel[]
  status?: number
  sort?: number
  createTime?: string
  remark?: string
}

export interface DepartInfo {
  id?: number
  parentId?: number
  ancestors?: string
  deptName?: string
  status?: number
  sort?: number
  leader?: string
  phone?: string
  email?: string
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  remark?: string
}

// 根据对象生成响应模型
export type DeptDTO = BasicFetchResult<GetDeptInfoModel>
