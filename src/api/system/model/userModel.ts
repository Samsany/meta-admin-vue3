import { BasicPageParams } from '../../model/baseModel'

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
  grant_type: string
  key: string
  code: string
  state?: string
}

export interface ThirdLoginParams {
  token: string
  thirdType: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  bearerType: string
  accessToken: string
  refreshToken: string
  token: string
  role: RoleInfo
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 角色组
  roles: RoleInfo[]
  // 权限组
  permissions: string[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实名字
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
  homePath?: string
}

export type AccountVO = BasicPageParams & {
  // 角色组
  deptId?: string | number
  // 账户
  account?: string
  // 用户名
  nickname?: string
}
