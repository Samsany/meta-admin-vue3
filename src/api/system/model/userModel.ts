/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  grant_type: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  bearerType: string;
  accessToken: string;
  refreshToken: string;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 角色组
  roles: RoleInfo[];
  // 权限组
  permissions: string[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
