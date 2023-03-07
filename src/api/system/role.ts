import { defHttp } from '/@/utils/http/axios'
import { GetRoleInfoModel, RoleVO } from './model/roleModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  GetAllRoleList = '/meta-admin/role/allList',
  GetRoleList = '/meta-admin/role/list',
  GetOrAddOrUpdateRole = '/meta-admin/role',
  SetRoleStatus = '/meta-admin/role/setStatus',
  DelRole = '/meta-admin/role/delete'
}

/**
 * 获取系统所有角色列表
 *
 * @description: Get user Role based on id
 */
export const getAllRoleList = (mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetRoleInfoModel>(
    { url: Api.GetAllRoleList },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * 获取系统角色列表
 *
 * @description: Get user Role based on id
 */
export const getRoleList = (params?: RoleVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetRoleInfoModel>(
    { url: Api.GetRoleList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询角色详情
export const getRoleInfo = (params: { id: number }) => {
  return defHttp.get<GetRoleInfoModel>({ url: Api.GetOrAddOrUpdateRole + `/${params.id}` })
}

// 新增角色
export const addRole = (data: GetRoleInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateRole, data })
}

// 修改角色
export const updateRole = (data: GetRoleInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateRole, data })
}

// 修改角色状态
export const setRoleStatus = (id: number | string, status: number | string) => {
  return defHttp.get({ url: Api.SetRoleStatus + `/${id}`, params: { status } })
}

// 删除角色
export const delRole = (data: number[]) => {
  return defHttp.delete({ url: Api.DelRole, data })
}
