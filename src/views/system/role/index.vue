<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
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
    <!--    <RoleModal @register="registerModal" @success="handleSuccess" />-->
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="RoleManagement">
import { BasicTable, TableAction, useTable } from '/@/components/Table'
import { getRoleInfo, getRoleList } from '/@/api/system/role'
import { columns, searchFormSchema } from './role.data'
import { useDrawer } from '/@/components/Drawer'
import RoleDrawer from '/@/views/system/role/RoleDrawer.vue'
import { reactive } from 'vue'

const [registerDrawer, { openDrawer }] = useDrawer()
// const [registerModal, { openModal }] = useModal()
const [registerTable, { reload }] = useTable({
  title: '角色列表',
  api: getRoleList,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema
  },
  fetchSetting: {
    // pageField: 'pageNum',
    // sizeField: 'pageSize',
    listField: 'list',
    totalField: 'totalCount'
  },
  striped: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: false,
  showIndexColumn: false,
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
  // openModal(true, {
  //   isUpdate: false
  // })
}

async function handleEdit(row: Recordable) {
  // 获取菜单详情
  const record = reactive(await getRoleInfo({ id: row.id }))
  openDrawer(true, {
    record,
    isUpdate: true
  })
  // openModal(true, {
  //   record,
  //   isUpdate: true
  // })
}

function handleDelete(record: Recordable) {
  console.log(record)
}

function handleSuccess() {
  reload()
}
</script>
