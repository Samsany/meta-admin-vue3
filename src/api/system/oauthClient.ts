import { defHttp } from '/@/utils/http/axios'

import { ErrorMessageMode } from '/#/axios'
import { GetOauthClientInfoModel, OauthClientDTO, OauthClientVO } from '/@/api/system/model/oauthClientModel'
import { UpdateStatusDTO } from '/@/api/system/model/commonModel'

enum Api {
  GetOauthClientList = '/meta-admin/oauth-client/list',
  GetOrAddOrUpdateOauthClient = '/meta-admin/oauth-client',
  SetOauthClientStatus = '/meta-admin/oauth-client/setStatus',
  DelOauthClient = '/meta-admin/oauth-client/delete'
}

/**
 * 获取系统客户端列表
 *
 * @description: Get user Role based on id
 */
export const getOauthClientList = (params?: OauthClientVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<OauthClientDTO>(
    { url: Api.GetOauthClientList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询客户端详情
export const getOauthClientInfo = (id: number) => {
  return defHttp.get<GetOauthClientInfoModel>({ url: Api.GetOrAddOrUpdateOauthClient + `/${id}` })
}

// 新增客户端
export const addOauthClient = (data: GetOauthClientInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateOauthClient, data })
}

// 修改客户端
export const updateOauthClient = (data: GetOauthClientInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateOauthClient, data })
}

// 修改客户端状态
export const setOauthClientStatus = (data: UpdateStatusDTO) => {
  return defHttp.get({ url: Api.SetOauthClientStatus, params: data })
}

// 删除客户端
export const delOauthClient = (data: number[]) => {
  return defHttp.delete({ url: Api.DelOauthClient, data })
}
