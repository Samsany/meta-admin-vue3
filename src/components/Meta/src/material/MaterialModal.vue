<template>
  <BasicModal @register="registerModal" title="素材管理" width="80%" @ok="handleOk" v-bind="$attrs">
    <material :multiple="multiple" @select-change="handleSelectMaterialChange" />
  </BasicModal>
</template>

<script lang="ts" setup>
import BasicModal from '/@/components/Modal/src/BasicModal.vue'
import { propTypes } from '/@/utils/propTypes'
import { useModalInner } from '/@/components/Modal'
import Material from '/@/components/Meta/src/material/Material.vue'
import { ref } from 'vue'

const emit = defineEmits(['change', 'update:value', 'register'])
const _props = defineProps({
  value: propTypes.oneOfType([propTypes.string, propTypes.array]),
  multiple: propTypes.bool.def(true)
})

// 注册弹窗
const [registerModal, { closeModal }] = useModalInner()

const selectFileList = ref()
function handleSelectMaterialChange(value) {
  console.log('modal', value)
  selectFileList.value = value
}

function handleOk() {
  emitValue(selectFileList)
  closeModal()
}

function emitValue(value) {
  emit('change', value)
  emit('update:value', value)
}
</script>

<style lang="less" scoped></style>
