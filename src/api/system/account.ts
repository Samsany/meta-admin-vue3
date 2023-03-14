import { ErrorMessageMode } from '/#/axios'
import { defHttp } from '/@/utils/http/axios'
import { AccountVO, GetSysUserInfoModel, SetUserPasswordDTO, SysUserInfoVO } from './model/accountModel'
import { UpdateStatusDTO } from '/@/api/system/model/commonModel'

enum Api {
  GetSysUseList = '/meta-admin/user/list',
  GetOrAddOrUpdateOrDelSysUser = '/meta-admin/user',
  SetSysUserStatus = '/meta-admin/user/setStatus',
  SetSysUserPassword = '/meta-admin/user/setNewPassword'
}

/**
 * @description: 获取系统用户列表
 */
export const getSysUserList = (params?: AccountVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<SysUserInfoVO>(
    { url: Api.GetSysUseList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询系统用户详情
export const getSysUserInfo = (params: { id: number }) => {
  return defHttp.get<GetSysUserInfoModel>({ url: Api.GetOrAddOrUpdateOrDelSysUser + `/${params.id}` })
}

// 新增系统用户
export const addSysUser = (data: GetSysUserInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateOrDelSysUser, data })
}

// 修改系统用户
export const updateSysUser = (data: GetSysUserInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateOrDelSysUser, data })
}

// 修改系统用户状态
export const setSysUserStatus = (data: UpdateStatusDTO) => {
  return defHttp.put({ url: Api.SetSysUserStatus, data })
}

export const setSysUserNewPassword = (data: SetUserPasswordDTO) => {
  return defHttp.put({ url: Api.SetSysUserPassword, data })
}

// 删除系统用户
export const delSysUser = (data: number[]) => {
  return defHttp.delete({ url: Api.GetOrAddOrUpdateOrDelSysUser, data }, { successMessageMode: 'modal' })
}
