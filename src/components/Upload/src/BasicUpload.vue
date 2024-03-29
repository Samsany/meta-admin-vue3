<template>
  <div>
    <Space>
      <a-button type="primary" @click="openUploadModal" :preIcon="btnPreIcon">
        {{ btnText }}
      </a-button>
      <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <a-button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </a-button>
      </Tooltip>
    </Space>
    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts" setup name="BasicUpload">
import { computed, ref, unref, watch } from 'vue'
import { Icon } from '/@/components/Icon'
import { Space, Tooltip } from 'ant-design-vue'
import { useModal } from '/@/components/Modal'
import { uploadContainerProps } from './props'
import { omit } from 'lodash-es'
import { useI18n } from '/@/hooks/web/useI18n'
import { isArray } from '/@/utils/is'
import UploadModal from './UploadModal.vue'
import UploadPreviewModal from './UploadPreviewModal.vue'
import { useAttrs } from '/@/hooks/core/useAttrs'

const props = defineProps({
  ...uploadContainerProps
})
const emit = defineEmits(['change', 'delete', 'preview-delete', 'update:value'])
const attrs = useAttrs()
const { t } = useI18n()
// 上传modal
const [registerUploadModal, { openModal: openUploadModal }] = useModal()

//   预览modal
const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

const fileList = ref<string[]>([])

const showPreview = computed(() => {
  const { hidePreview, emptyHidePreview } = props
  if (hidePreview) {
    return false
  } else {
    if (!emptyHidePreview) return true
    return emptyHidePreview ? fileList.value.length > 0 : true
  }
})

const bindValue = computed(() => {
  const value = { ...attrs, ...props }
  return omit(value, 'onChange')
})

watch(
  () => props.value,
  (value = []) => {
    fileList.value = isArray(value) ? value : []
  },
  { immediate: true }
)

// 上传modal保存操作
function handleChange(urls: string[]) {
  fileList.value = [...unref(fileList), ...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

// 预览modal保存操作
function handlePreviewChange(urls: string[]) {
  fileList.value = [...(urls || [])]
  emit('update:value', fileList.value)
  emit('change', fileList.value)
}

function handleDelete(record: Recordable) {
  emit('delete', record)
}

function handlePreviewDelete(url: string) {
  emit('preview-delete', url)
}
</script>
