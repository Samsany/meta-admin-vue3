// tab的list
import { FormSchema } from '/@/components/Form'

export declare type TabsSettingType = 'image' | 'video' | 'others'

// tab的list
export const settingList = [
  {
    key: 1,
    name: '图片',
    show: true
  },
  {
    key: 2,
    name: '视频',
    show: false
  },
  {
    key: 3,
    name: '其它',
    show: false
  }
]

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
