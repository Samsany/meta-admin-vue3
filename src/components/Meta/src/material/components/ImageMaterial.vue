<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <div class="material-container">
        <div class="group">
          <MaterialGroup @change="handleMaterialGroupChange" />
        </div>
        <div class="material">
          <ImageMaterialItem
            :params="unref(materialGroup)"
            v-bind="$attrs"
            :multiple="multiple"
            @select-change="handleSelectMaterialChange"
          />
        </div>
      </div>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup name="ImageMaterial">
import { reactive, unref } from 'vue'
import MaterialGroup from './MaterialGroup.vue'
import { useDesign } from '/@/hooks/web/useDesign'
import { ScrollContainer } from '/@/components/Container'
import ImageMaterialItem from './ImageMaterialItem.vue'
import { propTypes } from '/@/utils/propTypes'

const emit = defineEmits(['selectChange'])

const props = defineProps({
  type: propTypes.number,
  multiple: propTypes.bool
})
const materialGroup = reactive({
  groupId: 0,
  groupName: '',
  bizPath: '',
  groupType: props.type
})

function handleMaterialGroupChange(value) {
  Object.assign(materialGroup, {
    ...value
  })
}
function handleSelectMaterialChange(value) {
  emit('selectChange', value)
}
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
      padding: 12px 0 0 24px;
      width: 240px;
      border-right: 1px solid #e0e0e0e0;

      .group-list {
        padding-top: 12px;
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
      padding: 12px 0;
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
