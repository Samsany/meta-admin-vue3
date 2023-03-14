import { VxeFormItemProps, VxeGridPropTypes } from 'vxe-table'
import { FormSchema } from '/@/components/Form'
import { h } from 'vue'
import { Switch } from 'ant-design-vue'
import { useMessage } from '/@/hooks/web/useMessage'
import { setOauthClientStatus } from '/@/api/system/oauthClient'

// 表格
export const columns: VxeGridPropTypes.Columns = [
  {
    title: '序号',
    type: 'seq',
    fixed: 'left',
    width: '50',
    align: 'center'
  },
  {
    title: '客户端名称',
    field: 'clientName'
  },
  {
    title: '客户端ID',
    field: 'clientId'
  },
  {
    title: '客户端密匙',
    field: 'clientSecret'
  },
  {
    title: '授权范围',
    field: 'scope'
  },
  {
    title: '令牌过期秒数',
    field: 'accessTokenValidity'
  },
  {
    title: '刷新令牌过期秒数',
    field: 'refreshTokenValidity'
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: ({ row }) => {
        if (!Reflect.has(row, 'pendingStatus')) {
          row.pendingStatus = false
        }
        return h(Switch, {
          checked: row.status === 0,
          checkedChildren: '已启用',
          unCheckedChildren: '已禁用',
          loading: row.pendingStatus,
          onChange(checked: boolean) {
            row.pendingStatus = true
            const newStatus = checked ? 0 : 1
            const { createMessage } = useMessage()

            setOauthClientStatus({ id: row.id, status: newStatus })
              .then(() => {
                row.status = newStatus
                createMessage.success(`已成功修改客户端状态`)
              })
              .catch(() => {
                createMessage.error('修改客户端状态失败')
              })
              .finally(() => {
                row.pendingStatus = false
              })
          }
        })
      }
      // default: ({ row }) => {
      //   // console.log(row)
      //   // const status = row.status
      //   // const enable = ~~status === 0
      //   // const color = enable ? '#2db7f5' : '#f50'
      //   // const text = enable ? '启用' : '停用'
      //   // return render.renderDict(row.status, 'sys_normal_disable')
      //   return render.renderDictNative(row.status, 'sys_normal_disable', true)
      //   // return h(Tag, { color: color }, () => text)
      // }
    }
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180
  },
  {
    width: 160,
    title: '操作',
    align: 'center',
    slots: { default: 'action' },
    fixed: 'right'
  }
]

// 搜索表单
export const searchFormSchema: VxeFormItemProps[] = [
  {
    field: 'clientName',
    title: '客户端名称',
    itemRender: {
      name: 'AInput'
    },
    span: 6
  },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' }
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } }
      ]
    }
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
    label: '客户端名称',
    field: 'clientName',
    component: 'Input',
    required: true,
    colProps: {
      span: 12
    }
  },
  {
    label: '授权范围',
    field: 'scope',
    component: 'Input',
    defaultValue: 'all',
    required: true,
    colProps: {
      span: 12
    }
  },
  {
    label: '客户端ID',
    field: 'clientId',
    component: 'Input',
    required: true,
    colProps: {
      span: 12
    }
  },
  {
    label: '客户端密匙',
    field: 'clientSecret',
    component: 'Input',
    required: true,
    colProps: {
      span: 12
    }
  },
  {
    label: '令牌过期秒数',
    field: 'accessTokenValidity',
    component: 'InputNumber',
    required: true
    // slot: 'accessTokenValidityInput'
  },
  {
    label: '刷新令牌过期秒数',
    field: 'refreshTokenValidity',
    component: 'InputNumber',
    required: true
  },
  {
    label: '授权类型',
    field: 'authorizedGrantTypes',
    component: 'DictSelectTag',
    componentProps: {
      mode: 'multiple',
      dictCode: 'client_authorized_grant_types',
      placeholder: '请选择授权类型'
    },
    required: true
  },
  {
    label: '回调地址',
    field: 'webServerRedirectUri',
    component: 'Input',
    required: true
  },
  {
    label: '资源集合',
    field: 'resourceIds',
    component: 'Input',
    colProps: {
      span: 12
    }
  },
  {
    label: '用户权限',
    field: 'authorities',
    component: 'Input',
    colProps: {
      span: 12
    }
  },
  {
    label: '附加信息',
    field: 'additionalInformation',
    component: 'Input',
    colProps: {
      span: 12
    }
  },
  {
    label: '自动授权',
    field: 'autoApprove',
    component: 'Input',
    colProps: {
      span: 12
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
  }
]
