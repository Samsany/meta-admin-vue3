<template>
  <div class="clearfix">
    <a-upload
      accept="image/*"
      :listType="listType"
      :multiple="multiple"
      :customRequest="customUpload"
      v-model:fileList="uploadFileList"
      :beforeUpload="beforeUpload"
      :disabled="disabled"
      @change="handleChange"
      @preview="handlePreview"
    >
      <div v-if="uploadVisible">
        <div v-if="listType === 'picture-card'">
          <LoadingOutlined v-if="loading" />
          <UploadOutlined v-else />
          <div class="ant-upload-text">{{ text }}</div>
        </div>
        <a-button v-if="listType === 'picture'" :disabled="disabled">
          <UploadOutlined />
          {{ text }}
        </a-button>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel()">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { useRuleFormItem } from '/@/hooks/component/useFormItem'
import { useAttrs } from '/@/hooks/core/useAttrs'
import { useMessage } from '/@/hooks/web/useMessage'
import { getFileAccessHttpUrl, getRandom } from '/@/utils/common/compUtils'
import { propTypes } from '/@/utils/propTypes'
import { uploadAttachment } from '/@/api/tools/material'

const { createMessage } = useMessage()

const props = defineProps({
  //绑定值
  value: propTypes.oneOfType([propTypes.string, propTypes.array]),
  //按钮文本
  listType: {
    type: String,
    required: false,
    default: 'picture-card'
  },
  //按钮文本
  text: {
    type: String,
    required: false,
    default: '上传'
  },
  //这个属性用于分配文件所属分组
  group: {
    type: Number,
    required: false,
    default: 0
  },
  //这个属性用于控制文件上传的业务路径
  bizPath: {
    type: String,
    required: false,
    default: 'temp'
  },
  //是否禁用
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  //上传数量
  fileMax: {
    type: Number,
    required: false,
    default: 1
  }
})
const emit = defineEmits(['options-change', 'change', 'update:value'])
const emitData = ref<any[]>([])
const _attrs = useAttrs()
const [state] = useRuleFormItem(props, 'value', 'change', emitData)
//获取文件名
const getFileName = path => {
  if (path.lastIndexOf('\\') >= 0) {
    let reg = new RegExp('\\\\', 'g')
    path = path.replace(reg, '/')
  }
  return path.substring(path.lastIndexOf('/') + 1)
}

//上传状态
const loading = ref<boolean>(false)
//是否是初始化加载
const initTag = ref<boolean>(true)
//文件列表
let uploadFileList = ref<any[]>([])
//预览图
const previewImage = ref<string | undefined>('')
//预览框状态
const previewVisible = ref<boolean>(false)

//计算是否开启多图上传
const multiple = computed(() => {
  return props['fileMax'] > 1
})

//计算是否可以继续上传
const uploadVisible = computed(() => {
  return uploadFileList.value.length < props['fileMax']
})

/**
 * 监听value变化
 */
watch(
  () => props.value,
  (val, _prevCount) => {
    if (val instanceof Array) {
      val = val.join(',')
    }
    if (initTag.value == true) {
      initFileList(val)
    }
  }
)

/**
 * 初始化文件列表
 */
function initFileList(paths) {
  if (!paths || paths.length == 0) {
    uploadFileList.value = []
    return
  }
  let files: any[] = []
  let arr = paths.split(',')
  arr.forEach(value => {
    let url = getFileAccessHttpUrl(value)
    files.push({
      uid: getRandom(10),
      name: getFileName(value),
      status: 'done',
      url: url,
      response: {
        status: 'history',
        message: value
      }
    })
  })
  uploadFileList.value = files
}

/**
 * 上传前校验
 */
function beforeUpload(file) {
  let fileType = file.type
  if (fileType.indexOf('image') < 0) {
    createMessage.info('请上传图片')
    return false
  }
}

function customUpload(e) {
  uploadAttachment(
    {
      file: e.file,
      data: {
        groupId: props.group,
        bizPath: props.bizPath
      }
    },
    ev => {
      const percent = (ev.loaded / ev.total) * 100
      // 计算出上传进度，调用组件进度条方法
      e.onProgress({ percent })
    }
  )
    .then(res => {
      // console.log(res)
      e.onSuccess(res, e)
    })
    .catch(err => {
      // 调用实例的失败方法通知组件该文件上传失败
      e.onError(err)
    })
}

/**
 * 文件上传结果回调
 */
function handleChange({ file, fileList, _event }) {
  initTag.value = false
  uploadFileList.value = fileList
  if (file.status === 'error') {
    createMessage.error(`${file.name} 上传失败.`)
  }
  let fileUrls: any[] = []
  // 上传完成
  if (file.status != 'uploading') {
    fileList.forEach(file => {
      if (file.status === 'done') {
        // 原生表单内使用图片组件,关闭弹窗图片组件值不会被清空
        initTag.value = true
        fileUrls.push(file.response.url)
      }
    })
    if (file.status === 'removed') {
      handleDelete(file)
    }
  }
  // emitData.value = fileUrls.join(',');
  state.value = fileUrls.join(',')
  console.log('上传的文件', fileUrls, fileList, file)
  emit('update:value', fileUrls.join(','))
}

/**
 * 删除图片
 */
function handleDelete(file) {
  //如有需要新增 删除逻辑
  console.log(file)
}

/**
 * 预览图片
 */
function handlePreview(file) {
  previewImage.value = file.url || file.thumbUrl
  previewVisible.value = true
}

// function _getAvatarView() {
//   if (uploadFileList.length > 0) {
//     let url = uploadFileList[0].url
//     return getFileAccessHttpUrl(url, null)
//   }
// }

function handleCancel() {
  previewVisible.value = false
}
</script>
<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
