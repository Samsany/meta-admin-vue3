<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelectDept" @register="registerDeptTree" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:lock-line',
                tooltip: '修改密码',
                onClick: handleSetPassword.bind(null, record),
                auth: 'sys:user:edit'
              },
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record)
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
                auth: 'sys:user:edit'
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <PasswordModal @register="registerPasswordModal" @success="handlePasswordSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup name="AccountManagement">
import { reactive, ref } from 'vue'

import { BasicTable, TableAction, useTable } from '/@/components/Table'
import { PageWrapper } from '/@/components/Page'
import DeptTree from './DeptTree.vue'

import { useModal } from '/@/components/Modal'
import AccountModal from './AccountModal.vue'
import PasswordModal from './PasswordModal.vue'

import { columns, searchFormSchema } from './account.data'
import { useGo } from '/@/hooks/web/usePage'
import { useMessage } from '/@/hooks/web/useMessage'
import { delSysUser, getSysUserInfo, getSysUserList } from '/@/api/system/account'
import { TreeItem } from '/@/components/Tree'

const go = useGo()
const { createMessage } = useMessage()

const deptTreeData = ref<TreeItem[]>([])

const [registerModal, { openModal }] = useModal()
const [registerPasswordModal, { openModal: openPasswordModal }] = useModal()
const searchInfo = reactive<Recordable>({})
const [registerTable, { reload }] = useTable({
  title: '账号列表',
  api: getSysUserList,
  fetchSetting: {
    pageField: 'pageNum',
    sizeField: 'pageSize',
    listField: 'list',
    totalField: 'totalCount'
  },
  rowKey: 'id',
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true
  },
  useSearchForm: true,
  showTableSetting: true,
  striped: false,
  bordered: false,
  beforeFetch(info) {
    // console.log('请求前', info)
    return info
  },
  handleSearchInfoFn(info) {
    console.log('handleSearchInfoFn', info)
    return info
  },
  actionColumn: {
    width: 200,
    title: '操作',
    dataIndex: 'action'
    // slots: { customRender: 'action' },
  }
})

function handleCreate() {
  openModal(true, {
    deptId: searchInfo.deptId,
    deptTreeData,
    isUpdate: false
  })
}

async function handleEdit(row: Recordable) {
  const record = await getSysUserInfo({ id: row.id })
  console.log(record)
  openModal(true, {
    record,
    deptTreeData,
    isUpdate: true
  })
}

function handleSetPassword(record: Recordable) {
  openPasswordModal(true, {
    record,
    isUpdate: true
  })
}

async function handleDelete(record: Recordable) {
  // console.log(record)
  await delSysUser([record.id])
  createMessage.success()
  handleSuccess({})
}

function handleSuccess({ isUpdate = false, _values = {} }) {
  if (isUpdate) {
    // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    // const result = updateTableDataRecord(values.id, values)
    // console.log()
  } else {
    reload()
  }
}

function registerDeptTree(data) {
  // console.log(data)
  deptTreeData.value = data
}

function handlePasswordSuccess() {
  reload()
}

function handleSelectDept(deptId = '') {
  searchInfo.deptId = deptId
  reload()
}

function handleView(record: Recordable) {
  go('/system/account_detail/' + record.id)
}
</script>
