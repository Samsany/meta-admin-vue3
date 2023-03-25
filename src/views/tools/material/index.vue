<template>
  <PageWrapper>
    <div ref="wrapperRef" :class="prefixCls">
      <a-tabs
        :size="size"
        :tab-position="tabPosition"
        :tabBarStyle="tabBarStyle"
        @tab-click="componentClick"
        centered
        animated
      >
        <template v-for="item in settingList" :key="item.key">
          <a-tab-pane :tab="item.name" v-if="item.show">
            <GroupComponent v-if="activeKey === item.key" :type="item.key" />
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup name="MaterialManagement">
import { useDesign } from '/@/hooks/web/useDesign'
import type { TabsProps } from 'ant-design-vue'
import { ref } from 'vue'
import { settingList } from './material.data'
import GroupComponent from './MaterialComponent.vue'
import { PageWrapper } from '/@/components/Page'

const size = ref<TabsProps['size']>('large')
const activeKey = ref<number>(1)

// onMounted(async () => {})

/**
 * 组件标题点击事件,解决第二次不加载数据
 * @param key
 */
function componentClick(key) {
  activeKey.value = key
}

const tabPosition = ref('top')
const tabBarStyle = ref({
  width: '100%'
})
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
