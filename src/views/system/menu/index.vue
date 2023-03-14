<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
        <a-button type="default" @click="expandAll">展开全部</a-button>
        <a-button type="default" @click="collapseAll">折叠全部</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '新增下级',
                icon: 'clarity:note-edit-line',
                onClick: handleSubAdd.bind(null, record),
                ifShow: !isButton(record.type)
              },
              {
                label: '编辑',
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record)
              },
              {
                label: '删除',
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record)
                }
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script setup lang="ts" name="MenuManagement">
import { nextTick, reactive } from 'vue'

import { BasicTable, TableAction, useTable } from '/@/components/Table'
import { delMenu, getMenuInfo, getTreeMenuList } from '/@/api/system/menu'

import { useDrawer } from '/@/components/Drawer'
import MenuDrawer from './MenuDrawer.vue'

import { columns, isButton, searchFormSchema } from './menu.data'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage } = useMessage()

const [registerDrawer, { openDrawer }] = useDrawer()
const [registerTable, { reload, expandAll, collapseAll }] = useTable({
  title: '菜单列表',
  api: getTreeMenuList,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema
  },
  isTreeTable: true,
  pagination: false,
  striped: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  showIndexColumn: false,
  canResize: false,
  actionColumn: {
    width: 250,
    title: '操作',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
    fixed: undefined
  }
})

function handleCreate() {
  openDrawer(true, {
    isUpdate: false
  })
}

async function handleSubAdd(row: Recordable) {
  const record = {
    parentId: row.id
  }
  openDrawer(true, {
    record,
    isAddSub: true,
    isUpdate: false
  })
}

async function handleEdit(row: Recordable) {
  // 获取菜单详情
  const record = reactive(await getMenuInfo({ id: row.id }))

  openDrawer(true, {
    record,
    isUpdate: true
  })
}

async function handleDelete(record: Recordable) {
  // console.log(record)
  await delMenu([record.id])
  createMessage.success(`删除成功`)
  handleSuccess()
}

function handleSuccess() {
  reload()
}

function onFetchSuccess() {
  // 演示默认展开所有表项
  nextTick(expandAll)
}
</script>
