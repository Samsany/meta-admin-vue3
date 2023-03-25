<template>
  <div>
    <div style="display: flex; justify-content: center">
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAddGroup"> 新增分组</a-button>
    </div>
    <ul class="group-list ant-menu ant-menu-inline ant-menu-root ant-menu-light">
      <template v-for="item in groupSettingList" :key="item.id">
        <li
          class="ant-menu-item"
          :class="{ 'ant-menu-item-selected': activeKey === item.id }"
          style="padding-left: 24px; justify-content: space-between"
          @click="menuClick(item)"
        >
          <div class="group-info">
            <Icon v-if="item.icon" :size="14" icon="ant-design:user-outlined" class="anticon ant-menu-item-icon" />
            <span class="ant-menu-title-content"> {{ item.name }}</span>
          </div>
          <div class="group-actions" v-if="item.id !== 0">
            <Icon
              icon="ant-design:edit-outlined"
              class="anticon ant-menu-item-icon"
              :size="14"
              @click.stop="handleEditGroup(item.id)"
            />
            <Icon
              icon="ant-design:delete-outlined"
              class="anticon ant-menu-item-icon"
              :size="14"
              @click.stop="handleDeleteGroup(item)"
            />
          </div>
        </li>
      </template>
    </ul>

    <MaterialGroupModal @register="registerGroupModal" @success="handleGroupSuccess" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { AttachmentGroupModel, GetAttachmentGroupListResultModel } from '/@/api/tools/model/materialModel'
import { useModal } from '/@/components/Modal'
import { useMessage } from '/@/hooks/web/useMessage'
import { delAttachmentGroup, getAttachmentGroupInfo, getAttachmentGroupList } from '/@/api/tools/material'
import { propTypes } from '/@/utils/propTypes'
import MaterialGroupModal from '/@/components/Meta/src/material/components/MaterialGroupModal.vue'

const groupSettingList = ref<GetAttachmentGroupListResultModel>([])

const [registerGroupModal, { openModal }] = useModal()
const { createMessage, createConfirm } = useMessage()

const emit = defineEmits(['change'])

const props = defineProps({
  type: propTypes.number.def(1)
})

const activeKey = ref(0)

onMounted(async () => {
  await getGroupList()
})

async function getGroupList() {
  const data = await getAttachmentGroupList({ type: props.type })
  groupSettingList.value = data
}

function handleAddGroup() {
  openModal(true, {
    groupType: props.type,
    isUpdate: false
  })
}

async function handleEditGroup(id: number) {
  const record = reactive(await getAttachmentGroupInfo(id))
  record.type = props.type
  openModal(true, {
    record,
    isUpdate: true
  })
}

function handleDeleteGroup(row: AttachmentGroupModel) {
  createConfirm({
    iconType: 'warning',
    title: '删除提示',
    content: `是否确认删除【${row.name}】分组？`,
    onOk: async () => {
      await delAttachmentGroup(row.id)
      createMessage.success('删除成功')
      await handleGroupSuccess()
    }
  })
}

async function handleGroupSuccess() {
  // console.log('handleGroupSuccess')
  await getGroupList()
}

/**
 * 组件标题点击事件,解决第二次不加载数据
 * @param record
 */
function menuClick(record: any) {
  activeKey.value = record.id
  const value = {
    groupId: record.id,
    groupName: record.name,
    groupType: record.type
  }
  emit('change', value)
}
</script>

<style lang="less" scoped>
.group {
  padding: 24px 0 0 24px;
  width: 240px;
  border-right: 1px solid #e0e0e0e0;

  .group-list {
    padding-top: 10px;
    border: 0;

    .group-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.ant-tabs-tab-active {
  background-color: @item-active-bg;
}

.base-title {
  padding-left: 0;
}
</style>
