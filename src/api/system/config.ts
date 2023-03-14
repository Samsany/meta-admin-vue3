import { ErrorMessageMode } from '/#/axios'
import { defHttp } from '/@/utils/http/axios'
import { GetOssConfigInfoModel, GetSysConfigListResultModel, SysConfigParamsVO } from '/@/api/system/model/configModel'

enum Api {
  GetDefaultSysConfigList = '/meta-component/system/config/default-list',
  GetSystemConfigList = '/meta-component/system/config/list',
  GetOSSDefaultConfig = '/meta-component/oss/config/default-oss',
  GetOSSConfigByCode = '/meta-component/oss/config/get-config-by-code',
  SaveOSSConfig = '/meta-component/oss/config/save-config-oss'
}

/**
 * @description: 获取系统默认配置列表
 */
export const getDefaultSysConfigList = (mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetSysConfigListResultModel>({ url: Api.GetDefaultSysConfigList }, { errorMessageMode: mode })
}

/**
 * @description: 获取系统配置列表
 */
export const getSystemConfigList = (params?: SysConfigParamsVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetSysConfigListResultModel>(
    { url: Api.GetSystemConfigList, params },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * @description: 获取OSS默认配置
 */
export const getOSSDefaultConfig = (mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetOssConfigInfoModel>(
    { url: Api.GetOSSDefaultConfig },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * @description: 查询OSS配置
 */
export const getOSSConfigByCode = (params?: SysConfigParamsVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetOssConfigInfoModel>({ url: Api.GetOSSConfigByCode, params }, { errorMessageMode: mode })
}

/**
 * @description: 提交OSS默认配置
 */
export const saveOSSConfig = (data: GetOssConfigInfoModel, mode: ErrorMessageMode = 'message') => {
  return defHttp.post(
    { url: Api.SaveOSSConfig, data },
    {
      errorMessageMode: mode
    }
  )
}
