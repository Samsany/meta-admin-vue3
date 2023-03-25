<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <div class="material-container">
        <div class="group">
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
                  <Icon
                    v-if="item.icon"
                    :size="14"
                    icon="ant-design:user-outlined"
                    class="anticon ant-menu-item-icon"
                  />
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
        </div>
        <div class="material">
          <!--          图片类型-->
          <img-material-component :material-group="unref(activeItem)" />
        </div>
      </div>
      <!--      <div style="display: flex; justify-content: center; padding: 12px 0 5px">-->
      <!--        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAddGroup"> 新增分组</a-button>-->
      <!--      </div>-->
      <!--      <a-tabs tab-position="left" :tabBarStyle="tabBarStyle">-->
      <!--        <template v-for="item in groupSettingList" :key="item.id">-->
      <!--          <a-tab-pane>-->
      <!--            <template #tab>-->
      <!--              <span>-->
      <!--                <Icon :icon="item.icon" class="icon-font-color" />-->
      <!--                {{ item.name }}-->
      <!--              </span>-->
      <!--            </template>-->
      <!--            &lt;!&ndash;            <component :is="item.component" v-if="activeKey === item.key" />&ndash;&gt;-->
      <!--          </a-tab-pane>-->
      <!--        </template>-->
      <!--      </a-tabs>-->
    </div>
    <group-modal @register="registerGroupModal" @success="handleGroupSuccess" />
  </ScrollContainer>
</template>

<script lang="ts" setup name="MaterialGroupComponent">
import { ScrollContainer } from '/@/components/Container'
import { useDesign } from '/@/hooks/web/useDesign'
import { onMounted, reactive, ref, unref, watch } from 'vue'
import { propTypes } from '/@/utils/propTypes'
import { delAttachmentGroup, getAttachmentGroupInfo, getAttachmentGroupList } from '/@/api/tools/material'
import type { AttachmentGroupModel, GetAttachmentGroupListResultModel } from '/@/api/tools/model/materialModel'
import GroupModal from './components/GroupModal.vue'
import ImgMaterialComponent from './ImgMaterialComponent.vue'
import { useModal } from '/@/components/Modal'
import { useMessage } from '/@/hooks/web/useMessage'
import { Icon } from '/@/components/Icon'

const props = defineProps({
  type: propTypes.number
})

watch(
  () => props.type,
  val => {
    activeItem.groupType = val
  }
)

const activeKey = ref(0)
const activeItem = reactive({
  groupId: 0,
  groupName: '全部',
  groupType: props.type
})

const groupSettingList = ref<GetAttachmentGroupListResultModel>([])

const [registerGroupModal, { openModal }] = useModal()
const { createMessage, createConfirm } = useMessage()

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
  Object.assign(activeItem, {
    groupId: record.id,
    groupName: record.name,
    groupType: record.type
  })
}
// const tabBarStyle = ref({
//   width: 240,
//   marginBottom: 200
// })
const { prefixCls } = useDesign('material-setting')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-material-setting';
.@{prefix-cls} {
  // padding: 0 12px;
  background-color: @component-background;
  overflow-x: hidden;

  .material-container {
    min-height: 500px;
    display: flex;

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

    .material {
      display: flex;
      flex-direction: column;
      // margin-left: 24px;
      padding: 24px 0;
      flex: 1;
      width: 100%;
    }
  }

  .base-title {
    padding-left: 0;
  }

  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }

  //  //tabs弹窗左边样式
  //  :deep(.ant-tabs-nav) {
  //    background-color: #ffffff;
  //    height: 260px;
  //  }
  //  //tabs弹窗右边边样式
  //  :deep(.ant-tabs-content-holder) {
  //    position: relative;
  //    left: 12px;
  //    background: #ffffff;
  //    height: auto !important;
  //  }
  //}
  ////tab点击样式
  //:deep(.ant-tabs-tab-active) {
  //  border-radius: 0 20px 20px 0;
  //  background-color: #1294f7 !important;
  //  color: #fff !important;
  //  .icon-font-color {
  //    color: #fff;
  //  }
  //}
  //:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  //  color: white !important;
  //}
  //:deep(.ant-tabs-ink-bar) {
  //  visibility: hidden;
  //}
  //:deep(.ant-tabs-nav-list) {
  //  padding-top: 14px;
  //  padding-right: 14px;
  //}
  //.icon-font-color {
  //  color: #9e9e9e;
  //}
}
</style>
