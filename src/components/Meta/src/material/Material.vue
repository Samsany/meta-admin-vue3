<template>
  <div ref="wrapperRef" :class="prefixCls">
    <a-tabs
      size="large"
      tab-position="top"
      :tabBarStyle="{ width: '100%' }"
      @tab-click="componentClick"
      centered
      animated
    >
      <template v-for="item in tabsTypeList" :key="item.key">
        <a-tab-pane :tab="item.name" v-if="item.show">
          <component
            :is="item.component"
            :type="activeKey"
            v-if="activeKey === item.key"
            :multiple="multiple"
            @select-change="handleSelectMaterialChange"
          />
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { tabsTypeList } from './material.data'
import { ref } from 'vue'
import { useDesign } from '/@/hooks/web/useDesign'
import { propTypes } from '/@/utils/propTypes'

const emit = defineEmits(['selectChange'])
const activeKey = ref<number>(1)
defineProps({
  multiple: propTypes.bool.def(true)
})

/**
 * 组件标题点击事件,解决第二次不加载数据
 * @param key
 */
function componentClick(key) {
  activeKey.value = key
}

function handleSelectMaterialChange(value) {
  // console.log('Material========>', value)
  emit('selectChange', value)
}

const { prefixCls } = useDesign('material-setting')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-material-setting';
.@{prefix-cls} {
  width: 100%;
  background-color: @component-background;

  .base-title {
    padding-left: 0;
  }

  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }

  :deep(.ant-tabs-nav) {
    margin: 0 !important;
  }
}
</style>
