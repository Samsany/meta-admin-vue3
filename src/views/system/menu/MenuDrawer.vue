<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="MenuDrawer">
  import { ref, computed, unref, watch } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { addMenu, getTreeMenuList, updateMenu } from '/@/api/system/menu';

  // emits
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, getFieldsValue, updateSchema, validate }] =
    useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: { lg: 12, md: 24 },
    });

  const cs = getFieldsValue();
  console.log('监听参数', cs);

  // const values = getFieldsValue();
  // console.log('监听参数', newVal, oldVal);

  // watch(values.type, async (newVal, oldVal) => {
  //   console.log('监听参数', newVal, oldVal);
  // });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getTreeMenuList();
    treeData.unshift({ id: 0, title: '根菜单' });
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      if (!unref(isUpdate)) {
        await addMenu(values);
      } else {
        await updateMenu(values);
      }
      // console.log(values);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
