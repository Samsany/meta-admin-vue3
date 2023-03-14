<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="getTitle" width="50%" @ok="handleSubmit">
    <BasicForm @register="registerForm" :actionColOptions="{ span: 24 }" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="MenuDrawer">
import { computed, ref, unref } from 'vue'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema, isMenu, isRooTDir } from './menu.data'
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'

import { addMenu, getTreeMenuList, updateMenu } from '/@/api/system/menu'
import { useMessage } from '/@/hooks/web/useMessage'

const { createMessage } = useMessage()

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)
const isAddSub = ref(false)

const [registerForm, { resetFields, setFieldsValue, getFieldsValue, updateSchema, validate }] = useForm({
  labelWidth: 100,
  schemas: formSchema,
  showActionButtonGroup: false,
  baseColProps: { lg: 12, md: 24 }
})

const _values = getFieldsValue()
// watch(values.type, async (newVal, oldVal) => {
//   console.log('监听参数', newVal, oldVal);
// });

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async data => {
  await resetFields()
  setDrawerProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  isAddSub.value = !!data?.isAddSub

  if (unref(isUpdate) || unref(isAddSub)) {
    await setFieldsValue({
      ...data.record
    })
  }
  const treeData = await getTreeMenuList()
  treeData.unshift({ id: 0, title: '根菜单' })
  await updateSchema({
    field: 'parentId',
    componentProps: { treeData }
  })
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'))

async function handleSubmit() {
  try {
    const values = await validate()
    // 判断路由地址是否填写正确
    if (values.path) {
      if (isRooTDir(values.parentId) && !values.path.startsWith('/')) {
        createMessage.error('Layout组件对应的 路由地址 前面需要加 /')
        return
      }
      if (isMenu(values.type) && values.path.startsWith('/')) {
        createMessage.error('除了Layout组件对应的 路由地址 前面需要加 / ,其余子路由都不要以 / 开头')
        return
      }
    }

    setDrawerProps({ confirmLoading: true })
    if (!unref(isUpdate)) {
      await addMenu(values)
    } else {
      await updateMenu(values)
    }
    // console.log(values);
    closeDrawer()
    emit('success')
  } finally {
    setDrawerProps({ confirmLoading: false })
  }
}
</script>
