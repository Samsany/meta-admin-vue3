<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增字典项</a-button>
        <a-button type="danger" @click="handleClose">关闭</a-button>
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
    <DictDataModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup name="DictData">
import { onMounted, reactive, Ref, ref, unref } from 'vue'
import { BasicTable, TableAction, useTable } from '/@/components/Table'

import { useModal } from '/@/components/Modal'
import DictDataModal from './DictDataModal.vue'

import { columns, searchFormSchema } from './dictItem.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { delDictData, getDictDataInfo, getDictDataList, getDictList } from '/@/api/system/dict'
import { useRouter } from 'vue-router'
import { useGo } from '/@/hooks/web/usePage'
import { PageEnum } from '/@/enums/pageEnum'
import { useTabs } from '/@/hooks/web/useTabs'

const router = useRouter()
const go = useGo()
const { close } = useTabs(router)
const dictType: Ref<string | string[]> = ref(router.currentRoute.value.params.id || '')

onMounted(async () => {
  const dictList = await getDictList({ queryMode: 'list' })
  // console.log('请求数据', dictList)
  const { setFieldsValue, updateSchema } = getForm()
  await updateSchema({
    field: 'dictType',
    componentProps: {
      options: dictList
    }
  })
  await setFieldsValue({
    dictType: dictType
  })
})

const [registerModal, { openModal }] = useModal()
const [registerTable, { reload, getForm }] = useTable({
  title: '字典列表',
  api: getDictDataList,
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
  beforeFetch(info) {
    // console.log('请求前参数', info)
    // console.log('请求前参数', dictType.value)
    return {
      ...info,
      dictType: unref(dictType)
    }
  },
  async handleSearchInfoFn(info) {
    // info.dictType = 'sys_normal_disable 001'
    // console.log('处理查询参数', info)
    if (info.dictType) {
      dictType.value = info.dictType
    } else {
      await getRouterParams()
    }
    // return info
  },
  actionColumn: {
    width: 80,
    title: '操作',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
    fixed: undefined
  }
})

async function getRouterParams() {
  const { id } = router.currentRoute.value.params
  // console.log('重置参数', id)
  dictType.value = id
  const { setFieldsValue } = getForm()
  await setFieldsValue({
    dictType: dictType
  })
  // console.log(unref(dictType))
}

function handleCreate() {
  openModal(true, {
    dictType,
    isUpdate: false
  })
}

async function handleEdit(row: Recordable) {
  // 获取字典详情
  const record = reactive(await getDictDataInfo(row.id))
  openModal(true, {
    record,
    isUpdate: true
  })
}

async function handleDelete(record: Recordable) {
  // console.log(record)
  await delDictData(record.id)
  const { createMessage } = useMessage()
  createMessage.success(`删除成功`)
  handleSuccess()
}

function handleSuccess() {
  reload()
}

function handleClose() {
  close()
  go(PageEnum.DICT_PAGE)
}

function onFetchSuccess() {
  // 演示默认展开所有表项
  // nextTick(expandAll)
}
</script>
