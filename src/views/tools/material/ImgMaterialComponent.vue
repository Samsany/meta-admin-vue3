<template>
  <div class="px-5">
    <div class="pb-4 bg-white">
      <div class="flex justify-between space-x-2">
        <div class="flex justify-start space-x-2">
          <a-button type="primary" @click="() => openMaterialModal(true)"> 弹窗显示 </a-button>
          <BasicUpload
            :maxSize="20"
            :maxNumber="50"
            :hide-preview="true"
            @change="handleUploadChange"
            :api="uploadAttachment"
            :upload-params="materialGroup"
            :accept="['image/*']"
            btn-text="上传文件"
            ok-text="确定"
            btn-pre-icon="ant-design:upload-outlined"
          />
        </div>
        <div class="flex justify-end items-center space-x-2">
          <!--              <slot name="rightHeader"></slot>-->
          <a-input-search
            v-model:value="searchParams.keyword"
            placeholder="请输入名称搜索"
            style="width: 200px"
            @search="onSearch"
            allow-clear
          />
          <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @change="onCheckAllChange">
            全选
          </a-checkbox>
          <a-button
            type="primary"
            color="error"
            preIcon="ant-design:delete-outlined"
            @click="handleDelete"
            :disabled="!state.multiple"
          >
            删除
          </a-button>
          <Tooltip @click="reset">
            <!--            <template>刷新</template>-->
            <a-button preIcon="ant-design:redo-outlined" />
          </Tooltip>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <a-checkbox-group v-model:value="state.checkedList" style="width: 100%" @change="handleCheckboxGroupChange">
        <List
          :grid="{ gutter: [48, 24], xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxxl: 8 }"
          :data-source="data"
          :pagination="paginationProp"
        >
          <template #header></template>
          <template #renderItem="{ item }">
            <ListItem>
              <Card hoverable>
                <template #title>
                  <tooltip :title="item.name" placement="topLeft"> No.{{ item.id }} {{ item.name }} </tooltip>
                </template>
                <template #extra>
                  <a-checkbox :value="item.id" />
                </template>
                <template #cover>
                  <div style="width: 180px; display: flex; justify-content: center; align-items: center; padding: 10px">
                    <Image :src="item.url" :preview="true" style="height: 150px; width: 150px; object-fit: cover" />
                  </div>
                </template>
                <!--                <template #actions>-->
                <!--                  &lt;!&ndash;              <SettingOutlined key="setting" />&ndash;&gt;-->
                <!--                  <EyeOutlined key="preview" @click="handlePreview(item.url)" />-->
                <!--                  <DeleteOutlined key="preview" @click="handleDelete(item.id)" />-->
                <!--                </template>-->
              </Card>
            </ListItem>
          </template>
        </List>
      </a-checkbox-group>
    </div>

    <material-modal @register="registerMaterialModal" @change="handleMaterialChange" :multiple="false" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, unref, watch } from 'vue'
import { Card, Image, List, Tooltip } from 'ant-design-vue'
import { propTypes } from '/@/utils/propTypes'
// import { createImgPreview } from '/@/components/Preview'
import { AttachmentModel } from '/@/api/tools/model/materialModel'
import { delAttachment, getAttachmentList, uploadAttachment } from '/@/api/tools/material'
import { useMessage } from '/@/hooks/web/useMessage'
import { CheckBoxData } from './material.data'
import BasicUpload from '/@/components/Upload/src/BasicUpload.vue'
import MaterialModal from '/@/components/Meta/src/material/MaterialModal.vue'
import { useModal } from '/@/components/Modal'

const { createMessage, createConfirm } = useMessage()
const ListItem = List.Item
// 获取slider属性
// const sliderProp = computed(() => useSlider(4))

//暴露内部方法
// const emit = defineEmits(['getMethod', 'reload', 'delete'])

const [registerMaterialModal, { openModal: openMaterialModal }] = useModal()
const handleMaterialChange = () => {}

// 组件接收参数
const props = defineProps({
  // 请求API的参数
  materialGroup: propTypes.object
})
// 搜索条件
const searchParams = reactive({
  ...props.materialGroup
})

// 分页相关
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const paginationProp = ref({
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize,
  current: page,
  total,
  showTotal: total => `总 ${total} 条`,
  onChange: pageChange,
  onShowSizeChange: pageSizeChange
})
// 数据
const data = ref<AttachmentModel[]>([])
const state: CheckBoxData = reactive({
  multiple: false,
  indeterminate: true,
  checkAll: false,
  selection: [],
  checkedList: [],
  plainOptions: []
})

async function handleUploadChange() {
  await fetch()
}

// 监听checkBox
function handleCheckboxGroupChange(val) {
  state.indeterminate = !!val.length && val.length < state.plainOptions.length
  state.checkAll = val.length === state.plainOptions.length
  state.multiple = !val.length
}

// 监听参数变化
watch(
  () => props.materialGroup,
  async val => {
    // console.log('数据变化', val)
    Object.assign(searchParams, {
      ...val,
      keyword: searchParams.keyword
    })
    await fetch()
  },
  {
    deep: true
  }
)

// 自动请求并暴露内部方法
onMounted(() => {
  fetch()
  // emit('getMethod', fetch)
  // emit('reload', reset)
})

const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked ? state.plainOptions : [],
    indeterminate: false,
    multiple: !!e.target.checked
  })
}

async function onSearch() {
  // console.log('点击搜索')
  await fetch()
}
async function reset() {
  state.checkedList = []
  data.value = []
  page.value = 1
  await fetch()
}
async function fetch(p = {}) {
  const res = await getAttachmentList({
    keyword: searchParams.keyword,
    fileType: searchParams.groupType,
    attachmentGroupId: searchParams.groupId,
    pageNum: page.value,
    pageSize: pageSize.value,
    ...p
  })
  data.value = res.list
  total.value = res.totalCount
  state.plainOptions = res.list.map(it => it.id)
}

function pageChange(p, pz) {
  page.value = p
  pageSize.value = pz
  fetch()
}
function pageSizeChange(_current, size) {
  pageSize.value = size
  fetch()
}
// async function handlePreview(url) {
//   createImgPreview({ imageList: [url], maskClosable: true, defaultWidth: 800 })
// }
async function handleDelete() {
  let selection = state.checkedList
  createConfirm({
    iconType: 'warning',
    title: '删除提示',
    content: `是否确认删除序号为【${selection}】的文件？`,
    onOk: async () => {
      await delAttachment(selection)
      createMessage.success('删除成功')
      const totalPage = Math.ceil((unref(total) - selection.length) / unref(pageSize))
      if (unref(page) > totalPage) {
        page.value = page.value - 1
      }
      await fetch()
    }
  })
}
</script>

<style lang="less" scoped>
:deep(.ant-list-header) {
  padding: 0;
}

:deep(.ant-spin-nested-loading) {
  padding-top: 24px;
}

:deep(.ant-card-head) {
  // height: 30px;
  min-height: 20px;
  font-size: 10px;
  width: 180px;
}

:deep(.ant-card-cover) {
  // height: 30px;
  width: 180px;
}

:deep(.ant-card-head-title) {
  padding: 5px 0;
}

:deep(.ant-card-extra) {
  padding: 5px 0;
}

:deep(.ant-card):hover {
  background-color: #e6f7ff !important;

  .ant-card-actions {
    background-color: #e6f7ff !important;
  }
}

:deep(.ant-card-bordered) {
  width: 180px;
  border: 1px solid #e0e0e0;
}
</style>
