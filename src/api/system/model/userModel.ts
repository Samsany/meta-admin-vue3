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

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  avatar?: string
  type: number
  username: string
  roles: string[]
  bearerType: string
  accessToken: string
  refreshToken: string
  jti: string
  expiresIn: number
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
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
  // 角色组
  roles?: string[]
  // 权限组
  permissions?: string[]
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
