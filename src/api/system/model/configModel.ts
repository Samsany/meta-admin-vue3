// 定义查询参数
import { BasicPageParams } from '/@/api/model/baseModel'
import { DefineComponent } from 'vue'

export type SysConfigParamsVO = BasicPageParams & {
  configCode?: string
  configName?: string
  configKey?: string
  queryMode?: string
}

export interface TabSettingInfoModel {
  key?: number
  name?: string
  component: DefineComponent
}

export interface SysConfigInfoModel {
  id?: number
  parentId?: number
  configName: string
  configCode: string
  configKey: string
  configValue: string
  configType?: number
  sort?: number
  tenantId?: number
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  remark?: string
}

// OSS配置
export interface GetOssConfigInfoModel {
  provider: string
  endpoint: string
  customDomain: string
  pathStyleAccess: boolean
  appId?: null
  region: null
  accessKey: string
  secretKey: string
  bucketName: string
}

// 根据对象生成响应模型
export type GetSysConfigListResultModel = SysConfigInfoModel[]
