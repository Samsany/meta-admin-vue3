<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script setup lang="ts" name="RoleModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './role.data'

import { addRole, updateRole } from '/@/api/system/role'
import { useMessage } from '/@/hooks/web/useMessage'
import { BasicTree, TreeItem } from '/@/components/Tree'
import { getTreeMenuList } from '/@/api/system/menu'

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)
const treeData = ref<TreeItem[]>([])

const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async data => {
  await resetFields()
  setModalProps({ confirmLoading: false })
  if (unref(treeData).length === 0) {
    treeData.value = (await getTreeMenuList()) as any as TreeItem[]
  }
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    await setFieldsValue({
      ...data.record
    })
  }
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))

async function handleSubmit() {
  try {
    const values = await validate()

    setModalProps({ confirmLoading: true })
    const { createMessage } = useMessage()
    if (!unref(isUpdate)) {
      await addRole(values)
      createMessage.success(`新增成功`)
    } else {
      await updateRole(values)
      createMessage.success(`编辑成功`)
    }

    // console.log(values)
    closeModal()
    emit('success')
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
