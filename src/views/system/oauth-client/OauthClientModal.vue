<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #accessTokenValidityInput="{ model, field }">
        <a-input v-model:value="model[field]">
          <!--          <template #addonAfter>-->
          <!--            <a-select v-model:value="value4" style="width: 80px">-->
          <!--              <a-select-option value="1">一天</a-select-option>-->
          <!--              <a-select-option value="2">三天</a-select-option>-->
          <!--              <a-select-option value="3">一周</a-select-option>-->
          <!--              <a-select-option value="4">一年</a-select-option>-->
          <!--            </a-select>-->
          <!--          </template>-->
        </a-input>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script setup lang="ts" name="DictModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './oauthClient.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { addOauthClient, updateOauthClient } from '/@/api/system/oauthClient'

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)

const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
  labelWidth: 140,
  baseColProps: { span: 24 },
  schemas: formSchema,
  showActionButtonGroup: false
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async data => {
  await resetFields()
  setModalProps({ confirmLoading: false, width: 800 })
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    await updateSchema({
      field: 'status',
      show: false
    })
    await setFieldsValue({
      ...data.row
    })
  } else {
    await updateSchema({
      field: 'status',
      show: true
    })
  }
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增客户端' : '编辑客户端'))

async function handleSubmit() {
  try {
    const values = await validate()

    setModalProps({ confirmLoading: true })
    const { createMessage } = useMessage()
    if (!unref(isUpdate)) {
      await addOauthClient(values)
      createMessage.success(`新增成功`)
    } else {
      await updateOauthClient(values)
      createMessage.success(`编辑成功`)
    }

    closeModal()
    emit('success')
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
