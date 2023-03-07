import { ErrorMessageMode } from '/#/axios'
import { defHttp } from '/@/utils/http/axios'
import { GetRoleInfoModel } from '/@/api/system/model/roleModel'
import { AccountVO } from './model/userModel'

enum Api {
  GetAccountList = '/meta-admin/user/list',
  GetOrAddOrUpdateAccount = '/meta-admin/user',
  DelAccount = '/meta-admin/user/delete'
}

/**
 * @description: 获取系统用户列表
 */
export const getAccountList = (params?: AccountVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetRoleInfoModel>(
    { url: Api.GetAccountList, params },
    {
      errorMessageMode: mode
    }
  )
}
