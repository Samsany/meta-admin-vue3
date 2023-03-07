import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel'

// 定义查询参数
export type OauthClientVO = BasicPageParams & {
  queryMode?: string
  clientName?: string
  status?: number
}

export interface GetOauthClientInfoModel {
  id?: number
  clientId: string
  clientName: string
  status?: number
  resourceIds?: number
  clientSecret: string
  scope: string
  authorizedGrantTypes: string[]
  webServerRedirectUri: string
  authorities?: string
  accessTokenValidity: number
  refreshTokenValidity: number
  additionalInformation?: string
  autoApprove?: string
  createTime?: string
}

// 根据对象生成响应模型
export type OauthClientDTO = BasicFetchResult<GetOauthClientInfoModel>
