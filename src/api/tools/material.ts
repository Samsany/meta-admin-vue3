import {
  AttachmentGroupModel,
  AttachmentGroupParamsVO,
  AttachmentModel,
  AttachmentParamsVO,
  GetAttachmentGroupListResultModel,
  GetAttachmentListResultModel
} from './model/materialModel'
import { ErrorMessageMode, UploadFileParams } from '/#/axios'
import { defHttp } from '/@/utils/http/axios'
import { UploadApiResult } from '/@/api/system/model/uploadModel'
import { useGlobSetting } from '/@/hooks/setting'

const { uploadUrl = '' } = useGlobSetting()
enum Api {
  GetAttachmentGroupList = '/meta-component/attachment-group/list',
  GetOrAddOrUpdateAttachmentGroup = '/meta-component/attachment-group',
  DelAttachmentGroup = '/meta-component/attachment-group/delete',
  GetAttachmentList = '/meta-component/attachment/list',
  GetOrDelAttachment = '/meta-component/attachment',
  UploadAttachment = '/meta-component/attachment/upload'
}

/**
 * 获取附件分组列表
 *
 * @description: Get user Role based on id
 */
export const getAttachmentGroupList = (params: AttachmentGroupParamsVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetAttachmentGroupListResultModel>(
    { url: Api.GetAttachmentGroupList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询附件分组详情
export const getAttachmentGroupInfo = (id: number) => {
  return defHttp.get<AttachmentGroupModel>({ url: Api.GetOrAddOrUpdateAttachmentGroup + `/${id}` })
}

// 新增附件分组
export const addAttachmentGroup = (data: AttachmentGroupModel) => {
  return defHttp.post({ url: Api.GetOrAddOrUpdateAttachmentGroup, data })
}

// 修改附件分组
export const updateAttachmentGroup = (data: AttachmentGroupModel) => {
  return defHttp.put({ url: Api.GetOrAddOrUpdateAttachmentGroup, data })
}

// 删除附件分组
export const delAttachmentGroup = (id: any) => {
  return defHttp.delete({ url: Api.DelAttachmentGroup + `/${id}` })
}

/**
 * 获取附件分组列表
 *
 * @description: Get user Role based on id
 */
export const getAttachmentList = (params: AttachmentParamsVO, mode: ErrorMessageMode = 'message') => {
  return defHttp.get<GetAttachmentListResultModel>(
    { url: Api.GetAttachmentList, params },
    {
      errorMessageMode: mode
    }
  )
}

// 查询附件详情
export const getAttachmentInfo = (id: number) => {
  return defHttp.get<AttachmentModel>({ url: Api.GetOrDelAttachment + `/${id}` })
}

// 上传附件
export function uploadAttachment(params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + Api.UploadAttachment,
      onUploadProgress
    },
    params
  )
}

// 修改附件
export const updateAttachment = (data: AttachmentModel) => {
  return defHttp.put({ url: Api.GetOrDelAttachment, data })
}

// 删除附件
export const delAttachment = (data: number[]) => {
  return defHttp.delete({ url: Api.GetOrDelAttachment, data })
}
