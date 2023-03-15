<template>
  <div :class="prefixCls">
    <a-card title="OSS资源设置" :bordered="false">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #providerSlot="{ model, field }">
          <DictSelectTag
            v-model:value="model[field]"
            dict-code="oss_provider"
            placeholder="请选择服务提供商"
            @change="handleProviderChange"
          />
        </template>
        <template #endpointSlot="{ model, field }">
          <a-input v-model:value="model[field]">
            <template #addonBefore>
              <DictSelectTag v-model:value="endpointPrefix" dict-code="sys_http" @change="handleEndpointChange" />
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
import { getOSSConfigByCode, getOSSDefaultConfig, saveOSSConfig } from '/@/api/system/config'
import { getUrlPrefix, removeHttp } from '/@/utils/common/compUtils'
import { GetOssConfigInfoModel } from '/@/api/system/model/configModel'

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

const defaultPrefix = 'https://'
let endpointPrefix = ref<string>('https://')

onMounted(async () => {
  await initOSSDefaultConfig()
})

async function initOSSDefaultConfig() {
  const data = await getOSSDefaultConfig()
  await setForm(data)
}

async function handleProviderChange(e: string) {
  // console.log('变化', e)
  const data = await getOSSConfigByCode({ configCode: e })
  // console.log(data)
  await setForm(data)
}

async function handleEndpointChange(params: any) {
  endpointPrefix.value = params
  console.log('更新前缀', unref(endpointPrefix))
}

async function handleSubmit() {
  const values = await validate()
  await saveOSSConfig({ ...values, customDomain: unref(endpointPrefix) + values.customDomain })
  createMessage.success('提交更新成功！')
}

async function setForm(data: GetOssConfigInfoModel) {
  endpointPrefix.value = (data.customDomain && getUrlPrefix(data.customDomain)) || defaultPrefix
  data.customDomain = data.customDomain && removeHttp(data.customDomain)

  await setFieldsValue(data)
}

const { prefixCls } = useDesign('oss-setting')
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-oss-setting';
.@{prefix-cls} {
  // margin: 20px;

  :deep(.ant-form-item) {
    margin-bottom: 24px !important;
  }
}
</style>
