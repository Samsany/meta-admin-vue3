<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
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
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate

  if (unref(isUpdate)) {
    setFieldsValue({
      ...data.record
    })
  }
  // const { list: treeData } = await getDeptList()
  // treeData.unshift({ id: 0, deptName: '根部门' })
  // console.log('部门树', treeData)

  // updateSchema({
  //   field: 'parentId',
  //   componentProps: { treeData },
  // })
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
