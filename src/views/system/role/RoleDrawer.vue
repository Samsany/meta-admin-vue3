<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="getTitle" width="600px" @ok="handleSubmit">
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
  </BasicDrawer>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './role.data'
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer'
import { BasicTree, TreeItem } from '/@/components/Tree'

import { getTreeMenuList } from '/@/api/system/menu'
import { useMessage } from '/@/hooks/web/useMessage'
import { addRole, updateRole } from '/@/api/system/role'

export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm, BasicTree },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true)
    const treeData = ref<TreeItem[]>([])

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false
    })

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async data => {
      await resetFields()
      setDrawerProps({ confirmLoading: false })
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
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
        setDrawerProps({ confirmLoading: true })
        console.log(values)
        const { createMessage } = useMessage()
        if (!unref(isUpdate)) {
          await addRole(values)
          createMessage.success(`新增成功`)
        } else {
          await updateRole(values)
          createMessage.success(`编辑成功`)
        }

        closeDrawer()
        emit('success')
      } finally {
        setDrawerProps({ confirmLoading: false })
      }
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData
    }
  }
})
</script>
