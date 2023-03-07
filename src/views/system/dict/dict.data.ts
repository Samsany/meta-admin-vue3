import { BasicColumn, FormSchema } from '/@/components/Table'
import { useGo } from '/@/hooks/web/usePage'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { PageEnum } from '/@/enums/pageEnum'

// 表格
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'id',
    width: 80,
    align: 'left'
  },
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 200,
    align: 'left',
    ellipsis: true
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    width: 200,
    ellipsis: true,
    align: 'left',
    customRender: ({ record }) => {
      const go = useGo()
      return h(
        'a',
        {
          onClick: () => {
            go(PageEnum.DICT_DATA_PAGE + `/${record.dictType}`)
          }
        },
        record.dictType
      )
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
    dataIndex: 'remark',
    width: 200
  }
]

// 搜索表单
export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    field: 'dictType',
    label: '字典类型',
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
    required: true
  },
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    required: true
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
    },
    required: true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea'
  }
]
