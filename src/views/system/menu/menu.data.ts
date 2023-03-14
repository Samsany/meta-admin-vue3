import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { Icon } from '/@/components/Icon'
import { isUrl } from '/@/utils/is'
import { render } from '/@/utils/common/renderUtils'

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 200,
    align: 'left'
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon })
    }
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    width: 180,
    customRender: ({ record }) => {
      return render.renderDictNative(record.type, 'menu_type', true)
    }
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 180
  },
  {
    title: '组件',
    dataIndex: 'component'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50
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
  }
]

// 是否目录
export const isDir = (type: number) => type === 0
// 是否根菜单
export const isRooTDir = (type: number) => type === 0
// 是否菜单
export const isMenu = (type: number) => type === 1
// 是否按钮
export const isButton = (type: number) => type === 2
// 是否内链
export const isIFrame = (type: number) => type === 2
// 是否外链
export const isExt = (type: number) => type === 3
export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 }
  },
  // {
  //   field: 'name',
  //   label: '路由名称',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' }
      ]
    },
    colProps: { span: 8 }
  }
]

export const formSchema: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础信息',
    colProps: { lg: 24, md: 24 }
  },
  {
    field: 'id',
    label: '序号',
    component: 'Input',
    show: false
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: '目录', value: 0 },
          { label: '菜单', value: 1 },
          { label: '按钮', value: 2 }
        ],
        onChange: (e, _v) => {
          switch (e) {
            case 0:
              formModel.openType = 1
              break
            case 1:
              formModel.openType = 1
              break
            case 2:
              formModel.openType = 0
              break
          }
        }
      }
    }
  },
  {
    field: 'openType',
    label: '打开方式',
    component: 'RadioButtonGroup',
    helpMessage: '按钮：无\n' + '菜单：组件、内链、外链',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        disabled: isButton(formModel.type),
        options: [
          { label: '无', value: 0, disabled: isDir(formModel.type) || isMenu(formModel.type) },
          { label: '组件', value: 1 },
          { label: '内链', value: 2, disabled: isRooTDir(formModel.parentId) && isDir(formModel.type) },
          { label: '外链', value: 3, disabled: isRooTDir(formModel.parentId) && isDir(formModel.type) }
        ],
        onChange: (e, v) => {
          if (v) {
            switch (e) {
              case 0:
                formModel.component = ''
                break
              case 1:
                formModel.component = 'Layout'
                formModel.target = ''
                break
              case 2:
                formModel.component = 'IFrame'
                formModel.path = ''
                break
              case 3:
                formModel.component = ''
                formModel.path = ''
                break
            }
          }
          // console.log('打开方式=====>', e, v)
        }
      }
    }
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id'
      },
      getPopupContainer: () => document.body
    },
    defaultValue: 0
  },
  {
    field: 'name',
    label: '组件名称',
    component: 'Input',
    helpMessage:
      '此处名称应和vue组件的name属性保持一致。\n' +
      '组件名称不能重复，主要用于路由缓存功能。\n' +
      '如果组件名称和vue组件的name属性不一致，则会导致路由缓存失效。\n' +
      '非必填，留空则会根据访问路径自动生成。',
    ifShow: ({ values }) => !isButton(values.type)
  },
  {
    field: 'component',
    label: '组件路径',
    helpMessage:
      '前端vue组件 views文件夹下路径，例：`system/menu/index`。\n' +
      '注：目录级填写：RouteView(不带面包屑)，PageView(带面包屑)，菜单级内链打开http链接填写：Iframe',
    component: 'Input',
    defaultValue: 'Layout',
    ifShow: ({ values }) => !isButton(values.type)
  },
  {
    field: 'path',
    label: '路由地址',
    helpMessage({ values }) {
      if (isDir(values.type)) {
        return '访问的路由地址，如：`/user`'
      } else {
        return '访问的路由地址，如：`user`'
      }
    },
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type) && !isExt(values.openType)
  },
  {
    field: 'target',
    label: '内外链地址',
    helpMessage: '访问的链接，地址需以`http(s)://`开头',
    component: 'Input',
    ifShow: ({ values }) => isIFrame(values.openType) || isExt(values.openType),
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          console.log(rule, value)
          if (!value) {
            return Promise.reject('值不能为空')
          }
          if (!isUrl(value)) {
            return Promise.reject('值必须为合法的链接')
          }
          return Promise.resolve()
        },
        trigger: 'blur'
      }
    ]
  },
  {
    field: 'query',
    label: '路由参数',
    helpMessage: '访问路由的默认传递参数，如：`{"id": 1, "name": "dries"}`',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.type)
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type)
  },
  {
    field: 'permission',
    label: '权限标识',
    helpMessage: '系统访问权限，例 `system:user:add`',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.type)
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: 0
  },
  {
    field: 'divider-route',
    component: 'Divider',
    label: '路由信息',
    colProps: { lg: 24, md: 24 }
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    helpMessage: '选择`禁用`路由将不会出现在侧边栏且不可以访问',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 }
      ]
    }
  },
  {
    field: 'hidden',
    label: '是否显示',
    component: 'RadioButtonGroup',
    helpMessage: '选择`否`路由将不会出现在侧边栏，但仍然可以访问',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 0 },
        { label: '否', value: 1 }
      ]
    },
    ifShow: ({ values }) => !isButton(values.type)
  },
  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    },
    ifShow: ({ values }) => isMenu(values.type)
  }
]
