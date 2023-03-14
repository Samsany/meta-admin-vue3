import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Switch } from 'ant-design-vue'
import { setRoleStatus } from '/@/api/system/role'
import { useMessage } from '/@/hooks/web/useMessage'

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200
  },
  {
    title: '角色值',
    dataIndex: 'roleCode',
    width: 180
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false
      }
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true
          const newStatus = checked ? 0 : 1
          const { createMessage } = useMessage()

          setRoleStatus({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus
              createMessage.success(`已成功修改角色状态`)
            })
            .catch(() => {
              createMessage.error('修改角色状态失败')
            })
            .finally(() => {
              record.pendingStatus = false
            })
        }
      })
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    field: 'status',
    label: '状态',
    component: 'DictSelectTag',
    componentProps: {
      dictCode: 'sys_normal_disable',
      placeholder: '请选择状态',
      stringToNumber: true
    },
    colProps: { span: 8 }
  }
]

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '序号',
    component: 'Input',
    show: false
  },
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input'
  },
  {
    field: 'roleCode',
    label: '角色值',
    required: true,
    component: 'Input'
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: 0
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
  },
  {
    label: '',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input'
  }
]
