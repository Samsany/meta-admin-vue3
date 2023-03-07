<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts" name="DeptModal">
import { computed, ref, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './dept.data'

import { addDept, getDeptList, updateDept } from '/@/api/system/dept'
import { useMessage } from '/@/hooks/web/useMessage'

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
  }
  const treeData = await getDeptList({ queryMode: 'tree' })
  treeData.unshift({ id: 0, deptName: '根部门' })
  // console.log('部门树', treeData)

  await updateSchema({
    field: 'parentId',
    componentProps: { treeData }
  })
})

const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'))

async function handleSubmit() {
  try {
    const values = await validate()

    setModalProps({ confirmLoading: true })
    const { createMessage } = useMessage()
    if (!unref(isUpdate)) {
      await addDept(values)
      createMessage.success(`新增成功`)
    } else {
      await updateDept(values)
      createMessage.success(`编辑成功`)
    }

    // console.log(values)
    closeModal()
    emit('success')
  } finally {
    setModalProps({ confirmLoading: false })
  }
}

// export default defineComponent({
//   name: 'DeptModal',
//   components: { BasicModal, BasicForm },
//   emits: ['success', 'register'],
//   setup(_, { emit }) {
//     const isUpdate = ref(true)

//     const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
//       labelWidth: 100,
//       baseColProps: { span: 24 },
//       schemas: formSchema,
//       showActionButtonGroup: false,
//     })

//     const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
//       resetFields()
//       setModalProps({ confirmLoading: false })
//       isUpdate.value = !!data?.isUpdate

//       if (unref(isUpdate)) {
//         setFieldsValue({
//           ...data.record,
//         })
//       }
//       const { list } = await getDeptList()
//       // console.log('获取部门数据', list)

//       const treeData = [
//         {
//           id: 0,
//           deptName: '根部门',
//         },
//         ...list,
//       ]
//       treeData.unshift({ id: 0, title: '根菜单' })
//       updateSchema({
//         field: 'parentDept',
//         componentProps: { treeData },
//       })
//     })

//     const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'))

//     async function handleSubmit() {
//       try {
//         const values = await validate()
//         setModalProps({ confirmLoading: true })
//         // TODO custom api
//         console.log(values)
//         closeModal()
//         emit('success')
//       } finally {
//         setModalProps({ confirmLoading: false })
//       }
//     }

//     return { registerModal, registerForm, getTitle, handleSubmit }
//   },
// })
</script>
