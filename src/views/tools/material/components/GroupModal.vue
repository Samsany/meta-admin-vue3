<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts" name="RoleModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form'
import { groupFromSchema } from '../material.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { addAttachmentGroup, updateAttachmentGroup } from '/@/api/tools/material'

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)

const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: groupFromSchema,
  showActionButtonGroup: false
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async data => {
  await resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    await setFieldsValue({
      ...data.record
    })
  } else {
    await setFieldsValue({
      type: data?.groupType
    })
  }
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增分组' : '编辑分组'))

async function handleSubmit() {
  try {
    const values = await validate()

    setModalProps({ confirmLoading: true })
    const { createMessage } = useMessage()
    if (!unref(isUpdate)) {
      await addAttachmentGroup(values)
      createMessage.success(`新增成功`)
    } else {
      await updateAttachmentGroup(values)
      createMessage.success(`修改成功`)
    }

    closeModal()
    emit('success')
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
