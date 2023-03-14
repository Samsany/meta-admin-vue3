<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup name="DeptTree">
import { onMounted, ref, unref } from 'vue'

import { BasicTree, TreeItem } from '/@/components/Tree'
import { getDeptList } from '/@/api/system/dept'

// emits
const emit = defineEmits(['success', 'register', 'select'])
const treeData = ref<TreeItem[]>([])

async function fetch() {
  treeData.value = (await getDeptList({ queryMode: 'tree' })) as unknown as TreeItem[]
  emit('register', unref(treeData))
}

function handleSelect(keys) {
  emit('select', keys[0])
}

onMounted(() => {
  fetch()
})
</script>
