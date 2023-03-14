<template>
  <div :class="prefixCls">
    <a-card title="OSS资源设置" :bordered="false">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #endpointSlot="{ model, field }">
          <a-input v-model:value="model[field]">
            <template #addonBefore>
              <dict-select-tag v-model:value="endpointPrefix" dict-code="sys_http" />
            </template>
          </a-input>
        </template>
      </BasicForm>
    </a-card>
  </div>
</template>

<script lang="ts" setup name="OSSSetting">
import { onMounted, ref, unref } from 'vue'
import { BasicForm, useForm } from '/@/components/Form'
import { useMessage } from '/@/hooks/web/useMessage'
import { ossSettingSchemas } from '/@/views/system/setting/data'
import { useDesign } from '/@/hooks/web/useDesign'
import DictSelectTag from '/@/components/Form/src/meta/components/DictSelectTag.vue'
import { getOSSDefaultConfig, saveOSSConfig } from '/@/api/system/config'
import { getUrlPrefix, removeHttp } from '/@/utils/common/compUtils'

const { createMessage } = useMessage()

const [register, { setFieldsValue, validate }] = useForm({
  labelAlign: 'left',
  labelWidth: 120,
  schemas: ossSettingSchemas,
  showResetButton: false,
  submitButtonOptions: {
    text: '提 交'
  },
  actionColOptions: {
    span: 12
  }
})

const endpointPrefix = ref<any>('https://')

onMounted(async () => {
  await initOSSDefaultConfig()
})

async function initOSSDefaultConfig() {
  const data = await getOSSDefaultConfig()
  endpointPrefix.value = data.customDomain && getUrlPrefix(data.customDomain)
  data.customDomain = data.customDomain && removeHttp(data.customDomain)
  await setFieldsValue(data)
}

async function handleSubmit() {
  const values = await validate()
  await saveOSSConfig({ ...values, customDomain: unref(endpointPrefix) + values.customDomain })
  createMessage.success('提交更新成功！')
}

const { prefixCls } = useDesign('oss-setting')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-oss-setting';
.@{prefix-cls} {
  // margin: 20px;

  /deep/ .ant-form-item {
    margin-bottom: 24px !important;
  }
}
</style>
