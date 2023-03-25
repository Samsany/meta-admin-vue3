import { BasicFetchResult, BasicPageParams } from '../../model/baseModel'

export type AttachmentGroupParamsVO = BasicPageParams & {
  // 分组类型
  type: number
  // 关键字
  keyword?: string
}

export interface AttachmentGroupModel {
  id?: number
  name: string
  icon?: string
  type: number
  sort?: number
}

export interface AttachmentGroupInfoModel {
  id: number
  name: string
  icon?: string
  type: number
  sort?: number
}

// 根据对象生成响应模型
export type GetAttachmentGroupListResultModel = AttachmentGroupModel[]

export interface AttachmentModel {
  id?: number
  storageId?: number
  attachmentGroupId?: number
  name?: string
  size?: number
  url?: string
  thumbUrl?: string
  fileName?: string
  fileType?: number
  tenantId?: number
  isRecycle: number
  createBy?: string
  updateBy?: string
  createTime?: string
  updateTime?: string
  remark?: string
}

export type AttachmentParamsVO = BasicPageParams & {
  // 文件类型
  fileType: number
  // 分组类型
  attachmentGroupId: number
  // 关键字
  keyword?: string
}

// 根据对象生成响应模型
export type GetAttachmentListResultModel = BasicFetchResult<AttachmentModel>
