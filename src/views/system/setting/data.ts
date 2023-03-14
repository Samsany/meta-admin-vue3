// tab的list
import { FormSchema } from '/@/components/Form'
import { getOSSConfigByCode } from '/@/api/system/config'
import { removeHttp } from '/@/utils/common/compUtils'

// 基础设置 form
export const baseSettingSchemas: FormSchema[] = [
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 }
  }
]

// OSS设置 form
export const ossSettingSchemas: FormSchema[] = [
  {
    field: 'provider',
    component: 'DictSelectTag',
    label: '服务提供商',
    required: true,
    componentProps: ({ schema, formModel }) => {
      // console.log(formModel)
      return {
        dictCode: 'oss_provider',
        placeholder: '请选择服务提供商',
        onChange: async (_e, v) => {
          if (v) {
            // handleProviderChange()
            const data = await getOSSConfigByCode({
              configCode: v
            })
            console.log(schema, formModel)
            data.customDomain = data.customDomain && removeHttp(data.customDomain)
            formModel.accessKey = data.accessKey
            formModel.appId = data.appId
            formModel.bucketName = data.bucketName
            formModel.customDomain = data.customDomain
            formModel.endpoint = data.endpoint
            formModel.pathStyleAccess = data.pathStyleAccess
            formModel.provider = data.provider
            formModel.region = data.region
            formModel.secretKey = data.secretKey
          }
        }
      }
    },
    colProps: { span: 24 }
  },
  {
    field: 'endpoint',
    component: 'Input',
    label: '存储服务地址',
    required: true,
    colProps: { span: 24 }
  },
  {
    field: 'customDomain',
    component: 'Input',
    label: '自定义域名',
    required: true,
    slot: 'endpointSlot',
    colProps: { span: 24 }
  },
  {
    field: 'accessKey',
    component: 'Input',
    label: 'accessKey',
    required: true,
    colProps: { span: 24 }
  },
  {
    field: 'secretKey',
    component: 'InputPassword',
    label: 'secretKey',
    required: true,
    colProps: { span: 24 }
  },
  {
    field: 'bucketName',
    component: 'Input',
    label: 'bucket',
    required: true,
    colProps: { span: 24 }
  }
]
