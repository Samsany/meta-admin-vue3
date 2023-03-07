<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增字典</a-button>
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
    <DictModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Dict">
import { reactive } from 'vue'
import { BasicTable, TableAction, useTable } from '/@/components/Table'

import { useModal } from '/@/components/Modal'
import DictModal from './DictModal.vue'

import { columns, searchFormSchema } from './dict.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { delDict, getDictInfo, getDictList } from '/@/api/system/dict'

const [registerModal, { openModal }] = useModal()
const [registerTable, { reload }] = useTable({
  title: '字典列表',
  api: getDictList,
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
  pagination: true,
  striped: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: false,
  showIndexColumn: false,
  canResize: false,
  // beforeFetch(info) {
  //   console.log(info)
  //   return {
  //     ...info
  //   }
  // },
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
  // 获取字典详情
  const record = reactive(await getDictInfo(row.id))
  openModal(true, {
    record,
    isUpdate: true
  })
}

async function handleDelete(record: Recordable) {
  // console.log(record)
  await delDict(record.id)
  const { createMessage } = useMessage()
  createMessage.success(`删除成功`)
  handleSuccess()
}

function handleSuccess() {
  reload()
}

function onFetchSuccess() {
  // 演示默认展开所有表项
  // nextTick(expandAll)
}
</script>
