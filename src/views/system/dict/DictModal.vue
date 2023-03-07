<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts" name="DictModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './dict.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { addDict, updateDict } from '/@/api/system/dict'

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)

const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: formSchema,
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

    await updateSchema({
      field: 'dictType',
      dynamicDisabled: true
    })
  }
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'))

async function handleSubmit() {
  try {
    const values = await validate()

    setModalProps({ confirmLoading: true })
    const { createMessage } = useMessage()
    if (!unref(isUpdate)) {
      await addDict(values)
      createMessage.success(`新增成功`)
    } else {
      await updateDict(values)
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
