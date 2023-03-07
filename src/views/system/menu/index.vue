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
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record)
              },
              {
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

import { BasicTable, useTable, TableAction } from '/@/components/Table'
import { getTreeMenuList, getMenuInfo } from '/@/api/system/menu'

import { useDrawer } from '/@/components/Drawer'
import MenuDrawer from './MenuDrawer.vue'

import { columns, searchFormSchema } from './menu.data'

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
    width: 80,
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

async function handleEdit(row: Recordable) {
  // 获取菜单详情
  const record = reactive(await getMenuInfo({ id: row.id }))
  // console.log(record)

  openDrawer(true, {
    record,
    isUpdate: true
  })
}

function handleDelete(record: Recordable) {
  console.log(record)
}

function handleSuccess() {
  reload()
}

function onFetchSuccess() {
  // 演示默认展开所有表项
  nextTick(expandAll)
}
</script>
