<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" name="AccountPasswordModal" setup>
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { passwordFormSchema } from './account.data'
import { setSysUserNewPassword } from '/@/api/system/account'

// emits
const emit = defineEmits(['success', 'register'])
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
  labelWidth: 100,
  schemas: passwordFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23
  }
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async data => {
  await resetFields()
  setModalProps({
    confirmLoading: false,
    title: `给账号【${data.record.name}(${data.record.account})】设置密码`
  })
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    await setFieldsValue({
      ...data.record
    })
  }
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '设置密码'))

async function handleSubmit() {
  try {
    setModalProps({ confirmLoading: true })
    const { id, passwordNew } = await validate()
    await setSysUserNewPassword({ id, newPassword: passwordNew })
    emit('success')
    closeModal()
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
