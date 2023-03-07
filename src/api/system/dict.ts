import { DictDataVO, DictVO, GetDictDataInfoModel, GetDictInfoModel } from './model/dictModel'
import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  GetDictList = '/meta-admin/dict/type/list',
  GetOrAddOrUpdateDict = '/meta-admin/dict/type',
  DelDict = '/meta-admin/dict/type/delete',
  GetDictDataList = '/meta-admin/dict/data/list',
  GetDictDataByDictTypeList = '/meta-admin/dict/data/type',
  GetOrAddOrUpdateDictData = '/meta-admin/dict/data',
  DelDictData = '/meta-admin/dict/data'
}

/**
 * 获取字典类型列表
 *
 * @description: Get user Role based on id
 */
export const getDictList = (params?: DictVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get(
    { url: Api.GetDictList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询字典类型详情
export const getDictInfo = (id: number) => {
  return defHttp.get<GetDictInfoModel>({ url: Api.GetOrAddOrUpdateDict + `/${id}` })
}

// 新增字典类型
export const addDict = (data: GetDictInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateDict, data })
}

// 修改字典类型
export const updateDict = (data: GetDictInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateDict, data })
}

// 删除字典类型
export const delDict = (id: number) => {
  return defHttp.delete({ url: Api.DelDict + `/${id}` })
}

/**
 * 获取字典类型列表
 *
 * @description: Get user Role based on id
 */
export const getDictDataList = (params?: DictDataVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get(
    { url: Api.GetDictDataList, params },
    {
      errorMessageMode: mode
    }
  )
}

export const getDictDataByDictTypeList = (dictType: string, mode: ErrorMessageMode = 'message') => {
  return defHttp.get(
    { url: Api.GetDictDataByDictTypeList + `/${dictType}` },
    {
      errorMessageMode: mode
    }
  )
}

// 查询字典类型详情
export const getDictDataInfo = (id: number) => {
  return defHttp.get<GetDictDataInfoModel>({ url: Api.GetOrAddOrUpdateDictData + `/${id}` })
}

// 新增字典类型
export const addDictData = (data: GetDictDataInfoModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateDictData, data })
}

// 修改字典类型
export const updateDictData = (data: GetDictDataInfoModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateDictData, data })
}

// 删除字典类型
export const delDictData = (data: number[]) => {
  return defHttp.delete({ url: Api.DelDictData, data })
}
