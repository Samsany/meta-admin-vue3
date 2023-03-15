// tab的list
import { FormSchema } from '/@/components/Form'

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
    slot: 'providerSlot',
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
