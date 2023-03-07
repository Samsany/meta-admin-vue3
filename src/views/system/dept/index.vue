<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
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
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Dept">
import { nextTick, reactive } from 'vue'
import { BasicTable, TableAction, useTable } from '/@/components/Table'
import { delDept, getDeptInfo, getDeptList } from '/@/api/system/dept'

import { useModal } from '/@/components/Modal'
import DeptModal from './DeptModal.vue'

import { columns, searchFormSchema } from './dept.data'
import { useMessage } from '/@/hooks/web/useMessage'

const [registerModal, { openModal }] = useModal()
const [registerTable, { reload, expandAll, collapseAll }] = useTable({
  title: '部门列表',
  api: getDeptList,
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
  pagination: false,
  striped: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: false,
  showIndexColumn: false,
  canResize: false,
  beforeFetch(info) {
    // console.log(info)
    return {
      ...info,
      queryMode: 'tree'
    }
  },
  // handleSearchInfoFn(info) {
  //   console.log('handleSearchInfoFn', info)
  // },
  actionColumn: {
    width: 80,
    title: '操作',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
    fixed: undefined
  }
})

function handleCreate() {
  openModal(true, {
    isUpdate: false
  })
}

async function handleEdit(row: Recordable) {
  // 获取部门详情
  const record = reactive(await getDeptInfo(row.id))
  openModal(true, {
    record,
    isUpdate: true
  })
}

async function handleDelete(record: Recordable) {
  // console.log(record)
  await delDept(record.id)
  const { createMessage } = useMessage()
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
