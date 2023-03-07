<template>
  <div>
    <PageWrapper content-full-height fixed-height>
      <VxeBasicTable ref="tableRef" v-bind="gridOptions">
        <template #action="{ row }">
          <TableAction outside :actions="createActions(row)" />
        </template>
      </VxeBasicTable>
    </PageWrapper>
    <OauthClientModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="Dict">
import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '/@/components/VxeTable'
import { ActionItem, TableAction } from '/@/components/Table'
import { reactive, ref } from 'vue'
import { useMessage } from '/@/hooks/web/useMessage'
import { columns, searchFormSchema } from './oauthClient.data'
import { delOauthClient, getOauthClientInfo, getOauthClientList } from '/@/api/system/oauthClient'
import PageWrapper from '/@/components/Page/src/PageWrapper.vue'
import { VXETable } from 'vxe-table'
import OauthClientModal from './OauthClientModal.vue'
import { useModal } from '/@/components/Modal'

const { createMessage } = useMessage()
const tableRef = ref<VxeGridInstance>()
const gridOptions = reactive<BasicTableProps>({
  id: 'VxeTable',
  showHeaderOverflow: true,
  showOverflow: true,
  keepSource: true,
  autoResize: true,
  rowConfig: {
    keyField: 'id',
    isHover: true
  },
  columnConfig: {
    resizable: true
  },
  editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
  columns,
  toolbarConfig: {
    refresh: true,
    export: true,
    zoom: true,
    custom: true,
    buttons: [
      {
        content: '新增客户端',
        buttonRender: {
          name: 'AButton',
          props: {
            type: 'primary'
          },
          events: {
            click: () => {
              openModal(true, {
                isUpdate: false
              })
            }
          }
        }
      }
    ]
  },
  formConfig: {
    enabled: true,
    items: searchFormSchema
  },
  height: 'auto',
  proxyConfig: {
    form: true,
    props: {
      result: 'list',
      total: 'totalCount'
    },
    ajax: {
      query: async ({ page, form }) => {
        // console.log('请求的数据', form)
        return getOauthClientList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...form
        })
      },
      // 查询所有
      queryAll: async ({ form }) => {
        return await getOauthClientList(form)
      }
    }
  }
})

const [registerModal, { openModal }] = useModal()

// 操作按钮（权限控制）
const createActions = record => {
  const actions: ActionItem[] = [
    {
      label: '编辑',
      onClick: async () => {
        const row = reactive(await getOauthClientInfo(record.id))
        openModal(true, {
          row,
          isUpdate: true
        })
      }
    },
    {
      label: '删除',
      color: 'error',
      onClick: async () => {
        const type = await VXETable.modal.confirm('您确定要删除该数据?')
        const $grid = tableRef.value
        if ($grid) {
          if (type === 'confirm') {
            await delOauthClient(record.id)
            // await $grid.remove(row)
            createMessage.success('删除成功')
            handleSuccess()
          }
        }
      }
    }
  ]
  return actions
}
function handleSuccess() {
  const $grid = tableRef.value
  $grid?.commitProxy('query')
}
</script>
