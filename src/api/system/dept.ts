import { DeptSearchVO, GetDeptInfoModel } from './model/deptModel'
import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  GetDeptList = '/meta-admin/dept/list',
  GetOrAddOrUpdateDept = '/meta-admin/dept',
  DelDept = '/meta-admin/dept/delete'
}

/**
 * 获取系统部门列表
 *
 * @description: Get user Role based on id
 */
export const getDeptList = (params?: DeptSearchVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get(
    { url: Api.GetDeptList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询部门详情
export const getDeptInfo = (id: number) => {
  return defHttp.get<GetDeptInfoModel>({ url: Api.GetOrAddOrUpdateDept + `/${id}` })
}

// 新增部门
export const addDept = (data: GetDeptInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateDept, data })
}

// 修改部门
export const updateDept = (data: GetDeptInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateDept, data })
}

// 删除部门
export const delDept = (id: number) => {
  return defHttp.delete({ url: Api.DelDept + `/${id}` })
}
