import { defHttp } from '/@/utils/http/axios';
// import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetRoleList = '/meta-admin/role/list',
}

/**
 * 获取角色列表
 *
 * @description: Get user menu based on id
 */
export const getRoleList = () => {
  return defHttp.get<>({ url: Api.GetRoleList });
};
