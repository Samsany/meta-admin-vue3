import type { App } from 'vue'
import { Icon } from './Icon'
import { Button } from './Button'
import VXETable from 'vxe-table'

import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button as AntButton,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Modal,
  PageHeader,
  Popconfirm,
  Popover,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Upload
} from 'ant-design-vue'

const compList = [AntButton.Group, Icon]

export function registerGlobComp(app: App) {
  compList.forEach(comp => {
    app.component(comp.name || comp.displayName, comp)
  })

  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(VXETable)
    .use(Select)
    .use(Alert)
    .use(Button)
    .use(Breadcrumb)
    .use(Checkbox)
    .use(DatePicker)
    .use(Radio)
    .use(Switch)
    .use(Card)
    .use(List)
    .use(Descriptions)
    .use(Tree)
    .use(TreeSelect)
    .use(Table)
    .use(Divider)
    .use(Modal)
    .use(Drawer)
    .use(Dropdown)
    .use(Tag)
    .use(Tooltip)
    .use(Badge)
    .use(Popover)
    .use(Upload)
    .use(Transfer)
    .use(Steps)
    .use(PageHeader)
    .use(Result)
    .use(Empty)
    .use(Avatar)
    .use(Menu)
    .use(Tabs)
    .use(Form)
    .use(Input)
    .use(Row)
    .use(Col)
    .use(Spin)
    .use(Space)
    .use(Layout)
    .use(Collapse)
    .use(Slider)
    .use(InputNumber)
    .use(Carousel)
    .use(Popconfirm)
    .use(Skeleton)
    .use(Cascader)
    .use(Rate)
}
