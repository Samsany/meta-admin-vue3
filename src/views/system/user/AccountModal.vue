<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup name="AccountModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { accountFormSchema } from './account.data'
import { useMessage } from '/@/hooks/web/useMessage'
import { addSysUser, updateSysUser } from '/@/api/system/account'

// emits
const emit = defineEmits(['success', 'register'])
const { createMessage } = useMessage()
const isUpdate = ref(true)
const rowId = ref('')

const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: accountFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23
  }
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async data => {
  await resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    rowId.value = data.record.id
    const { roles } = data.record
    const roleIds = roles && roles.map(it => it.id)
    // console.log(data.record)
    await setFieldsValue({
      ...data.record,
      roleIds
    })
  } else {
    await setFieldsValue({
      deptId: data.deptId
    })
  }

  await updateSchema([
    {
      field: 'password',
      show: !unref(isUpdate)
    },
    {
      field: 'deptId',
      componentProps: { treeData: data.deptTreeData || [] }
    }
  ])
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'))

async function handleSubmit() {
  try {
    const values = await validate()
    setModalProps({ confirmLoading: true })
    if (!unref(isUpdate)) {
      await addSysUser(values)
      createMessage.success(`新增成功`)
    } else {
      await updateSysUser(values)
      createMessage.success(`编辑成功`)
    }
    closeModal()
    emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } })
  } finally {
    setModalProps({ confirmLoading: false })
  }
}
</script>
