import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'
import { DepartInfo } from '/@/api/system/model/deptModel'
import { RoleInfo } from '/@/api/system/model/roleModel'

export interface AccountExist {
  id?: number
  account: string
}

export interface SetUserPasswordDTO {
  id: number
  oldPassword?: string
  newPassword: string
}

export interface GetSysUserInfoModel {
  id?: number
  account?: string
  deptId?: number
  depart?: DepartInfo
  roles?: RoleInfo[]
  realName?: string
  nickname?: string
  avatar?: string
  mobile?: string
  email?: string
  gender?: number
  birthday?: string
  status?: number
  loginDate?: string
  loginIp?: string
  registerIp?: string
  registerAddress?: string
  registerSource?: string
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  remark?: string
}

export type AccountVO = BasicPageParams & {
  // 角色组
  deptId?: string | number
  // 账户
  account?: string
  // 用户名
  nickname?: string
}

// 根据对象生成响应模型
export type SysUserInfoVO = BasicFetchResult<GetSysUserInfoModel>
