import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'

// 表格
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 80,
    align: 'left'
  },
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    width: 160,
    align: 'left'
  },
  {
    title: '字典键值',
    dataIndex: 'dictValue',
    width: 160,
    align: 'left'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 160,
    align: 'left'
  },
  {
    title: '是否默认',
    dataIndex: 'isDefault',
    width: 80,
    customRender: ({ record }) => {
      const status = record.isDefault
      const enable = ~~status === 1
      const color = enable ? 'blue' : 'red'
      const text = enable ? '是' : '否'
      return h(Tag, { color: color }, () => text)
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status
      const enable = ~~status === 0
      const color = enable ? 'green' : 'red'
      const text = enable ? '启用' : '停用'
      return h(Tag, { color: color }, () => text)
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]

// 搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictType',
    label: '字典名称',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      allowClear: false,
      fieldNames: {
        label: 'dictName',
        key: 'id',
        value: 'dictType'
      },
      getPopupContainer: () => document.body
    }
  },
  {
    field: 'dictLabel',
    label: '字典标签',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 }
      ]
    },
    colProps: { span: 8 }
  }
]

// 新增/编辑表单
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '序号',
    component: 'Input',
    show: false
  },
  {
    field: 'dictType',
    label: '字典类型',
    component: 'Input',
    required: true,
    dynamicDisabled: true
  },
  {
    field: 'dictLabel',
    label: '字典名称',
    component: 'Input',
    required: true
  },
  {
    field: 'dictValue',
    label: '字典键值',
    component: 'Input',
    required: true
  },
  {
    field: 'cssClass',
    label: '样式属性',
    component: 'Input'
  },
  {
    field: 'listClass',
    label: '回显样式',
    component: 'Select',
    defaultValue: 'primary',
    componentProps: {
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' }
      ]
    }
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0
  },
  {
    field: 'isDefault',
    label: '默认',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
      ]
    }
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 }
      ]
    }
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea'
  }
]
