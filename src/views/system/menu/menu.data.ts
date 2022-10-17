import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  // {
  //   title: '权限标识',
  //   dataIndex: 'permission',
  //   width: 180,
  // },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const isDir = (type: number) => type === 0;
export const isMenu = (type: number) => type === 1;
export const isExt = (type: number) => type === 2;
export const isIFrame = (type: number) => type === 1;

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
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
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '序号',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '外链', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    defaultValue: 0,
  },
  {
    field: 'name',
    label: '路由名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    helpMessage(renderCallbackParams) {
      const { type, iframe } = renderCallbackParams.values;
      if (isDir(type)) {
        return '访问的路由地址，如：`/user`';
      }
      if (isExt(type) && isIFrame(iframe)) {
        return '访问的路由地址，地址需以`http(s)://`开头';
      }
      return '访问的路由地址，如：`user`';
    },
    component: 'Input',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
  },
  {
    field: 'iframeSrc',
    label: '外链地址',
    helpMessage: '访问的外链，地址需以`http(s)://`开头',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isExt(values.type) && isIFrame(values.iframe),
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: 0,
  },
  {
    field: 'component',
    label: '组件路径',
    helpMessage: '访问的组件路径，例如：`system/user/index`',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'query',
    label: '路由参数',
    helpMessage: '访问路由的默认传递参数，如：`{"id": 1, "name": "dries"}`',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  // {
  //   field: 'permission',
  //   label: '权限标识',
  //   component: 'Input',
  //   ifShow: ({ values }) => !isDir(values.type),
  // },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'keepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
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
        { label: '否', value: 1 },
      ],
    },
  },
  {
    field: 'iframe',
    label: '是否内嵌',
    component: 'RadioButtonGroup',
    helpMessage: '选择`是`, 路由则内嵌访问',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
    ifShow: ({ values }) => isExt(values.type),
  },
];
