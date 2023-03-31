import { UploadApiResult } from './model/uploadModel'
import { defHttp } from '/@/utils/http/axios'
import { UploadFileParams } from '/#/axios'
import { useGlobSetting } from '/@/hooks/setting'

const { uploadUrl = '' } = useGlobSetting()
enum Api {
  UploadAttachment = '/meta-component/attachment/path/upload'
}

/**
 * @description: Upload interface
 */
export function uploadApi(params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl + Api.UploadAttachment,
      onUploadProgress
    },
    params
  )
}
