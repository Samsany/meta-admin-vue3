<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <a-tabs :tab-position="tabPosition" :tabBarStyle="tabBarStyle" @tab-click="componentClick">
        <template v-for="item in settingList" :key="item.key">
          <a-tab-pane :tab="item.name">
            <component :is="item.component" v-if="activeKey == item.key" />
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup name="SystemSetting">
import { ScrollContainer } from '/@/components/Container'
import { useDesign } from '/@/hooks/web/useDesign'
import { markRaw, onMounted, ref } from 'vue'
import { getDefaultSysConfigList } from '/@/api/system/config'
import { TabSettingInfoModel } from '/@/api/system/model/configModel'
import BaseSetting from './BaseSetting.vue'
import OSSSetting from './OSSSetting.vue'

const settingList = ref<TabSettingInfoModel[]>([])
const activeKey = ref<number>(1000)

onMounted(async () => {
  await buildDefaultSettingList()
})

/**
 * 获取默认配置
 */
async function buildDefaultSettingList() {
  const data = await getDefaultSysConfigList()
  settingList.value =
    data &&
    data.map(it => {
      let comp
      switch (it.configCode) {
        case 'system':
          comp = BaseSetting
          break
        case 'oss':
          comp = OSSSetting
          break
      }
      return {
        key: it.id,
        name: it.configName,
        component: markRaw(comp)
      }
    })
  // console.log(settingList)
}

/**
 * 组件标题点击事件,解决第二次不加载数据
 * @param key
 */
function componentClick(key) {
  activeKey.value = key
}

const tabPosition = ref('left')
const tabBarStyle = ref({
  width: '220px',
  minHeight: '400px',
  marginBottom: '200px'
})
const { prefixCls } = useDesign('system-setting')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-system-setting';
.@{prefix-cls} {
  padding-top: 40px;
  margin: 12px;
  background-color: @component-background;

  .base-title {
    padding-left: 0;
  }

  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }
}
</style>
