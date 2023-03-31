import ImageMaterial from './components/ImageMaterial.vue'
import { FormSchema } from '/@/components/Form'
import { AttachmentModel } from '/@/api/tools/model/materialModel'

export const tabsTypeList = [
  {
    key: 1,
    name: '图片',
    component: ImageMaterial,
    show: true
  },
  {
    key: 2,
    name: '视频',
    component: 'VideoMaterial',
    show: false
  },
  {
    key: 3,
    name: '其它',
    component: 'OtherMaterial',
    show: false
  }
]

export enum MaterialTypeEnum {
  IMAGE = 'image',
  VIDEO = 'video',
  OTHER = 'other'
}

// 素材分组表单
export const groupFromSchema: FormSchema[] = [
  {
    field: 'id',
    label: '序号',
    component: 'Input',
    show: false
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input'
  },
  {
    field: 'bizPath',
    label: '路径',
    required: true,
    component: 'Input',
    helpMessage: '用于控制文件上传的业务路径'
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker'
  },
  {
    field: 'type',
    label: '分组类型',
    component: 'Input',
    show: false
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea'
  }
]

export interface CheckBoxData {
  multiple: boolean
  indeterminate: boolean
  checkAll: boolean
  selection: AttachmentModel[]
  checkedList: any[]
  plainOptions: any[]
}
