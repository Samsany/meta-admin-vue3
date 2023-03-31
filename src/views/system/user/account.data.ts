import { getAllRoleList } from '/@/api/system/role'
import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Switch } from 'ant-design-vue'
import { useMessage } from '/@/hooks/web/useMessage'
import { setSysUserStatus } from '/@/api/system/account'

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   width: 120
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200
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

          setSysUserStatus({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus
              createMessage.success(`已成功修改用户状态`)
            })
            .catch(() => {
              createMessage.error('修改用户状态失败')
            })
            .finally(() => {
              record.pendingStatus = false
            })
        }
      })
    }
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptId',
    label: '所属部门',
    component: 'Input',
    colProps: { span: 8 },
    show: false
  },
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 }
  }
]

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'MImageUpload',
    componentProps: {
      maxCount: 1,
      group: 8,
      bizPath: 'avatar'
    }
  },
  {
    field: 'account',
    label: '账户',
    component: 'Input',
    helpMessage: ['用户登录账户不可重复'],
    dynamicDisabled: ({ values }) => {
      return !!values.id
    }
  },
  {
    field: 'account',
    label: '账户',
    component: 'Input',
    helpMessage: ['用户登录账户不可重复'],
    rules: [
      {
        required: true,
        message: '请输入账户'
      }
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist({ account: value })
      //         .then(() => resolve())
      //         .catch(err => {
      //           reject(err.message || '验证失败')
      //         })
      //     })
      //   }
      // }
    ]
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: ({ values }) => {
      return !values.id
    }
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'id',
      mode: 'multiple'
    },
    required: true
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id'
      },
      getPopupContainer: () => document.body
    },
    required: true
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea'
  }
]

export const passwordFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false
  },
  {
    field: 'passwordNew',
    label: '密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '密码'
    },
    rules: [
      {
        required: true,
        whitespace: true,
        message: '请输入密码！'
      },
      {
        pattern: new RegExp('[^\\u4e00-\\u9fa5]+'),
        type: 'string',
        message: '密码不能输入汉字！'
      },
      {
        min: 6,
        max: 18,
        message: '长度必需在6-18之间！'
      }
    ]
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('确认密码不能为空')
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!')
            }
            return Promise.resolve()
          }
        },
        {
          pattern: new RegExp('[^\\u4e00-\\u9fa5]+'),
          type: 'string',
          message: '密码不能输入汉字！'
        },
        {
          min: 6,
          max: 18,
          message: '长度必需在6-18之间！'
        }
      ]
    }
  }
]
