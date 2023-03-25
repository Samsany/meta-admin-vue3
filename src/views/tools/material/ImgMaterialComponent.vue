<template>
  <ImgCardList :params="unref(params)" />
</template>

<script lang="ts" setup name="ImgMaterialComponent">
import { propTypes } from '/@/utils/propTypes'
import { reactive, unref, watch } from 'vue'
import ImgCardList from './components/ImgCardList.vue'

const props = defineProps({
  materialGroup: propTypes.object
})

const params = reactive({
  ...props.materialGroup
})

watch(
  () => props.materialGroup,
  val => {
    Object.assign(params, {
      ...val
    })
  },
  {
    deep: true
  }
)
</script>

<style lang="less" scoped></style>
